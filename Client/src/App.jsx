import React, { useState, useEffect, useRef } from "react";

const App = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");

  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setError("Speech Recognition is not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = "en-US";
    recognitionRef.current.interimResults = false;
    recognitionRef.current.maxAlternatives = 1;

    recognitionRef.current.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript((prev) => `${prev} ${speechResult}`);
    };

    recognitionRef.current.onerror = (event) => {
      setError(`Error occurred in speech recognition: ${event.error}`);
    };

    recognitionRef.current.onend = () => {
      if (isListening) {
        recognitionRef.current.start();
      }
    };
  }, [isListening]);

  const startListening = () => {
    if (!recognitionRef.current) return;
    setIsListening(true);
    setTranscript(""); // Clear transcript when starting a new session
    setError("");
    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (!recognitionRef.current) return;
    setIsListening(false);
    recognitionRef.current.stop();
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        marginLeft: "25%",
        marginRight: "auto",
        width: "1000px",
        border: "1px solid black",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Speech-to-Text Converter</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <textarea
        rows="10"
        cols="50"
        value={transcript}
        readOnly
        style={{
          marginBottom: "20px",
          padding: "10px",
          fontSize: "16px",
          marginLeft: "250px",
          marginRight: "auto",
        }}
      />
      <br />
      <div style={{ marginLeft: "330px" }}>
        <button
          onClick={startListening}
          disabled={isListening}
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            background: isListening ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            cursor: isListening ? "not-allowed" : "pointer",
          }}
        >
          Start Listening
        </button>
        <button
          onClick={stopListening}
          disabled={!isListening}
          style={{
            padding: "10px 20px",
            background: isListening ? "#dc3545" : "#ccc",
            color: "white",
            border: "none",
            cursor: isListening ? "pointer" : "not-allowed",
          }}
        >
          Stop Listening
        </button>
      </div>
    </div>
  );
};

console.log("BALALAL")

export default App;
