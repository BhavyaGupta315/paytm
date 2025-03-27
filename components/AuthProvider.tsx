"use client";

import validateToken from "@/lib/validatetoken";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function AuthProvider({ children } : {children : React.ReactNode}){
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(!token){
            router.push('/signin');
        }else{
            validateToken(token).then((res)=>{
                if(res){
                    setLoading(false);
                }else{
                    router.push('/signin');
                }
            });
        }
        setLoading(false);
    },[])
    if(loading){
        return <div>Loading...</div>
    }
    return <>{children}</>
}