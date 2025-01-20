const QRCode = require("qrcode");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { json } = req.body;

    try {
      const qrCode = await QRCode.toDataURL(JSON.stringify(json));
      res.status(200).json({ qrCode });
    } catch (error) {
      res.status(500).json({ error: "Failed to generate QR code" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
