import React, { useState, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { QRCodeSVG } from "qrcode.react";
import { Button, TextField, Select, MenuItem, Card, CardContent, Typography, Box, Link } from "@mui/material";

const firebaseConfig = {
  apiKey: "AIzaSyCRBIafHOkEkaggvjxwYI5TRTOZX6j8kOY",
  authDomain: "team-enthiran-event-login.firebaseapp.com",
  projectId: "team-enthiran-event-login",
  storageBucket: "team-enthiran-event-login.firebasestorage.app",
  messagingSenderId: "548157754417",
  appId: "1:548157754417:web:2848554ddd919b47671910",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const generateRandomCode = () => {
  return Math.random().toString(36).substring(2, 18).toUpperCase();
};

export default function QRGenerator() {
  const [teamName, setTeamName] = useState("");
  const [teamLeader, setTeamLeader] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [eventName, setEventName] = useState("webmimic");
  const [qrData, setQrData] = useState(null);
  const qrRef = useRef(null);

  const handleGenerateQR = async () => {
    const qrCode = generateRandomCode();
    const eventData = {
      teamName,
      teamLeader,
      mobileNumber,
      participantName,
      eventName,
      qrCode,
      entry: false // Added entry field set to false by default
    };

    await setDoc(doc(db, "event_entries", qrCode), eventData);
    setQrData(qrCode);
  };

  // Helper function to convert SVG to PNG data URL
  const convertSvgToPngDataUrl = (callback) => {
    const svgElement = document.getElementById("qrCode");
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext("2d");
      // Draw white background and the image
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      
      const pngDataUrl = canvas.toDataURL("image/png");
      URL.revokeObjectURL(url);
      callback(pngDataUrl);
    };
    
    img.src = url;
  };

  const downloadQRCode = () => {
    convertSvgToPngDataUrl((pngDataUrl) => {
      const link = document.createElement("a");
      link.href = pngDataUrl;
      link.download = `${teamName}_${mobileNumber}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const sendToWhatsApp = () => {
    const formattedNumber = mobileNumber.replace(/\D/g, '');
    
    convertSvgToPngDataUrl((pngDataUrl) => {

      const tempLink = document.createElement("a");
      tempLink.href = pngDataUrl;
      tempLink.download = `${teamName}_QR.png`;
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      
      const whatsappMessage = `Hello ${teamLeader}, here's your QR code for the ${eventName} event. Your code is: ${qrData}\n\nPlease use the QR image just downloaded to your device.`;
      const whatsappURL = `https://wa.me/91${formattedNumber}?text=${encodeURIComponent(whatsappMessage)}`;
      
      setTimeout(() => {
        window.open(whatsappURL, '_blank');
      }, 500);
    });
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 p-4">
      {/* Header */}
      <Box
        sx={{
          width: "100%",
          padding: "20px 0",
          textAlign: "center",
          marginBottom: "20px"
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: "'Azonix', sans-serif",
            fontWeight: 700,
            letterSpacing: "2px",
            color: "transparent",
            background: "linear-gradient(45deg, #2563eb, #ec4899)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            textShadow: "0 10px 20px rgba(0,0,0,0.2)",
            fontSize: { xs: "2.5rem", md: "3.5rem" }
          }}
        >
          TEAM ENTHIRAN
        </Typography>
      </Box>

      {/* Main Content */}
      <Card
        className="w-full max-w-lg bg-opacity-30 backdrop-blur-lg border border-gray-700 rounded-3xl shadow-2xl p-6 text-center"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
          borderRadius: "24px",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            className="font-bold text-gray-300 mb-6"
            style={{
              color: "white",
              background: "linear-gradient(90deg, #4f46e5, #e11d48)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Hackathon QR Generator
          </Typography>

          {/* Inputs */}
          <TextField
            label="Team Name"
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{ style: { color: "#aaa" } }}
            InputProps={{
              style: {
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
              },
            }}
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
          <TextField
            label="Team Leader"
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{ style: { color: "#aaa" } }}
            InputProps={{
              style: {
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
              },
            }}
            value={teamLeader}
            onChange={(e) => setTeamLeader(e.target.value)}
          />
          <TextField
            label="Mobile Number"
            type="tel"
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{ style: { color: "#aaa" } }}
            InputProps={{
              style: {
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
              },
            }}
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
          <TextField
            label="Participant Name"
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{ style: { color: "#aaa" } }}
            InputProps={{
              style: {
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
              },
            }}
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
          />
          <Select
            fullWidth
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            variant="outlined"
            style={{
              color: "white",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "12px",
              marginTop: "16px"
            }}
          >
            <MenuItem value="webmimic">Webmimic</MenuItem>
            <MenuItem value="codequest">Codequest</MenuItem>
          </Select>

          {/* Generate QR Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={handleGenerateQR}
            sx={{
              background: "linear-gradient(90deg, #4f46e5, #e11d48)",
              marginTop: "1.5rem",
              fontSize: "1rem",
              padding: "12px",
              borderRadius: "12px",
            }}
          >
            Generate QR Code
          </Button>
        </CardContent>

        {/* QR Code Display */}
        {qrData && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-300">{teamName}</h2>
            <div className="p-4 bg-white rounded-xl inline-block shadow-lg mt-4">
              <QRCodeSVG id="qrCode" value={qrData} size={200} ref={qrRef} />
            </div>
            <p className="text-sm text-gray-300 mt-2">{mobileNumber}</p>

            {/* Download QR Button */}
            <Button
              variant="contained"
              onClick={downloadQRCode}
              sx={{
                background: "linear-gradient(90deg, #e11d48, #4f46e5)",
                marginTop: "1rem",
                fontSize: "1rem",
                padding: "12px",
                borderRadius: "12px",
                width: "100%"
              }}
            >
              Download QR Code (PNG)
            </Button>

            {/* Send to WhatsApp Button */}
            <Button
              variant="contained"
              onClick={sendToWhatsApp}
              sx={{
                background: "linear-gradient(90deg, #25D366, #128C7E)",
                marginTop: "1rem",
                fontSize: "1rem",
                padding: "12px",
                borderRadius: "12px",
                width: "100%"
              }}
            >
              Send to WhatsApp
            </Button>
          </div>
        )}
      </Card>

      {/* Footer */}
      <Box
        sx={{
          width: "100%",
          padding: "20px 0",
          textAlign: "center",
          marginTop: "30px",
          color: "rgba(255, 255, 255, 0.7)",
          background: "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(5px)",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)"
        }}
      >
        <Typography variant="body2" sx={{ marginBottom: "5px" }}>
          © 2025 Team Enthiran. All Rights Reserved.
        </Typography>
        <Typography variant="body2">
          Made by Aditya Raj - <Link href="mailto:adityaraj94505@gmail.com" sx={{ color: "#4f46e5", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
            Contact Developer
          </Link>
        </Typography>
      </Box>
    </div>
  );
}