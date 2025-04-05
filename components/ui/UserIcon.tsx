"use client";
import { getInitials } from "@/utils/data";
import { useEffect, useState } from "react";

interface UserIconProps{
    givenInitialNames? : string
}

export default function UserIcon({ givenInitialNames } : UserIconProps) {
    const [initialNames, setInitialNames] = useState<string>(givenInitialNames || "...");

    useEffect(() => {
        if (!givenInitialNames) {
            getInitials().then((initial) => {
                setInitialNames(initial);
            });
        }
    }, [givenInitialNames]);
    

    return (
        <div className="rounded-full h-12 w-12 bg-gray-500 shadow-lg flex justify-center mt-1 mr-2">
            <div className="flex flex-col justify-center h-full text-center">
                {initialNames}
            </div>
        </div>
    );
}
