import React from "react";
import VideoUploader from "./VideoUploader";

function App() {
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      <VideoUploader />
    </div>
  );
}

export default App;
