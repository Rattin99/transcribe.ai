import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut,Settings } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEffect, useState } from "react";
import Link from "next/link";


  type Props = {
    isOpen: boolean
  }

  type Meeting = {
    dateTime: string,
    id: string,
    meetingName: string,
  }


const Navbar: React.FC<Props> = ({isOpen}) => {

    const [meetings,setMeetings] = useState<Meeting[]>([]);

    const getMeetings = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/v1/transcribe/get-all-data',{
            method: "GET",
            headers: {
                'Authorization': `${token}`
            }
        })

        const res = await response.json();

        setMeetings(res.data)
    }

    useEffect(() => {
        getMeetings();
    },[])
    


    return (
        <nav  className={`${
            isOpen ? "flex fixed inset-x-0 bottom-0 sm:static" : "hidden sm:flex"
          } h-1/2 sm:h-screen w-full sm:w-[250px] flex-col justify-between p-2 bg-white border-t sm:border-r shadow-sm`}>
            <Button className="p-6 bg-muted text-black hover:bg-slate-400"> + New Meeting</Button>
            <ScrollArea className="h-5/6">
                {
                    meetings.map((value,index) => (
                        <Link key={index} href={`/meeting/${value.id}`}>
                            <div  className="p-2 mr-3 cursor-pointer hover:bg-muted rounded-md">
                                <span>{value.meetingName}</span>
                            </div>
                        </Link>
                    ))
                }
            </ScrollArea>
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center justify-center  px-4 py-2 bg-gray-100 rounded-md hover:bg-slate-400 ">
                        <Avatar className="mr-2 rounded-full size-8">
                            <AvatarImage src="./" />
                            <AvatarFallback className="bg-slate-800 text-white">RS</AvatarFallback>
                        </Avatar>
                        <span className="">Rattin Sadman</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className=" min-w-full">
                    <DropdownMenuItem>rattin99m8@gmail.com</DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem> <Settings className="size-4 mr-2"/> <span>settings</span></DropdownMenuItem>
                    <DropdownMenuItem> <LogOut className="size-4 mr-2" /> log out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>
    )
}


export default Navbar;