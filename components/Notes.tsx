

import React from 'react'

type Props = {
    notesData: string[],
}

const Notes: React.FC<Props> = ({notesData}) => {
    console.log(notesData)
  return (
   <div className='flex flex justify-center items-center w-1/2'>
     <div className="text-wrap text-start flex flex-col">
        
        {
            notesData && notesData.map((value,index) => {
                if(value.includes(":")) return (
                    <h2 key={index} className='text-lg font-bold text p-2'>{value}</h2>
                )
                else return (
                    <span key={index} className='my-2'>{value}</span>
                )
            })
        }
     </div>
   </div>
  )
}


export default Notes;