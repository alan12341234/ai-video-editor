import React, { useState } from "react";
import axios from "axios";

function Transcriber({ videoUrl }) {
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranscribe = async () => {
    setLoading(true);
    setTranscript("");

    try {
      const response = await axios.post(
        "https://api.assemblyai.com/v2/transcript",
        { audio_url: videoUrl },
        {
          headers: {
            authorization: "2e1f395b40a14f58be4ba57452316b91", // your AssemblyAI key
            "content-type": "application/json",
          },
        }
      );

      const transcriptId = response.data.id;

      // Poll for completion
      let status = "";
      while (status !== "completed") {
        const poll = await axios.get(
          `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
          { headers: { authorization: "2e1f395b40a14f58be4ba57452316b91" } }
        );
        status = poll.data.status;
        if (status === "completed") {
          setTranscript(poll.data.text);
          break;
        }
        if (status === "error") {
          alert("Transcription failed!");
          break;
        }
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    } catch (err) {
      console.error("Transcription error:", err);
      alert("Transcription failed!");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <button
        onClick={handleTranscribe}
        disabled={loading}
        style={{
          background: loading
            ? "linear-gradient(90deg, #9ca3af, #d1d5db)"
            : "linear-gradient(90deg, #2563eb, #9333ea)",
          color: "white",
          fontSize: "16px",
          padding: "12px 28px",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          marginTop: "10px",
          boxShadow: "0 6px 20px rgba(79,70,229,0.3)",
          transition: "all 0.2s ease",
        }}
      >
        {loading ? "Transcribing..." : "Generate Captions"}
      </button>

      {transcript && (
        <div
          style={{
            marginTop: "30px",
            background: "#f9fafb",
            borderRadius: "14px",
            padding: "20px 25px",
            maxWidth: "700px",
            textAlign: "left",
            lineHeight: "1.6",
            color: "#111827", // black text
            fontSize: "1rem",
            boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
          }}
        >
          <h3
            style={{
              fontWeight: "600",
              marginBottom: "10px",
              color: "#1f2937",
            }}
          >
            Transcription:
          </h3>
          <p>{transcript}</p>
        </div>
      )}
    </div>
  );
}

export default Transcriber;
