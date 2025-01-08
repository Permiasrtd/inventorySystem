import React, { useState, useEffect, useRef } from "react";

const App = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcripts, setTranscripts] = useState([]);
  const [currentTranscript, setCurrentTranscript] = useState("");
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
      setCurrentTranscript((prev) => `${prev} ${speechResult}`);
    };

    recognitionRef.current.onerror = (event) => {
      setError(`Error occurred in speech recognition: ${event.error}`);
    };

    recognitionRef.current.onend = () => {
      if (currentTranscript) {
        setTranscripts((prevTranscripts) => [...prevTranscripts, currentTranscript]);
        sendTranscriptToBackend(currentTranscript);
        setCurrentTranscript("");
      }
      if (isListening) {
        recognitionRef.current.start();
      }
    }
  }, [isListening, currentTranscript]);

  const startListening = () => {
    if (!recognitionRef.current) return;
    setIsListening(true);
    setError("");
    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (!recognitionRef.current) return;
    setIsListening(false);
    recognitionRef.current.stop();
  };

  const sendTranscriptToBackend = async (transcript) => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transcript }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Backend response:", data);
    } catch (error) {
      console.error("Error sending transcript to backend:", error);
      setError("Failed to send transcript to backend.");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", margin: "0 auto", width: "600px", border: "1px solid black" }}>
      <h1 style={{ textAlign: "center" }}>Speech-to-Text Converter</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <h2>Transcripts</h2>
        <ul>
          {transcripts.map((text, index) => (
            <li key={index}>{text}</li>
          ))}
        </ul>
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
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
