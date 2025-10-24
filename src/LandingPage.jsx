import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LandingPage() {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const [openIndex, setOpenIndex] = useState(null);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0826] via-[#2a0d45] to-[#3b0f60] text-white overflow-x-hidden scroll-smooth relative">
      {/* floating background glow (now non-blocking) */}
      <div className="pointer-events-none -z-10 absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,0,128,0.10),transparent_50%)] animate-[pulse_10s_ease-in-out_infinite]" />

      {/* HEADER */}
      <header className="w-full flex items-center justify-between px-10 py-6 border-b border-purple-800/30 relative z-10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
          Clipify AI
        </h1>

        {/* Centered Navigation */}
        <nav className="absolute left-1/2 -translate-x-1/2 flex gap-10 text-gray-300 text-sm">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
          <a href="#roadmap" className="hover:text-white transition">Roadmap</a>
          <a href="#faq" className="hover:text-white transition">FAQ</a>
        </nav>

        <div className="flex gap-4">
          {isSignedIn ? (
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 rounded-lg hover:opacity-90 transition"
            >
              Dashboard
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/sign-in")}
                className="border border-purple-500 px-4 py-2 rounded-lg hover:bg-purple-600/30 transition"
              >
                Log In
              </button>
              <button
                onClick={() => navigate("/sign-up")}
                className="bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 rounded-lg hover:opacity-90 transition"
              >
                Create Account
              </button>
            </>
          )}
        </div>
      </header>

      {/* HERO */}
      <motion.section
        id="hero"
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-center mt-24 mb-20 px-4"
      >
        <h2 className="text-5xl font-extrabold mb-4 leading-tight">
          Edit. Transcribe. Create.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
            Effortlessly.
          </span>
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Upload, edit, trim, and caption videos powered by AI — simplicity meets creativity.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/sign-up")}
          className="mt-8 bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-pink-500/40 transition-all"
        >
          Start Creating
        </motion.button>
      </motion.section>

      {/* FEATURES */}
      <motion.section
        id="features"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-center py-20 px-6"
      >
        <h3 className="text-4xl font-bold mb-12">Powerful AI Features</h3>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            { icon: "🎬", title: "Trim & Caption", desc: "Upload and auto-generate captions powered by AI.", button: "Start Editing" },
            { icon: "⚡", title: "AI Reels Generator", desc: "Turn long videos into short viral clips — perfect for social media.", button: "Generate Reels" },
            { icon: "🎧", title: "Audio → Video", desc: "Upload audio and let AI create matching visuals instantly.", button: "Create Video" },
            { icon: "💬", title: "Upload & Transcribe", desc: "Instantly transcribe and caption your content with accuracy.", button: "Transcribe Now" },
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-[#1a0826]/70 backdrop-blur-xl border border-purple-700/30 rounded-2xl p-8 flex flex-col justify-between shadow-lg hover:shadow-[0_0_20px_rgba(192,38,211,0.4)] transition-all"
            >
              <div>
                <h4 className="text-2xl font-bold mb-3">{f.icon} {f.title}</h4>
                <p className="text-gray-300 mb-6">{f.desc}</p>
              </div>
              <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold px-6 py-2 rounded-lg mt-auto hover:opacity-90 transition">
                {f.button}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* PRICING */}
      <motion.section
        id="pricing"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-col items-center py-24"
      >
        <h3 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h3>
        <p className="text-gray-300 mb-12">
          One plan for everything you need.{" "}
          <span className="text-pink-400 font-semibold animate-pulse">First month completely FREE!</span>
        </p>

        {/* animated gradient border */}
        <motion.div
          className="rounded-2xl p-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500"
          style={{ backgroundSize: "200% 200%" }}
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          <div className="bg-gradient-to-br from-[#2a0d45] to-[#1a0826] rounded-2xl px-12 py-16 text-center">
            <h4 className="text-3xl font-extrabold mb-4">$17.99 / month</h4>
            <p className="text-gray-300 mb-8">Unlimited uploads, AI captions, trimming, and exports.</p>
            <button className="bg-white text-purple-700 font-bold px-6 py-3 rounded-full hover:bg-purple-100 transition">
              Subscribe Now
            </button>
          </div>
        </motion.div>
      </motion.section>

      {/* ROADMAP */}
      <motion.section
        id="roadmap"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-24 px-8 bg-[#1a0826]/40 backdrop-blur-lg border-t border-purple-800/30"
      >
        <h3 className="text-center text-4xl font-bold mb-16">Roadmap</h3>
        <div className="max-w-4xl mx-auto space-y-8 relative before:absolute before:left-1/2 before:top-0 before:bottom-0 before:w-[2px] before:bg-purple-700/40">
          {[
            { phase: "Now", text: "AI Trimming, Auto Captions, Dashboard, Authentication" },
            { phase: "Next", text: "Reels Generator, Social Auto Posting, Templates" },
            { phase: "Soon", text: "AI Voice Dubbing, Text-to-Video, Brand Kits" },
            { phase: "Future", text: "Full Timeline Editor, Team Collaboration, Export Hub" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className={`relative flex items-center ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
            >
              <div className="w-[45%] bg-[#2a0d45]/60 border border-purple-600/40 rounded-xl p-6 shadow-lg">
                <h4 className="text-pink-400 font-semibold text-lg mb-2">{item.phase}</h4>
                <p className="text-gray-200">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section
        id="faq"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-24 px-6 text-center"
      >
        <h3 className="text-4xl font-bold mb-10">Frequently Asked Questions</h3>
        <div className="max-w-3xl mx-auto space-y-4 text-left">
          {[
            { q: "Do I need editing experience?", a: "Not at all. Clipify AI automates editing, captions, and trimming — anyone can use it." },
            { q: "Is my data private?", a: "Yes. Your videos and transcriptions are stored securely and never shared." },
            { q: "What’s included in the free month?", a: "Full access to all tools — unlimited uploads and exports for 30 days." },
            { q: "Can I cancel anytime?", a: "Of course. You can cancel or pause your plan from your dashboard in seconds." },
          ].map((faq, i) => (
            <FAQRow key={i} i={i} openIndex={openIndex} setOpenIndex={setOpenIndex} {...faq} />
          ))}
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-400 text-sm border-t border-purple-800/20">
        © {new Date().getFullYear()} by Clipify AI
      </footer>
    </div>
  );
}

/* FAQ row component */
function FAQRow({ q, a, i, openIndex, setOpenIndex }) {
  const open = openIndex === i;
  return (
    <div
      className="bg-[#2a0d45]/60 border border-purple-700/40 rounded-xl p-5 cursor-pointer select-none"
      onClick={() => setOpenIndex(open ? null : i)}
    >
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold text-pink-400">{q}</h4>
        <span>{open ? "−" : "+"}</span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-3 text-gray-300"
          >
            {a}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
