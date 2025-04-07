"use client";

import validateToken, {validateTokenProps} from "@/lib/validatetoken";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


export default function AuthProvider({ children } : {children : React.ReactNode}){
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(!token){
            router.push('/signin');
        }else{
            validateToken(token).then((res : validateTokenProps)=>{
                if(res.check){
                    setLoading(false);
                }else{
                    router.push('/signin');
                }
            });
        }
    },[router])
    if(loading){
        return <div>Loading...</div>
    }
    return <>{children}</>
}