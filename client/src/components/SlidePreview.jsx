import { useState, useRef, useContext } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import PitchScore from "./PitchScore";
import IndiaSchemes from "./IndiaSchemes";
import { AuthContext } from "../context/AuthContext";

const TEMPLATES = {
  default: {
    name: "⚡ Default",
    colors: [
      "#1a1a2e",
      "#16213e",
      "#0f3460",
      "#533483",
      "#2b2d42",
      "#1a1a2e",
      "#16213e",
      "#0f3460",
      "#533483",
      "#2b2d42",
    ],
    accent: "#60a5fa",
  },
  ocean: {
    name: "🌊 Ocean",
    colors: [
      "#0c1b33",
      "#0d2137",
      "#0e2a42",
      "#0f3350",
      "#103d5e",
      "#0c1b33",
      "#0d2137",
      "#0e2a42",
      "#0f3350",
      "#103d5e",
    ],
    accent: "#38bdf8",
  },
  sunset: {
    name: "🌅 Sunset",
    colors: [
      "#1a0a0a",
      "#2d1010",
      "#3d1515",
      "#4a1c1c",
      "#3d2020",
      "#1a0a0a",
      "#2d1010",
      "#3d1515",
      "#4a1c1c",
      "#3d2020",
    ],
    accent: "#f87171",
  },
  forest: {
    name: "🌿 Forest",
    colors: [
      "#0a1a0f",
      "#0d2114",
      "#0f2a1a",
      "#113320",
      "#133d25",
      "#0a1a0f",
      "#0d2114",
      "#0f2a1a",
      "#113320",
      "#133d25",
    ],
    accent: "#4ade80",
  },
  galaxy: {
    name: "🌌 Galaxy",
    colors: [
      "#0d0d1a",
      "#120d26",
      "#180d33",
      "#1e0d40",
      "#150d2e",
      "#0d0d1a",
      "#120d26",
      "#180d33",
      "#1e0d40",
      "#150d2e",
    ],
    accent: "#a78bfa",
  },
  midnight: {
    name: "🖤 Midnight",
    colors: [
      "#080808",
      "#0d0d0d",
      "#111111",
      "#141414",
      "#0f0f0f",
      "#080808",
      "#0d0d0d",
      "#111111",
      "#141414",
      "#0f0f0f",
    ],
    accent: "#e2e8f0",
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
  const tmpl = TEMPLATES[template];

  const handleDownloadPDF = async () => {
    setDownloading(true);
    try {
      const pdf = new jsPDF("landscape", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      for (let i = 0; i < slidesList.length; i++) {
        setCurrent(i);
        await new Promise((r) => setTimeout(r, 900));
        const canvas = await html2canvas(slideRef.current, {
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
      const res = await axios.post(
        "https://ai-pitch-deck-ajbt.onrender.com/api/pitch/score",
        { slides: slidesList, startupName },
      );
      setScoreData(res.data);
    } catch {
      alert("Score nahi mila!");
    } finally {
      setScoring(false);
    }
  };

  const handleShare = async () => {
    try {
      const res = await axios.post(
        "https://ai-pitch-deck-ajbt.onrender.com/api/pitch/save",
        {
          startupName,
          slides: slidesList,
          industry,
          fundingGoal,
          businessModel,
          userId: user?._id || user?.id || null,
        },
      );
      navigator.clipboard.writeText(res.data.shareUrl);
      alert(`Link copy ho gaya! 🎉\n\n${res.data.shareUrl}`);
    } catch {
      alert("Share nahi hua!");
    }
  };

  const handleDownloadPPTX = async () => {
    try {
      const res = await axios.post(
        "https://ai-pitch-deck-ajbt.onrender.com/api/pitch/download-pptx",
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
    } catch {
      alert("PPTX error!");
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
    <div className="min-h-screen bg-[#050810] px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Edit Modal */}
        {editing && editData && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#0f1117] border border-white/10 rounded-3xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold">✏️ Slide Edit Karo</h3>
                <button
                  onClick={() => setEditing(false)}
                  className="text-gray-500 hover:text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-500 text-xs uppercase tracking-wider mb-2 block">
                    Heading
                  </label>
                  <input
                    value={editData.heading}
                    onChange={(e) =>
                      setEditData({ ...editData, heading: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50 transition"
                  />
                </div>
                <div>
                  <label className="text-gray-500 text-xs uppercase tracking-wider mb-2 block">
                    Content
                  </label>
                  <textarea
                    value={editData.content}
                    onChange={(e) =>
                      setEditData({ ...editData, content: e.target.value })
                    }
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50 transition resize-none"
                  />
                </div>
                <div>
                  <label className="text-gray-500 text-xs uppercase tracking-wider mb-2 block">
                    Bullet Points
                  </label>
                  {editData.bulletPoints.map((point, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input
                        value={point}
                        onChange={(e) => {
                          const u = [...editData.bulletPoints];
                          u[i] = e.target.value;
                          setEditData({ ...editData, bulletPoints: u });
                        }}
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-blue-500/50 transition"
                      />
                      <button
                        onClick={() =>
                          setEditData({
                            ...editData,
                            bulletPoints: editData.bulletPoints.filter(
                              (_, idx) => idx !== i,
                            ),
                          })
                        }
                        className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 rounded-xl transition"
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
                    className="text-blue-400 hover:text-blue-300 text-sm mt-1 transition"
                  >
                    + Point Add Karo
                  </button>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
                >
                  ✅ Save
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-white transition text-sm"
          >
            ← Wapas
          </button>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm font-medium">
              {startupName}
            </span>
            <span className="text-gray-700">·</span>
            <span className="text-gray-600 text-sm">
              {current + 1} / {slidesList.length}
            </span>
          </div>
          <button
            onClick={handleEdit}
            className="text-sm border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 px-4 py-2 rounded-xl transition"
          >
            ✏️ Edit
          </button>
        </div>

        {/* Template Selector */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {Object.entries(TEMPLATES).map(([key, tmpl]) => (
              <button
                key={key}
                onClick={() => setTemplate(key)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition ${
                  template === key
                    ? "bg-white text-black"
                    : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10"
                }`}
              >
                {tmpl.name}
              </button>
            ))}
          </div>
        </div>

        {/* SLIDE */}
        <div
          ref={slideRef}
          className="rounded-3xl overflow-hidden shadow-2xl relative"
          style={{
            backgroundColor: tmpl.colors[current],
            minHeight: "460px",
            boxShadow: `0 0 80px ${tmpl.accent}15, 0 30px 60px rgba(0,0,0,0.5)`,
          }}
        >
          {/* Slide inner glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 20% 20%, ${tmpl.accent}15 0%, transparent 60%)`,
            }}
          />

          {/* Slide number badge */}
          <div
            className="absolute top-6 right-6"
            style={{
              color: `${tmpl.accent}60`,
              fontSize: "11px",
              fontWeight: "600",
              letterSpacing: "0.1em",
            }}
          >
            {String(current + 1).padStart(2, "0")} / {slidesList.length}
          </div>

          <div
            className="relative z-10 p-10 md:p-14 flex flex-col justify-between"
            style={{ minHeight: "460px" }}
          >
            <div>
              {/* Title tag */}
              <div
                className="inline-flex items-center gap-2 mb-8"
                style={{
                  background: `${tmpl.accent}15`,
                  border: `1px solid ${tmpl.accent}30`,
                  borderRadius: "100px",
                  padding: "6px 14px",
                }}
              >
                <span
                  style={{
                    color: tmpl.accent,
                    fontSize: "13px",
                    fontWeight: "500",
                    letterSpacing: "0.05em",
                  }}
                >
                  {slide.title}
                </span>
              </div>

              {/* Icon + Heading */}
              <div className="flex items-start gap-4 mb-6">
                <span style={{ fontSize: "44px", lineHeight: 1 }}>
                  {slide.icon}
                </span>
                <h2
                  style={{
                    color: "#ffffff",
                    fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                    fontWeight: "700",
                    lineHeight: "1.2",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {slide.heading}
                </h2>
              </div>

              {/* Content */}
              <p
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "15px",
                  lineHeight: "1.7",
                  marginBottom: "28px",
                  maxWidth: "640px",
                }}
              >
                {slide.content}
              </p>

              {/* Bullet Points */}
              {slide.bulletPoints?.length > 0 && (
                <ul className="space-y-3">
                  {slide.bulletPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        style={{
                          color: tmpl.accent,
                          marginTop: "7px",
                          flexShrink: 0,
                          background: `${tmpl.accent}20`,
                          borderRadius: "50%",
                          width: "20px",
                          height: "20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "10px",
                        }}
                      >
                        ✦
                      </span>
                      <span
                        style={{
                          color: "rgba(255,255,255,0.8)",
                          fontSize: "14px",
                          lineHeight: "1.6",
                        }}
                      >
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            <div
              className="flex justify-between items-center mt-10 pt-6"
              style={{ borderTop: `1px solid rgba(255,255,255,0.06)` }}
            >
              <span
                style={{
                  color: "rgba(255,255,255,0.3)",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
              >
                {startupName}
              </span>
              <span
                style={{ color: "rgba(255,255,255,0.2)", fontSize: "11px" }}
              >
                Powered by <span style={{ color: tmpl.accent }}>PitchAI</span>
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setCurrent(Math.max(0, current - 1))}
            disabled={current === 0}
            className="border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-20 text-white px-6 py-3 rounded-xl text-sm transition"
          >
            ← Pehle
          </button>
          <div className="flex gap-1.5">
            {slidesList.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all ${i === current ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/20 hover:bg-white/40"}`}
              />
            ))}
          </div>
          <button
            onClick={() =>
              setCurrent(Math.min(slidesList.length - 1, current + 1))
            }
            disabled={current === slidesList.length - 1}
            className="border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-20 text-white px-6 py-3 rounded-xl text-sm transition"
          >
            Agle →
          </button>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 text-white py-4 rounded-2xl text-sm font-medium transition"
          >
            🔗 Share Link
          </button>
          <button
            onClick={handleDownloadPPTX}
            className="flex items-center justify-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 text-white py-4 rounded-2xl text-sm font-medium transition"
          >
            📊 PPTX Download
          </button>
          <button
            onClick={handleGetScore}
            disabled={scoring}
            className="flex items-center justify-center gap-2 border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 py-4 rounded-2xl text-sm font-medium transition disabled:opacity-50"
          >
            {scoring ? "⏳ Score Aa Raha Hai..." : "🎯 AI Pitch Score"}
          </button>
          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-100 py-4 rounded-2xl text-sm font-semibold transition disabled:opacity-50"
          >
            {downloading
              ? `⏳ ${current + 1}/${slidesList.length}`
              : "📄 PDF Download"}
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
