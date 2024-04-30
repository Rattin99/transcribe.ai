


import React from 'react'

type Props = {
    summaryData: string[],
}

const Summary: React.FC<Props> = ({summaryData}) => {
  return (
   <div className='flex flex justify-center items-center w-1/2'>
     <div className="text-wrap text-start flex flex-col">
        <h2 className='text-lg font-bold text p-2'>Transcription Summary:</h2>
        {summaryData && summaryData.map((value,index) => {
            return (
                <span key={index} className='my-1'>{value}</span>
            )
        })}
     </div>
   </div>
  )
}


export default Summary;