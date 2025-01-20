import { useState } from "react";

export default function Home() {
  const [jsonInput, setJsonInput] = useState("{}");
  const [qrCode, setQrCode] = useState("");

  const generateQRCode = async () => {
    try {
      const response = await fetch("/api/generateQR", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ json: JSON.parse(jsonInput) }),
      });

      const data = await response.json();
      if (data.qrCode) {
        setQrCode(data.qrCode);
      } else {
        alert("Error generating QR Code");
      }
    } catch (error) {
      alert("Invalid JSON or server error.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>QR Code Generator</h1>
      <textarea
        rows="10"
        cols="50"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter JSON here"
      />
      <br />
      <button onClick={generateQRCode}>Generate QR Code</button>
      <br />
      {qrCode && (
        <div>
          <h3>Your QR Code:</h3>
          <img src={qrCode} alt="Generated QR Code" />
        </div>
      )}
    </div>
  );
}
