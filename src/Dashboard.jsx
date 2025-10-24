import React from "react";
import { UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const tools = [
    {
      title: "🎬 Trim & Caption",
      desc: "Upload a video, trim it easily, and auto-generate captions powered by AI.",
      button: "Start Editing",
      color: "from-purple-500 to-pink-500",
      onClick: () => navigate("/editor"),
    },
    {
      title: "⚡ AI Reels Generator",
      desc: "Turn long videos into short viral clips automatically — perfect for social media.",
      button: "Generate Reels",
      color: "from-pink-500 to-purple-600",
      onClick: () => alert("Coming soon!"),
    },
    {
      title: "🎧 Audio → Video",
      desc: "Upload audio and let AI create matching video content for your brand.",
      button: "Create Video",
      color: "from-purple-600 to-indigo-500",
      onClick: () => alert("Coming soon!"),
    },
    {
      title: "🗣️ Upload & Transcribe",
      desc: "Instantly transcribe and caption your content with accuracy.",
      button: "Transcribe Now",
      color: "from-indigo-500 to-purple-500",
      onClick: () => navigate("/transcriber"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0826] via-[#2a0d45] to-[#3b0f60] text-white">
      {/* Topbar */}
      <header className="flex justify-between items-center px-10 py-6 border-b border-purple-800/30">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
          Clipify AI Dashboard
        </h1>
        <UserButton appearance={{ elements: { avatarBox: "w-10 h-10" } }} />
      </header>

      {/* Welcome Section */}
      <section className="text-center mt-16 mb-10">
        <h2 className="text-5xl font-extrabold mb-4">
          Welcome to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
            Clipify AI
          </span>
        </h2>
        <p className="text-gray-300 max-w-xl mx-auto">
          Choose what you’d like to do today. Our tools help you edit, caption,
          and create content effortlessly — powered by AI.
        </p>
      </section>

      {/* Tool Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto px-8 pb-24">
        {tools.map((tool, i) => (
          <div
            key={i}
            className="bg-[#1a0826]/80 backdrop-blur-xl rounded-2xl border border-purple-700/30 p-8 hover:scale-105 transition-transform relative"
          >
            <h3 className="text-2xl font-semibold mb-3">{tool.title}</h3>
            <p className="text-gray-400 mb-6 text-sm">{tool.desc}</p>
            <button
              onClick={tool.onClick}
              className={`px-6 py-3 rounded-lg bg-gradient-to-r ${tool.color} hover:opacity-90 font-semibold`}
            >
              {tool.button}
            </button>
            {tool.button.includes("Coming") && (
              <span className="absolute top-4 right-4 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
                Coming Soon
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-400 text-sm border-t border-purple-800/20">
        © {new Date().getFullYear()} by Clipify AI
      </footer>
    </div>
  );
}
