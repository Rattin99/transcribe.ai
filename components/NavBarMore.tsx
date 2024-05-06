

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  

import React, { useContext } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Ellipsis, Share, Trash } from 'lucide-react'
import { UserContext } from './AuthProvider'
import { useRouter } from 'next/navigation'
import { Button } from "./ui/button"
import { DialogClose } from "@radix-ui/react-dialog"

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
            console.log(token,meetingId);
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
                <Dialog>
                    <DialogTrigger>
                        <div className="flex justify-center items-center cursor-pointer hover:bg-muted rounded-md p-1">
                            <Trash size="18px"/>
                            <span className="text-sm p-1">Delete</span>
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Delete Meeting
                            </DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete this meeting?
                            </DialogDescription>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button onClick={handleDelete}>Delete</Button>
                            </DialogClose>
                        </DialogFooter>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <Dialog>
                    <DialogTrigger>
                    <div className="flex justify-center items-center cursor-pointer hover:bg-muted rounded-md p-1">
                        <Share size="18px"/>
                        <span className="text-sm p-1">Share</span>
                    </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Share transcription
                            </DialogTitle>
                        </DialogHeader>
                        <div>
                            <span>{`localhost:5000/api/v1/transcribe/get-shareable-data/${meetingId}`}</span>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button>copy link</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
        </PopoverContent>
    </Popover>
   </>
  )
}
