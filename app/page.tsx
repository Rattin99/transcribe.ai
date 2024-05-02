"use client";


import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function Home() {

  const router = useRouter()
  useEffect(() => {
    router.push('/meeting/')
  })
  return (
    <main className="w-screen h-screen flex ">
     
     loading...
        
    </main>
  );
}
