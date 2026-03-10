import { useState, useRef, useContext } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import PitchScore from "./PitchScore";
import IndiaSchemes from "./IndiaSchemes";
import { AuthContext } from "../context/AuthContext";

const TEMPLATES = {
  default: {
    name: "🎨 Default",
    colors: [
      "#1d4ed8",
      "#b91c1c",
      "#15803d",
      "#7e22ce",
      "#c2410c",
      "#0e7490",
      "#be185d",
      "#3730a3",
      "#a16207",
      "#0f766e",
    ],
  },
  ocean: {
    name: "🌊 Ocean",
    colors: [
      "#1d4ed8",
      "#1e40af",
      "#1e3a8a",
      "#1d4ed8",
      "#2563eb",
      "#1d4ed8",
      "#1e40af",
      "#1e3a8a",
      "#1d4ed8",
      "#2563eb",
    ],
  },
  sunset: {
    name: "🌅 Sunset",
    colors: [
      "#b91c1c",
      "#c2410c",
      "#a16207",
      "#b45309",
      "#c2410c",
      "#b91c1c",
      "#9a3412",
      "#a16207",
      "#b91c1c",
      "#c2410c",
    ],
  },
  forest: {
    name: "🌿 Forest",
    colors: [
      "#15803d",
      "#166534",
      "#14532d",
      "#15803d",
      "#16a34a",
      "#166534",
      "#15803d",
      "#14532d",
      "#166534",
      "#15803d",
    ],
  },
  galaxy: {
    name: "🌌 Galaxy",
    colors: [
      "#7e22ce",
      "#6d28d9",
      "#5b21b6",
      "#7c3aed",
      "#7e22ce",
      "#6d28d9",
      "#5b21b6",
      "#7c3aed",
      "#7e22ce",
      "#6d28d9",
    ],
  },
  fire: {
    name: "🔥 Fire",
    colors: [
      "#c2410c",
      "#b91c1c",
      "#a16207",
      "#c2410c",
      "#b45309",
      "#b91c1c",
      "#c2410c",
      "#a16207",
      "#b91c1c",
      "#c2410c",
    ],
  },
};

