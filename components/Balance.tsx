"use client"

import { getBalance } from "@/utils/data";
import { useEffect, useState } from "react";

export default function Balance(){
    const [balance, setBalance] = useState(0);
    useEffect(()=>{
        getBalance().then((paisa) =>{
            const val = parseInt(paisa)
            setBalance(val);
        })
    },[])
    return <div className="flex">
    <div className="font-bold text-lg">
        Your Balance
    </div>
    <div className="font-semibold ml-4 text-lg">
        Rs {balance}
    </div>
</div>
}