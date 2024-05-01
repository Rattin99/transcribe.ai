"use client"

import Navbar from "@/components/Navbar";
import { Menu } from "lucide-react";
import React, { useState } from "react";




export default function MeetingLayout({
    children,
}: {
    children: React.ReactNode
}) {

  const [isNavbarOpen, setNavbarOpen] = useState(false);


    return (
    <main className="w-screen h-screen flex overflow-hidden">
        <Menu onClick={ () => {setNavbarOpen(!isNavbarOpen)} } className="size-10 m-2 block absolute top-0 right-0 sm:hidden" />
        <Navbar isOpen= {isNavbarOpen}/>
        
        {children}
        
    </main>
    )
}