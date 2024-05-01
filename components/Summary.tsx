


import React from 'react'
import { ScrollArea } from './ui/scroll-area';

type Props = {
    summaryData: string[],
}

const Summary: React.FC<Props> = ({summaryData}) => {
  return (
  <ScrollArea className='h-5/6 flex flex-col justify-center items-center'>
    {
    summaryData && summaryData.map((value,index) => (
    <div key={index} className='w-full text-wrap text-start my-2 p-2 flex flex-col justify-center items-center'>
        <div className=" sm:w-1/2 md:w-1/4">
          <span key ={index} >{value}</span>
        </div>
    </div>
    ))
    }
  </ScrollArea>
  )
}


export default Summary;