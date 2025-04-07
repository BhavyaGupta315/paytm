"use client";
import { getInitials } from "@/utils/data";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserIconProps{
    givenInitialNames? : string
}

export default function UserIcon({ givenInitialNames } : UserIconProps) {
    const [initialNames, setInitialNames] = useState<string>(givenInitialNames || "...");
    const [userId, setUserId] = useState<string>("...");
    const router = useRouter();

    useEffect(() => {
        if (!givenInitialNames) {
            getInitials().then((initial) => {
                const name = initial?.Initials;
                const userId = initial?.userId;
                setInitialNames(name || "...");
                setUserId(userId || "...");
            });
        }
    }, [givenInitialNames]);

    const handleOnClick = () => {
        if(userId == "...") return;
        router.push(`/user?id=${userId}`);
    };
    

    return (
        <div className="rounded-full h-12 w-12 bg-gray-500 shadow-lg flex justify-center mt-1 mr-2 cursor-pointer hover:opacity-70" onClick={handleOnClick}>
            <div className="flex flex-col justify-center h-full text-center">
                {initialNames}
            </div>
        </div>
    );
}
