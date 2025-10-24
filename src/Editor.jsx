import React, { useState, useRef } from "react";

export default function Editor() {
  const [videoSrc, setVideoSrc] = useState(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [inPoint, setInPoint] = useState(0);
  const [outPoint, setOutPoint] = useState(0);
  const [isCropping, setIsCropping] = useState(false);
  const videoRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoSrc(URL.createObjectURL(file));
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    setDuration(video.duration);
    setOutPoint(video.duration);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) video.play();
    else video.pause();
  };

  const handleExport = () => {
    alert("Export functionality will be handled by FFmpeg soon!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0826] via-[#2a0d45] to-[#441a76] text-white flex flex-col items-center justify-center p-6">
      {/* Header */}
      <header className="w-full flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold tracking-wide">
          🎬 Clipify AI Editor
        </h1>
        <a
          href="/"
          className="text-sm text-gray-300 hover:text-white transition"
        >
          ← Back to Home
        </a>
      </header>

      {/* Upload Section */}
      <div className="bg-[#2a0d45]/40 border border-purple-600/40 rounded-2xl p-8 w-full max-w-3xl shadow-xl backdrop-blur-md">
        {!videoSrc ? (
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="text-xl font-semibold mb-4">
              Upload a video to begin editing
            </h2>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileUpload}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
              file:text-sm file:font-semibold 
              file:bg-gradient-to-r file:from-purple-500 file:to-pink-500 file:text-white 
              hover:file:opacity-90 cursor-pointer"
            />
          </div>
        ) : (
          <>
            {/* Video Player */}
            <div className="relative flex flex-col items-center">
              <video
                ref={videoRef}
                src={videoSrc}
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                className="rounded-lg shadow-2xl border border-purple-500/30 mb-6 max-h-[420px]"
                style={{ transform: `scale(${zoom})` }}
                controls
              />
              <div className="flex gap-4 mb-4">
                <button
                  onClick={handlePlayPause}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-sm font-semibold hover:opacity-90"
                >
                  Play / Pause
                </button>
                <button
                  onClick={handleExport}
                  className="px-4 py-2 bg-white text-purple-700 font-semibold rounded-lg hover:bg-gray-100"
                >
                  Export Trimmed MP4
                </button>
              </div>
            </div>

            {/* Controls */}
            <div className="text-sm text-gray-300 mb-2">
              Duration: {duration.toFixed(2)}s | Time: {currentTime.toFixed(2)}s
            </div>

            {/* Zoom Slider */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm text-gray-300">Zoom</span>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(e.target.value)}
                className="w-40 accent-pink-500"
              />
              <span className="text-sm text-gray-400">{zoom}x</span>
            </div>

            {/* Crop Toggle */}
            <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={isCropping}
                onChange={() => setIsCropping(!isCropping)}
                className="accent-pink-500"
              />
              Enable Crop Overlay
            </label>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-8 text-gray-400 text-sm">
        © {new Date().getFullYear()} Clipify AI · Built by Finstride
      </footer>
    </div>
  );
}
