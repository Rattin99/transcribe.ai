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

export function splitString(x:string) {
  const segments =  x.split(/[\n.?]+/);

  const trimmedSegments = segments.map(segment => segment.trim());

  // Remove any empty strings from the array
  const nonEmptySegments = trimmedSegments.filter(segment => segment.length > 0);

  return nonEmptySegments;
}

export function allTranscribedText(transcribeData:TranscribeObject[]) {

  let text = "";
  let textArray: Array<string> = [];

  transcribeData.map((value,index) => {

    text += value.transcribe;
    splitString(value.transcribe).map((v) => {
      textArray.push(v);
    })
  })

  
  return {
    textArray,
    text
  }
}

