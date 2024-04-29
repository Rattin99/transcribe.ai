import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


type TranscribeObject = {
  created_at: string,
  id: string,
  meeting_id: string,
  transcribe: string,
}

export function allTranscribedText(transcribeData:TranscribeObject[]) {
  let text = "";

  transcribeData.map((value,index) => {
    text += value.transcribe;
  })

  console.log(transcribeData)
  return text;
}