import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Show “desktop only” message if mobile
  if (isMobile) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          textAlign: "center",
          padding: "20px",
          background: "linear-gradient(135deg, #1e003e, #2e005a)",
          color: "white",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>
          🚀 Clipify AI is Desktop-Optimized
        </h1>
        <p style={{ fontSize: "1.1rem", opacity: 0.9 }}>
          For the best experience, please visit on your laptop or desktop
          computer.
        </p>
      </div>
    );
  }

  // Landing page desktop version
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1e003e, #2e005a)",
        color: "white",
        fontFamily: "Inter, sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* Navbar */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "25px 60px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <h1 style={{ fontSize: "1.8rem", fontWeight: "700" }}>Clipify AI</h1>
        <nav style={{ display: "flex", alignItems: "center", gap: "30px" }}>
          <a href="#features" style={{ color: "#ccc", textDecoration: "none" }}>
            Features
          </a>
          <a href="#pricing" style={{ color: "#ccc", textDecoration: "none" }}>
            Pricing
          </a>
          <a href="#faq" style={{ color: "#ccc", textDecoration: "none" }}>
            FAQ
          </a>
          <Link
            to="/sign-in"
            style={{
              color: "#fff",
              textDecoration: "none",
              padding: "8px 18px",
              border: "1px solid #fff",
              borderRadius: "8px",
            }}
          >
            Log In
          </Link>
          <Link
            to="/sign-up"
            style={{
              background: "linear-gradient(90deg, #9b5cff, #d46bff)",
              color: "white",
              textDecoration: "none",
              padding: "8px 18px",
              borderRadius: "8px",
              fontWeight: "600",
            }}
          >
            Create Account
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        style={{
          textAlign: "center",
          padding: "100px 20px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontSize: "3.2rem", fontWeight: "800", marginBottom: "20px" }}
        >
          Edit. Transcribe. Create. Effortlessly.
        </motion.h2>
        <p style={{ fontSize: "1.2rem", color: "#ccc", marginBottom: "40px" }}>
          Upload, edit, trim, and caption videos powered by AI — simplicity meets
          creativity.
        </p>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            to="/editor"
            style={{
              background: "linear-gradient(90deg, #9b5cff, #d46bff)",
              color: "white",
              padding: "14px 34px",
              borderRadius: "10px",
              fontSize: "1.1rem",
              fontWeight: "600",
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
          >
            Start Creating
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: "100px 20px", textAlign: "center" }}>
        <h3 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "60px" }}>
          Powerful AI Features
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "30px",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          <FeatureCard
            title="Trim & Caption"
            desc="Upload and auto-generate captions powered by AI."
            color="#a67eff"
          />
          <FeatureCard
            title="⚡ AI Reels Generator"
            desc="Turn long videos into short viral clips — perfect for social media."
            color="#ff6bcd"
          />
          <FeatureCard
            title="🎧 Audio ➜ Video"
            desc="Upload audio and let AI create matching visuals instantly."
            color="#a3ffce"
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" style={{ padding: "100px 20px", maxWidth: "900px", margin: "0 auto" }}>
        <h3 style={{ fontSize: "2rem", fontWeight: "700", textAlign: "center", marginBottom: "40px" }}>
          Frequently Asked Questions
        </h3>

        {faqData.map((item, i) => (
          <FAQRow
            key={i}
            q={item.q}
            a={item.a}
            i={i}
            openIndex={openIndex}
            setOpenIndex={setOpenIndex}
          />
        ))}
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          textAlign: "center",
          padding: "30px",
          fontSize: "0.9rem",
          color: "#bbb",
        }}
      >
        © {new Date().getFullYear()} Clipify AI — All rights reserved.
      </footer>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ title, desc, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      style={{
        background: "rgba(255,255,255,0.05)",
        borderRadius: "15px",
        padding: "40px 25px",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <h4 style={{ color, fontWeight: "700", marginBottom: "10px" }}>{title}</h4>
      <p style={{ color: "#ccc" }}>{desc}</p>
    </motion.div>
  );
}

// FAQ Row Component
function FAQRow({ q, a, i, openIndex, setOpenIndex }) {
  const open = openIndex === i;

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.05)",
        borderRadius: "12px",
        marginBottom: "15px",
        padding: "20px 25px",
        cursor: "pointer",
      }}
      onClick={() => setOpenIndex(open ? null : i)}
    >
      <h4 style={{ margin: 0, color: "#fff", fontSize: "1.1rem" }}>{q}</h4>
      <AnimatePresence>
        {open && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ marginTop: "10px", color: "#ccc", fontSize: "0.95rem" }}
          >
            {a}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// FAQ Data
const faqData = [
  {
    q: "What is Clipify AI?",
    a: "Clipify AI is an intelligent video editor that helps you trim, caption, and create content automatically using AI.",
  },
  {
    q: "Do I need editing experience?",
    a: "Not at all. Clipify is designed for creators of all levels — just upload your video, and our AI handles the rest.",
  },
  {
    q: "Can I use it for commercial projects?",
    a: "Yes! All content you create with Clipify AI can be used commercially with full rights.",
  },
  {
    q: "Does it support multiple languages?",
    a: "Absolutely — Clipify’s AI transcription and captioning support multiple major languages.",
  },
];
