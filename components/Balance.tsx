"use client"

import { getBalance } from "@/utils/data";
import { useEffect, useState } from "react";
import { Button } from "./ui/Button";
import { useRouter } from "next/navigation";

export default function Balance(){
    const [balance, setBalance] = useState(0);
    const router = useRouter();
    useEffect(()=>{
        getBalance().then((paisa) =>{
            const val = parseInt(paisa)
            setBalance(val);
        })
    },[])

    const handleRedirect = () => {
        window.location.href = "https://web3-wallet-sol-eth.vercel.app/";
      };
    

    const loggingOutHandler = async () => {
        localStorage.clear();
        router.push('/signin')
    }
    return <div className="flex justify-between">
        <div className="sm:flex"> 
            <div className="font-bold text-lg">
                Your Balance
            </div>
            <div className="font-semibold ml-4 text-lg">
                Rs {balance}
            </div>
        </div>
        <div>
            <Button label="Access Crypto Wallet" onClick={()=>handleRedirect()}/>
        </div>
        <div>
            <Button label="Log Out" onClick={loggingOutHandler}/>
        </div>
</div>
}