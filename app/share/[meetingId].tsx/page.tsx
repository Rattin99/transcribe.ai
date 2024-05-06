import Summary from "@/components/Summary"
import Transcription from "@/components/Transcription"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useParams } from "next/navigation"


export const Page = async () => {
    return (
        <div className="w-full bg-muted   sm:w-[88%] h-screen flex flex-col justify-center items-center">
      <div className="w-1/3 h-1/5 flex flex-col justify-around items-center">
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="p-2">
            {/* <input type="text"  className="text-center bg-muted sm:text-2xl"  /> */}
          </div>
          <span className= "text-xs sm:text-base">April 25, 2024</span>
        </div>
       
      </div>
      {/* <Tabs className="w-full bg-white h-4/5"  defaultValue="transcribe" >
            <TabsList className="flex justify-center items-center bg-muted rounded-none">
              <TabsTrigger className="w-40" value="transcribe">Transcribe</TabsTrigger>
              <TabsTrigger className="w-40" value="summary">Summary</TabsTrigger>
              <TabsTrigger className="w-40" value="notes" >Notes</TabsTrigger>
            </TabsList>
            <TabsContent value="transcribe" className=" w-full h-full ">
              <Transcription  transcribeArray={transcribeArray}/>
            </TabsContent>
            <TabsContent value="summary" className="w-full h-full">
              <Summary summaryData=      {summary} /> 
            </TabsContent>
            <TabsContent value="notes" className=" w-full h-full">
              <Notes notesData ={notes} />
            </TabsContent>
        </Tabs> */}
    </div>
    )
}