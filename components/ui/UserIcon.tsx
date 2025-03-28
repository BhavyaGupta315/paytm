"use client";
import { getInitials } from "@/utils/data";
import { useEffect, useState } from "react";

export default function UserIcon() {
    const [initialNames, setInitialNames] = useState("..."); 

    useEffect(() => {
        getInitials().then((initial) => {
            setInitialNames(initial);
        });
    }, []); 

    return (
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
            <div className="flex flex-col justify-center h-full text-center">
                {initialNames}
            </div>
        </div>
    );
}
