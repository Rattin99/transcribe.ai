


import React, { useContext } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Ellipsis, Share, Trash } from 'lucide-react'
import { UserContext } from './AuthProvider'
import { useRouter } from 'next/navigation'

type Props = {
    meetingId: string
}

export default function NavBarMore({meetingId}:Props) {

    const userContext = useContext(UserContext);
    
    //@ts-ignore
    const {setMeetings} = userContext;

    const router = useRouter();


    const handleDelete = async () => {

        try{
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/v1/transcribe/delete-meeting/${meetingId}`,{
                method: "DELETE",
                headers: {
                    'Authorization': `${token}`
                }
            })

            const res = await response.json();

            console.log(res);
        }catch(err) {
            console.log(err);
        }

        setMeetings((meetings: any) => {
            const newMeetings = meetings.filter((value:any,i:number) => value.id !== meetingId)

            console.log(newMeetings)
            return newMeetings;
        })

        router.push('/meeting/')
    }

  return (
   <>
    <Popover>
        <PopoverTrigger>
            <Ellipsis className="hidden group-hover:block" color="gray" />
        </PopoverTrigger>
        <PopoverContent className="w-25 p-2">
                <button onClick={handleDelete} className="flex justify-center items-center cursor-pointer hover:bg-muted rounded-md p-1">
                    <Trash size="18px"/>
                    <span className="text-sm p-1">Delete</span>
                </button>
                <div className="flex justify-center items-center cursor-pointer hover:bg-muted rounded-md p-1">
                    <Share size="18px"/>
                    <span className="text-sm p-1">Share</span>
                </div>
        </PopoverContent>
    </Popover>
   </>
  )
}
