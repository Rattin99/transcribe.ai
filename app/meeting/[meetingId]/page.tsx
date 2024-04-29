"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {Menu} from 'lucide-react';
import { useParams } from "next/navigation";


export default function Meeting() {

  const params = useParams();

  const [text,setText] = useState('');
  const [summary,setSummary] = useState('');
  const [notes,setNotes] = useState('');
  const [isNavbarOpen, setNavbarOpen] = useState(false);
  const [meetingId, setMeetingID] = useState(params.meetingId);

  const token = localStorage.getItem('token');


  async function sendFile(formData: FormData) {
    const response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      headers: {
        "Authorization": `${token}`
      },
      body: formData,
      
    })

    if (!response.ok) {
      console.error('Error: ', response);
    }

    const res = await response.json();
    setText(res.text)
    setMeetingID(res.meetingId);
    console.log(res);
  }

  const handleAudioRecord = async (blob:Blob) => {
   const fileReader = new FileReader();
   fileReader.readAsArrayBuffer(blob);
   fileReader.onload = async () => {
     const arrayBuffer = fileReader.result as ArrayBuffer;
     const formData = new FormData();
     formData.append('file', new Blob([arrayBuffer]), 'recording.mp3');

    await sendFile(formData);
    
   }
  }

  const getTranscriptionSummary = async (text: string) => {
    const response = await fetch(`http://localhost:5000/summary?meetingId=${meetingId}`,{
      method: "POST",
      headers: {
        "Authorization": `${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "text": text
      }),
    })

    if(!response.ok) {
      console.log('Error:',response);
    }

    const res = await response.json();

    setSummary(res.text)
  }

  const getTranscriptionNotes = async (text: string) => {
    const response = await fetch(`http://localhost:5000/notes?meetingId=${meetingId}`,{
      method: "POST",
      headers: {
        "Authorization": `${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "text": text
      }),
    })

    if(!response.ok) {
      console.log('Error:',response);
    }

    const res = await response.json();

    setNotes(res.text)
  }

  useEffect( () =>{
   if( text !== ""){
    getTranscriptionSummary(text)
    getTranscriptionNotes(text)
   }
  },[text])

  return (
    <main className="w-screen h-screen flex ">
      <Menu onClick={ () => {setNavbarOpen(!isNavbarOpen)} } className="size-10 m-2 block absolute top-0 right-0 sm:hidden" />
      <Navbar isOpen= {isNavbarOpen}/>
     
     <div className="w-full bg-muted   sm:w-[88%] h-screen flex flex-col justify-center items-center">
        <div className="w-1/3 h-1/5 flex flex-col justify-around items-center">
          <div className="flex flex-col justify-center items-center mt-5">
            <div className="p-2">
              <input type="text" className="text-center bg-muted sm:text-2xl"  defaultValue={'Meeting'}/>
            </div>
            <span className= "text-xs sm:text-base">April 25, 2024</span>
          </div>
          <div className="sm:p-2  sm:mt-2">
            <AudioRecorder onRecordingComplete={handleAudioRecord}        
                audioTrackConstraints={{
                noiseSuppression: true,
                echoCancellation: true
                }} onNotAllowedOrFound={(err) => {console.log(err)}} downloadOnSavePress = {false} downloadFileExtension="mp3" />
          </div>
        </div>
        <div className=" w-full bg-white h-3/4 flex justify-center">
          <Tabs className="w-full "  defaultValue="transcribe" >
              <TabsList className="flex justify-center items-center bg-muted rounded-none">
                <TabsTrigger value="transcribe">Transcribe</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="notes" >Notes</TabsTrigger>
              </TabsList>
             <div className="w-full flex justify-center ">
               <div className="w-full sm:w-1/2">
                <TabsContent value="transcribe" className=" flex justify-center">
                    <p className="text-wrap p-2 text-center">
                      {text}
                    </p>
                  </TabsContent>
                  <TabsContent value="summary" className=" flex justify-center"> <p className="text-wrap p-2 text-center">
                      {summary}
                    </p></TabsContent>
                  <TabsContent value="notes" className=" flex justify-center"><p className="text-wrap p-2 text-center">
                      {notes}
                    </p>
                  </TabsContent>
               </div>
             </div>
          </Tabs>
        </div>
     </div>
        
    </main>
  );
}