function SlidePreview({
  slides,
  startupName,
  industry,
  fundingGoal,
  businessModel,
  onBack,
}) {
  const { user } = useContext(AuthContext);
  const [current, setCurrent] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [scoreData, setScoreData] = useState(null);
  const [scoring, setScoring] = useState(false);
  const [template, setTemplate] = useState("default");
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState(null);
  const [slidesList, setSlidesList] = useState(slides);
  const slideRef = useRef();

  const slide = slidesList[current];

  const handleDownloadPDF = async () => {
    setDownloading(true);
    try {
      const pdf = new jsPDF("landscape", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      for (let i = 0; i < slidesList.length; i++) {
        setCurrent(i);
        await new Promise((resolve) => setTimeout(resolve, 900));
        const element = slideRef.current;
        const canvas = await html2canvas(element, {
          scale: 1.5,
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: TEMPLATES[template].colors[i],
        });
        const imgData = canvas.toDataURL("image/jpeg", 0.92);
        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, pageHeight);
      }
      pdf.save(`${startupName}_PitchDeck.pdf`);
    } catch (err) {
      alert("PDF error: " + err.message);
    } finally {
      setDownloading(false);
      setCurrent(0);
    }
  };

  const handleGetScore = async () => {
    setScoring(true);
    try {
      const res = await axios.post("http://localhost:5000/api/pitch/score", {
        slides: slidesList,
        startupName,
      });
      setScoreData(res.data);
    } catch (err) {
      alert("Score nahi mila — dobara try karo!");
    } finally {
      setScoring(false);
    }
  };

  const handleShare = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/pitch/save", {
        startupName,
        slides: slidesList,
        industry,
        fundingGoal,
        businessModel,
        userId: user?._id || user?.id || null,
      });
      const url = res.data.shareUrl;
      navigator.clipboard.writeText(url);
      alert(
        `Link copy ho gaya aur Dashboard mein save bhi ho gaya! 🎉\n\n${url}`,
      );
    } catch (err) {
      alert("Share nahi hua — dobara try karo!");
    }
  };

  const handleDownloadPPTX = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/pitch/download-pptx",
        { slides: slidesList, startupName, template },
        { responseType: "blob" },
      );
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${startupName}_PitchDeck.pptx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert("PPTX error — dobara try karo!");
    }
  };

  const handleEdit = () => {
    setEditData({ ...slidesList[current] });
    setEditing(true);
  };

  const handleSaveEdit = () => {
    const updated = [...slidesList];
    updated[current] = editData;
    setSlidesList(updated);
    setEditing(false);
    setEditData(null);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Edit Modal */}
        {editing && editData && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-[#1E293B] rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-xl">
                  ✏️ Slide Edit Karo
                </h3>
                <button
                  onClick={() => setEditing(false)}
                  className="text-gray-400 hover:text-white text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm mb-1 block">
                    Heading
                  </label>
                  <input
                    value={editData.heading}
                    onChange={(e) =>
                      setEditData({ ...editData, heading: e.target.value })
                    }
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-gray-400 text-sm mb-1 block">
                    Content
                  </label>
                  <textarea
                    value={editData.content}
                    onChange={(e) =>
                      setEditData({ ...editData, content: e.target.value })
                    }
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500 resize-none"
                  />
                </div>

                <div>
                  <label className="text-gray-400 text-sm mb-2 block">
                    Bullet Points
                  </label>
                  {editData.bulletPoints.map((point, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input
                        value={point}
                        onChange={(e) => {
                          const updated = [...editData.bulletPoints];
                          updated[i] = e.target.value;
                          setEditData({ ...editData, bulletPoints: updated });
                        }}
                        className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white outline-none focus:border-purple-500"
                      />
                      <button
                        onClick={() => {
                          const updated = editData.bulletPoints.filter(
                            (_, idx) => idx !== i,
                          );
                          setEditData({ ...editData, bulletPoints: updated });
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 rounded-xl"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() =>
                      setEditData({
                        ...editData,
                        bulletPoints: [...editData.bulletPoints, ""],
                      })
                    }
                    className="text-purple-400 hover:text-purple-300 text-sm mt-1"
                  >
                    + Point Add Karo
                  </button>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-bold transition"
                >
                  ✅ Save Karo
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-white border border-white/20 px-4 py-2 rounded-lg transition"
          >
            ← Wapas Jao
          </button>
          <h2 className="text-white font-bold text-lg">
            {startupName} — Pitch Deck
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleEdit}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
            >
              ✏️ Edit
            </button>
            <span className="text-gray-400 text-sm">
              {current + 1} / {slidesList.length}
            </span>
          </div>
        </div>

        {/* Template Selector */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
          <p className="text-gray-400 text-sm mb-3 text-center">
            🎨 Template Chuno
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {Object.entries(TEMPLATES).map(([key, tmpl]) => (
              <button
                key={key}
                onClick={() => setTemplate(key)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                  template === key
                    ? "bg-white text-black"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {tmpl.name}
              </button>
            ))}
          </div>
        </div>

        {/* Slide */}
        <div
          ref={slideRef}
          style={{ backgroundColor: TEMPLATES[template].colors[current] }}
          className="rounded-2xl p-10 min-h-[420px] flex flex-col justify-between shadow-2xl"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-5xl">{slide.icon}</span>
              <div>
                <p
                  style={{ color: "rgba(255,255,255,0.6)" }}
                  className="text-sm uppercase tracking-widest"
                >
                  {slide.title}
                </p>
                <h2 style={{ color: "#ffffff" }} className="text-3xl font-bold">
                  {slide.heading}
                </h2>
              </div>
            </div>

            <p
              style={{ color: "rgba(255,255,255,0.85)" }}
              className="text-lg leading-relaxed mb-6"
            >
              {slide.content}
            </p>

            {slide.bulletPoints && slide.bulletPoints.length > 0 && (
              <ul className="space-y-3">
                {slide.bulletPoints.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3"
                    style={{ color: "rgba(255,255,255,0.9)" }}
                  >
                    <span style={{ color: "#ffffff" }} className="mt-1">
                      ✦
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex justify-between items-center mt-8">
            <span
              style={{ color: "rgba(255,255,255,0.4)" }}
              className="text-sm"
            >
              {startupName}
            </span>
            <span
              style={{ color: "rgba(255,255,255,0.3)" }}
              className="text-sm"
            >
              Slide {slide.slideNumber}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setCurrent(Math.max(0, current - 1))}
            disabled={current === 0}
            className="bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white px-6 py-3 rounded-xl transition"
          >
            ← Pehle
          </button>

          <div className="flex gap-2">
            {slidesList.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full transition ${i === current ? "bg-white" : "bg-white/30"}`}
              />
            ))}
          </div>

          <button
            onClick={() =>
              setCurrent(Math.min(slidesList.length - 1, current + 1))
            }
            disabled={current === slidesList.length - 1}
            className="bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white px-6 py-3 rounded-xl transition"
          >
            Agle →
          </button>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <button
            onClick={handleShare}
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition transform hover:scale-105 w-full max-w-sm"
          >
            🔗 Share Link Banao
          </button>

          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-10 py-4 rounded-xl font-bold text-lg transition transform hover:scale-105 w-full max-w-sm"
          >
            {downloading ? (
              <span className="flex items-center justify-center gap-3">
                <svg
                  className="animate-spin h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                PDF Ban Raha Hai... ({current + 1}/{slidesList.length})
              </span>
            ) : (
              "📄 PDF Download Karo"
            )}
          </button>

          <button
            onClick={handleDownloadPPTX}
            className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition transform hover:scale-105 w-full max-w-sm"
          >
            📊 PPTX Download Karo
          </button>

          <button
            onClick={handleGetScore}
            disabled={scoring}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-10 py-4 rounded-xl font-bold text-lg transition transform hover:scale-105 w-full max-w-sm"
          >
            {scoring ? (
              <span className="flex items-center justify-center gap-3">
                <svg
                  className="animate-spin h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Score Calculate Ho Raha Hai...
              </span>
            ) : (
              "🎯 AI Pitch Score Dekho"
            )}
          </button>
        </div>

        {/* India Schemes */}
        <IndiaSchemes
          industry={industry}
          fundingGoal={fundingGoal}
          businessModel={businessModel}
        />

        {/* Score Modal */}
        {scoreData && (
          <PitchScore
            scoreData={scoreData}
            onClose={() => setScoreData(null)}
          />
        )}
      </div>
    </div>
  );
}

export default SlidePreview;
