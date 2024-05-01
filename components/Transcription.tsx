



import React from 'react'
import { ScrollArea } from './ui/scroll-area'

type Props = {
    transcribeArray: Array<string>
}


const Transcription:React.FC<Props> = ({transcribeArray}) => {

    return (
        <ScrollArea className='h-5/6 flex flex-col justify-center items-center'>
            {
            transcribeArray && transcribeArray.map((value,index) => (
            <div key={index} className='w-full text-wrap text-start my-2 p-2 flex flex-col justify-center items-center'>
                <div className=" w-full p-2 sm:p-0 sm:w-2/3 lg:w-1/4">
                <span key ={index} >{value}</span>
                </div>
            </div>
            ))
            }
        </ScrollArea>
      
    )
}

export default Transcription;