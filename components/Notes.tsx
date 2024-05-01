

import React from 'react'
import { ScrollArea } from './ui/scroll-area'

type Props = {
    notesData: string[],
}

const Notes: React.FC<Props> = ({notesData}) => {
  return (

    <ScrollArea className='h-5/6 flex flex-col justify-center items-center'>
    {
    notesData && notesData.map((value,index) => {
        if(value.includes(":")) return (
            <div key={index} className='w-full text-wrap text-start my-2 p-2 flex flex-col justify-center items-center'>
            <div className=" sm:w-1/2 md:w-1/4 text-lg font-bold">
              <span key ={index} >{value}</span>
            </div>
        </div>
        )
        else return (
            <div key={index} className='w-full text-wrap text-start my-2 p-2 flex flex-col justify-center items-center'>
            <div className=" sm:w-1/2 md:w-1/4">
              <span key ={index} >{value}</span>
            </div>
        </div>
        )
    })
    }
  </ScrollArea>
   
  )
}


export default Notes;