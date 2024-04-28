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


  type Props = {
    isOpen: boolean
  }

  const meetings = [
    {title:"meeting"},
    {title:"transcription"},
    {title:"date"},
    {title:"meeting"},
    {title:"transcription"},
    {title:"date"}, {title:"meeting"},
    {title:"transcription"},
    {title:"date"},
    {title:"meeting"},
    {title:"transcription"},
    {title:"date"},
    {title:"meeting"},
    {title:"transcription"},
    {title:"date"}, {title:"meeting"},
    {title:"transcription"},
    {title:"date"},
    {title:"meeting"},
    {title:"transcription"},
    {title:"date"},
    {title:"meeting"},
    {title:"transcription"},
    {title:"date"}, {title:"meeting"},
    {title:"transcription"},
    {title:"date"},
    {title:"date"},


  ]



const Navbar: React.FC<Props> = ({isOpen}) => {

    return (
        <nav  className={`${
            isOpen ? "flex fixed inset-x-0 bottom-0 sm:static" : "hidden sm:flex"
          } h-1/2 sm:h-screen w-full sm:w-[250px] flex-col justify-between p-2 bg-white border-r shadow-sm`}>
            <Button className=""> + New Meeting</Button>
            <ScrollArea className="h-5/6">
                {
                    meetings.map((value,index) => (
                        <div key={index} className="p-2 mr-3 cursor-pointer hover:bg-muted rounded-md">
                            <span>{value.title}</span>
                        </div>
                    ))
                }
            </ScrollArea>
            <DropdownMenu>
                <DropdownMenuTrigger className="w-full">
                    <div className="flex items-center justify-center  px-4 py-2 bg-gray-100 rounded-md">
                    <Avatar className="mr-2 rounded-full">
                        <AvatarImage src="./" />
                        <AvatarFallback className="p-2 bg-red-400">RS</AvatarFallback>
                    </Avatar>
                    <span className="text-3xl sm:text-lg">Rattin Sadman</span>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className=" min-w-56">
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