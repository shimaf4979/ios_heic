import React, { useState } from "react";

export default function App() {
  const [accept, setAccept] = useState<"image/*" | "image/jpeg">("image/*");
  const [preview, setPreview] = useState<string | null>(null);
  const [fileInfo, setFileInfo] = useState<string | null>(null);
  const [loadTime, setLoadTime] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
    setFileInfo(`${file.name} (${file.type || "不明"})`);
    setStartTime(performance.now()); // 計測開始
    setLoadTime(null);
  };

  const handleImageLoad = () => {
    if (startTime !== null) {
      setLoadTime(performance.now() - startTime);
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <h1>iOS カメラ形式テスト</h1>

      {/* accept 切り替え */}
      <div style={{ marginBottom: "1em" }}>
        <label>
          <input
            type="radio"
            value="image/*"
            checked={accept === "image/*"}
            onChange={() => setAccept("image/*")}
          />
          accept=image/*
        </label>
        <label style={{ marginLeft: "1em" }}>
          <input
            type="radio"
            value="image/jpeg"
            checked={accept === "image/jpeg"}
            onChange={() => setAccept("image/jpeg")}
          />
          accept=image/jpeg
        </label>
      </div>

      <input type="file" accept={accept} onChange={handleFileChange} />

      {preview && (
        <div style={{ marginTop: "1em" }}>
          <img
            src={preview}
            alt="preview"
            onLoad={handleImageLoad}
            style={{
              maxWidth: "300px",
              display: "block",
              marginBottom: "10px",
            }}
          />
          <p>形式: {fileInfo}</p>
          {typeof loadTime === "number" && (
            <p>表示にかかった時間: {loadTime.toFixed(2)} ms</p>
          )}
        </div>
      )}
    </div>
  );
}
