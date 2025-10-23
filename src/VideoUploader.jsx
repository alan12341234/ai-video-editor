import React, { useState, useRef } from "react";
import axios from "axios";
import Transcriber from "./Transcriber";

function VideoUploader() {
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_preset"); // your Cloudinary preset
    formData.append("folder", "videos/");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dds5iabyo/video/upload",
        formData
      );
      setVideoUrl(res.data.secure_url);
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      alert("Upload failed! Check console for details.");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f9fafb 0%, #eef2ff 100%)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "50px",
          borderRadius: "18px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
          textAlign: "center",
          width: "90%",
          maxWidth: "700px",
          transition: "all 0.3s ease-in-out",
          margin: "0 auto", // ensures horizontal centering
        }}
      >
        {/* HEADER */}
        <h1
          style={{
            fontSize: "2.8rem",
            fontWeight: "700",
            marginBottom: "10px",
            background: "linear-gradient(90deg, #2563eb, #9333ea)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Clipify AI
        </h1>
        <p
          style={{
            color: "#6b7280",
            fontSize: "1.05rem",
            marginBottom: "30px",
          }}
        >
          Upload your clip, let AI transcribe and enhance your content instantly.
        </p>

        {/* FILE INPUT */}
        <input
          type="file"
          accept="video/*"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        {/* BUTTON */}
        <button
          onClick={handleButtonClick}
          disabled={loading}
          style={{
            background: loading
              ? "linear-gradient(90deg, #9ca3af, #d1d5db)"
              : "linear-gradient(90deg, #2563eb, #9333ea)",
            color: "white",
            fontSize: "16px",
            padding: "14px 36px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            boxShadow: "0 6px 20px rgba(79,70,229,0.3)",
            transition: "all 0.25s ease",
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 8px 25px rgba(79,70,229,0.4)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 6px 20px rgba(79,70,229,0.3)";
          }}
        >
          {loading ? "Uploading..." : "Choose & Upload Video"}
        </button>

        {/* VIDEO PREVIEW + TRANSCRIBER */}
        {videoUrl && (
          <div style={{ marginTop: "35px" }}>
            <video
              src={videoUrl}
              controls
              style={{
                width: "100%",
                borderRadius: "14px",
                marginTop: "20px",
                boxShadow: "0 0 25px rgba(0,0,0,0.1)",
              }}
            />
            <Transcriber videoUrl={videoUrl} />
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoUploader;
