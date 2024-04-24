"use client";

import { useState } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";

export default function Home() {

  const [text,setText] = useState('')


  async function sendFile(formData: FormData) {
    const response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
      
    })

    if (!response.ok) {
      console.error('Error: ', response);
    }

    const res = await response.json();

    console.log(res)
    setText(res.text)
  }

  const addAudioELement = async (blob:Blob) => {
   const fileReader = new FileReader();
   fileReader.readAsArrayBuffer(blob);
   fileReader.onload = async () => {
     const arrayBuffer = fileReader.result as ArrayBuffer;
     const formData = new FormData();
     formData.append('file', new Blob([arrayBuffer]), 'recording.mp3');

    await sendFile(formData);
    
   }
  }

  return (
    <main>
      <AudioRecorder onRecordingComplete={addAudioELement} audioTrackConstraints={{
        noiseSuppression: true,
        echoCancellation: true
      }} onNotAllowedOrFound={(err) => {console.log(err)}} downloadOnSavePress = {false} downloadFileExtension="mp3" />

      <p>{text}</p>
    </main>
  );
}
