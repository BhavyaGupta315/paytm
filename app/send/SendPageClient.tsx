"use client"; 
import { useEffect, useState } from "react";
import validateToken, { validateTokenProps } from "@/lib/validatetoken";

export default function SendPageClient({ id, name }: { id: string; name: string }) {
    const [isAuth, setIsAuth] = useState<boolean | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setIsAuth(false);
            return;
        }

        const checkUser = async () => {
            const isUserLoggedIn: validateTokenProps = await validateToken(token);
            
            if (!isUserLoggedIn.check || isUserLoggedIn?.userId === id) {
                setIsAuth(false);
            } else {
                setIsAuth(true);
            }
        };

        checkUser();
    }, [id]);

    if (isAuth === null) return <h1>Loading...</h1>;
    if (!isAuth) return <h1>Wrong URL - You cannot access this page</h1>;

    return (
        <div>
            <h1>Welcome, {name}!</h1>
            <p>Your ID: {id}</p>
        </div>
    );
}
