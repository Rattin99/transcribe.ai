"use client";

import { Meeting, UserContext } from '@/components/AuthProvider';
import Notes from '@/components/Notes';
import Summary from '@/components/Summary';
import Transcription from '@/components/Transcription';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useAuth from '@/components/useAuth';
import { splitString } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { AudioRecorder } from 'react-audio-voice-recorder';

export default function page() {

  const [text,setText] = useState<string>('');
  const [transcribeArray,setTranscribeArray] = useState<Array<string>>([]);
  const [summary,setSummary] = useState([]);
  const [notes,setNotes] = useState([]);
  const [meetingId, setMeetingID] = useState("");
  const [meetingName,setMeetingName] = useState("Meeting");

    const router = useRouter();



  const userContext = useContext(UserContext);

  //@ts-ignore
  const {setMeetings} = userContext;


  
  
    const handleMeetingNameChange = async (value: string) => {
    
      const token = localStorage.getItem('token');
  
     if(meetingId === "") return;

     try{
      const response = await fetch(`http://localhost:5000/api/v1/transcribe/update-meeting-name/${meetingId}`,{
          method: "PUT",
          headers: {
              "Authorization": `${token}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              meetingName: value
          })
      })
      
      const res = await response.json();
  
      setMeetings((meetings: Meeting[]) => {
        const newMeetings = meetings.map((v,index) => {
          if(v.id === meetingId){
            v.meetingName = value
          }

          return v;
        })

        return newMeetings;
      })

      setMeetingName(value)
    }catch(err) {
      console.log(err)
    }
     
    }

  async function sendFile(formData: FormData) {
    
    const token = localStorage.getItem('token');

    try{
        const response = await fetch(`http://localhost:5000/upload?meetingId=${meetingId}`, {
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


    setText((prev) => prev + res.text)
    setMeetingID(res.meetingId);

    const id = res.meetingId;

    //add new meeting to navbar
      const newMeeting = {
        dateTime: res.created_at,
        id: res.meetingId,
        meetingName: meetingName
      }

      //@ts-ignore
      setMeetings((meetings) => {
        console.log(meetings)

        return [newMeeting,...meetings]
      });

    // get the summary and notes for the new text
    const newText = text + res.text;
    getTranscriptionSummary(newText,id)
    getTranscriptionNotes(newText,id)
    setTranscribeArray(splitString(newText))

    
    }catch(err) {
        console.log(err)
    }
    
  }

  const getTranscriptionSummary = async (text: string,Id:string) => {

    const token = localStorage.getItem('token');

    const id = meetingId === "" ? Id : meetingId;

    try {
        const response = await fetch(`http://localhost:5000/summary?meetingId=${id}`,{
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

        setSummary(res.summaryData)
    }catch (err) {
        console.log(err)
    }
  }

  const getTranscriptionNotes = async (text: string,Id:string) => {
    const token = localStorage.getItem('token');
  
    const id = meetingId === "" ? Id : meetingId;
     try{
      const response = await fetch(`http://localhost:5000/notes?meetingId=${id}`,{
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
  
        setNotes(res.notesData)
     }catch(err) {
      console.log(err)
     }
    }
  
  const handleAudioRecord = async (blob:Blob) => {
    try{
     const fileReader = new FileReader();
     fileReader.readAsArrayBuffer(blob);
     fileReader.onload = async () => {
         const arrayBuffer = fileReader.result as ArrayBuffer;
         const formData = new FormData();
         formData.append('file', new Blob([arrayBuffer]), 'recording.mp3');
 
         await sendFile(formData);
     }
    }catch(err){
     console.log(err)
    }
  }

  useAuth();

  useEffect(() => {
    // re-route to meeting 
    if(summary.length > 0 && notes.length > 0){
      router.push(`/meeting/${meetingId}`)
    }
  },[meetingId,summary,notes])
  
  return (
    <div className="w-full bg-muted   sm:w-[88%] h-screen flex flex-col justify-center items-center">
      <div className="w-1/3 h-1/5 flex flex-col justify-around items-center">
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="p-2">
            <input type="text" onBlur={(e) => handleMeetingNameChange(e.target.value)} className="text-center bg-muted sm:text-2xl"  defaultValue={meetingName}/>
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
      <Tabs className="w-full bg-white h-4/5"  defaultValue="transcribe" >
            <TabsList className="flex justify-center items-center bg-muted rounded-none">
              <TabsTrigger className="w-40" value="transcribe">Transcribe</TabsTrigger>
              <TabsTrigger className="w-40" value="summary">Summary</TabsTrigger>
              <TabsTrigger className="w-40" value="notes" >Notes</TabsTrigger>
            </TabsList>
            <TabsContent value="transcribe" className=" w-full h-full ">
              <Transcription  transcribeArray={transcribeArray}/>
            </TabsContent>
            <TabsContent value="summary" className="w-full h-full">
              <Summary summaryData=      {summary} /> 
            </TabsContent>
            <TabsContent value="notes" className=" w-full h-full">
              <Notes notesData ={notes} />
            </TabsContent>
        </Tabs>
    </div>
  )
}
