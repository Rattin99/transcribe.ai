import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ellipsis, LogOut,Settings, Share, Trash } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area"
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserContext } from "./AuthProvider";
import NavBarMore from "./NavBarMore";
import { motion, AnimatePresence } from "framer-motion"


type Props = {
isOpen: boolean
}

const Navbar: React.FC<Props> = ({isOpen}) => {


    const router = useRouter();

    const pathName = usePathname();

    const userContext = useContext(UserContext);
    //@ts-ignore
    const {user,meetings, setMeetings} = userContext;
    const [userName, setUserName] = useState<string | null>(null);
    const getMeetings = async () => {
        try{
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/v1/transcribe/get-all-data',{
                method: "GET",
                headers: {
                    'Authorization': `${token}`
                }
            })

            const res = await response.json();

            setMeetings(res.data)
        }catch(err) {
            console.log(err)
        }
    }

    const getProfile = async () => {
        try{
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/v1/user/get-user-profile',{
                method: "GET",
                headers: {
                    'Authorization': `${token}`
                }
            })

            const res = await response.json();
            console.log(res)
            setUserName(res.data.userName)
        }catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getMeetings();
    },[])
    useEffect(() => {
        getProfile();
    },[])
    

    const handleButtonClick = () => {
        router.push("/meeting/")
    }

    const logOut = () => {

        localStorage.removeItem('id')
        localStorage.removeItem('email')
        localStorage.removeItem('token')
        router.push('/auth/login')
    }


    return (
        <nav  className={`${
            isOpen ? "flex fixed inset-x-0 bottom-0 sm:static" : "hidden sm:flex"
          } h-1/2 sm:h-screen w-full sm:w-[250px] flex-col justify-between p-2 bg-white border-t sm:border-r shadow-sm z-10`}>
            <Button onClick={handleButtonClick} className="p-6 bg-muted text-black hover:bg-slate-400"> + New Meeting</Button>
            <ScrollArea className="h-5/6">
                <AnimatePresence>
                {
                    //@ts-ignore
                  meetings &&  meetings.map((value,index) => {

                    const isActive = pathName.startsWith(`/meeting/${value.id}`);
                    return (
                        <motion.div key={index}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.3 }}>
                            <Link href={`/meeting/${value.id}`}>
                                <div  className={`group p-2 mr-3 cursor-pointer hover:bg-muted rounded-md flex justify-between items-center ${isActive ? "bg-muted" : "" }`}>
                                    <span>{value.meetingName}</span>
                                    <NavBarMore meetingId={value.id} />
                                </div>
                            </Link>
                        </motion.div>
                    )
                  })
                }
                </AnimatePresence>
            </ScrollArea>
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center justify-center  px-4 py-2 bg-gray-100 rounded-md hover:bg-slate-400 ">
                        {/* <Avatar className="mr-2 rounded-full size-8">
                            <AvatarImage src="./" />
                            <AvatarFallback className="bg-slate-800 text-white">RS</AvatarFallback>
                        </Avatar> */}
                        <span className="">{userName}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className=" min-w-full">
                    <DropdownMenuItem>{user && user.email}</DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem> <Settings className="size-4 mr-2"/> <span>settings</span></DropdownMenuItem>
                    <DropdownMenuItem onClick={logOut}> <LogOut className="size-4 mr-2" /> log out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>
    )
}


export default Navbar;