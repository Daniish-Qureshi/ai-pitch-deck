import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchDecks();
  }, []);

  const fetchDecks = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/pitch/my-decks/${user._id || user.id}`,
      );
      setDecks(res.data.decks);
    } catch (err) {
      console.error("Decks fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (shareId) => {
    if (!confirm("Kya sach mein delete karna hai?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/pitch/delete/${shareId}`);
      setDecks(decks.filter((d) => d.shareId !== shareId));
    } catch (err) {
      alert("Delete nahi hua!");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#0F172A] px-6 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🚀</span>
            <div>
              <h1 className="text-white text-2xl font-bold">
                PitchAI Dashboard
              </h1>
              <p className="text-gray-400 text-sm">
                Welcome back, {user?.name}!
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              to="/create"
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl font-semibold transition"
            >
              + Naya Deck
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-white border border-white/20 px-5 py-2 rounded-xl transition"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-purple-400">
              {decks.length}
            </div>
            <div className="text-gray-400 mt-1">Total Decks</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-green-400">
              {decks.length * 10}
            </div>
            <div className="text-gray-400 mt-1">Total Slides</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold text-blue-400">
              {decks.length}
            </div>
            <div className="text-gray-400 mt-1">Share Links</div>
          </div>
        </div>

        <h2 className="text-white font-bold text-xl mb-4">
          📁 Mere Pitch Decks
        </h2>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Decks load ho rahe hain...</p>
          </div>
        ) : decks.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-gray-400 text-lg mb-6">
              Abhi koi deck nahi hai!
            </p>
            <Link
              to="/create"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition"
            >
              Pehla Deck Banao 🚀
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {decks.map((deck) => (
              <div
                key={deck.shareId}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-white font-bold text-lg">
                      {deck.startupName}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {deck.industry || "N/A"} • {deck.fundingGoal || "N/A"}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      📑 {deck.slides?.length || 10} slides • 🗓️{" "}
                      {new Date(deck.createdAt).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                  <span className="text-2xl">🚀</span>
                </div>

                <div className="flex gap-2 mt-4">
                  <a
                    href={`/deck/${deck.shareId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-sm font-semibold text-center transition"
                  >
                    Dekho
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `http://localhost:5173/deck/${deck.shareId}`,
                      );
                      alert("Link copy ho gaya!");
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl text-sm font-semibold transition"
                  >
                    Copy Link
                  </button>
                  <button
                    onClick={() => handleDelete(deck.shareId)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
