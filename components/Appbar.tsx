"use client";

import { useRouter } from "next/navigation";
import UserIcon from "./ui/UserIcon";

export default function Appbar(){ 
    const router = useRouter();
    
    return <div className="shadow bg-white/10 rounded-xl mt-4 h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4 cursor-pointer" onClick={() => router.push("/")} >
            PAY App
        </div>
        <div className="flex mr-4">
            <div className="flex flex-col justify-center h-full mr-4">
                Hi
            </div>
            <div>
                <UserIcon/>
            </div>
        </div>
    </div>
}