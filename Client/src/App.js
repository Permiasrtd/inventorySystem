import React, { useState } from "react";

import styled from "styled-components";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import Card from "./components/Card";

import Button from "./components/Button";

import { PuffLoader } from "react-spinners";

import { ColorPicker } from "./theme";

import { toast } from "react-toastify";

export default function App() {
  const { transcript, resetTranscript, listening } = useSpeechRecognition();
  const [transcriptData, setTranscriptData] = useState([]);


  const microphoneOn = () => {
    SpeechRecognition.startListening({ continuous: true });
    toast.success("Microphone On", { autoClose: 1500 });
  };

  const microphoneOff = () => {
    SpeechRecognition.stopListening();
    toast.error("Microphone Off", { autoClose: 1500 });
  };

  const resetParagraph = () => {
    resetTranscript();
    toast.info("Paragraph was reset", { autoClose: 1500 });
  };

  const sendParagraph = async () => {
    if (transcript.trim()) {
      const payload = { transcript };
  
      try {
        const response = await fetch('http://127.0.0.1:5000/api/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log('Backend response:', data);
  
        // Ensure both transcript and response are strings
        const responseString = typeof data.received === 'string' ? data.received : JSON.stringify(data.received);
  
        // Update the state with both transcript and response
        setTranscriptData((prevData) => [
          ...prevData,
          { transcript: transcript, response: responseString },
        ]);
  
        toast.success('Paragraph was sent successfully', { autoClose: 1500 });
      } catch (error) {
        console.error('Error sending paragraph:', error);
        toast.error('Failed to send paragraph', { autoClose: 1500 });
      }
    } else {
      toast.info('No transcript to send', { autoClose: 1500 });
    }
  
    resetTranscript();
  };
  

  const Microphone = () => {
    return (
      <Button
        color={!listening ? "success" : "danger"}
        onClick={!listening ? microphoneOn : microphoneOff}
      >
        <box-icon
          name={!listening ? "microphone" : "microphone-off"}
          color="white"
        />
      </Button>
    );
  };

  return (
    <Container>
      <Card.Container>
        <Card.Top>
          <Title>React Speech To Text</Title>
        </Card.Top>
        <Card.Content>
          <Paragraph>
            {transcript
              ? transcript
              : "Press the microphone button and start speaking."}
          </Paragraph>
          {transcriptData.length > 0 && (
            <TranscriptList>
              {transcriptData.map((item, index) => (
                <TranscriptItem key={index}>
                  <p><strong>Transcript:</strong> {item.transcript}</p>
                  <p><strong>Response:</strong> {item.response}</p>
                </TranscriptItem>
              ))}
            </TranscriptList>
          )}
        </Card.Content>
        <Card.Bottom>
          <BottomContainer>
            <LoadingBox>
              <PuffLoader
                size={50}
                loading={listening}
                color={`rgb(${ColorPicker("primary")})`}
              />
            </LoadingBox>
            <ButtonBox>
              <Microphone />
              <Button color="primary" onClick={resetParagraph}>
                <box-icon name="reset" color="white" />
              </Button>
              <Button color="primary" onClick={sendParagraph}>
                <box-icon name="send" color="white" />
              </Button>
            </ButtonBox>
          </BottomContainer>
        </Card.Bottom>
      </Card.Container>
    </Container>
  );  
}

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;

  justify-content: center;
`;

const Title = styled.h2`
  padding: 0.5rem;
`;

const Paragraph = styled.p`
  padding: 0.5rem;
`;

const ButtonBox = styled.div`
  display: flex;
  column-gap: 0.5rem;
  padding: 0.5em;
`;

const BottomContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-between;
`;

const LoadingBox = styled.div``;

const TranscriptList = styled.ul`
  margin-top: 1rem;
  padding: 0;
  list-style-type: none;
`;

const TranscriptItem = styled.li`
  border: 1px solid #ddd;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
`;
