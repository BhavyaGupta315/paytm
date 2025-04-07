"use client"; 
import { useEffect, useState } from "react";
import validateToken, { validateTokenProps } from "@/lib/validatetoken";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import UserIcon from "@/components/ui/UserIcon";
import Appbar from "@/components/Appbar";

export default function SendPageClient({ id, name }: { id: string; name: string }) {
    const [isAuth, setIsAuth] = useState<boolean | null>(null);
    const [amount, setAmount] = useState(0);
    const [userId, setUserId] = useState("");
    const router = useRouter();
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
                setUserId(((isUserLoggedIn.userId) ? isUserLoggedIn.userId : ""));
            }
        };

        checkUser();
    }, [id]);

    if (isAuth === null) return <h1>Loading...</h1>;
    if (!isAuth) return <h1>Wrong URL - You cannot access this page</h1>;

    const handleOnClick = async () => {
        try {
            const response = await axios.post("/api/account/transfer", {
                amount,
                to: id,
                userId
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
    
            if (response.status === 200) {
                router.push("/");
            }
            
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>;
            if (err.response) {
                if (err.response.status === 403) {
                    console.error("Insufficient balance. Please check your funds.");
                    alert("Error: Insufficient balance!");
                } else {
                    console.error("Transfer failed:", err.response.data);
                    alert(`Error: ${err.response.data.message || "Something went wrong!"}`);
                }
            } else {
                console.error("Network or server error:", err.message);
                alert("Network error. Please try again later.");
            }
        }
    };
    

    return (
        <div className="sm:mx-40 mx-10 mt-1">
            <Appbar/>
            <div className="flex justify-center h-screen">
                    <div className="h-full flex flex-col justify-center">
                        <div className="border h-min p-8 bg-white/10 shadow-md hover:shadow-2xl transition duration-300 rounded-lg">
                            <div className="flex items-center">
                                <div className="cursor-pointer flex items-center" onClick={() => router.push("/")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left-icon lucide-chevron-left hover:shadow-lg hover:bg-white/10 transition-transform hover:-translate-x-1 duration-200 "><path d="m15 18-6-6 6-6"/></svg>
                                </div>
                                <div className="flex flex-col items-center w-full">
                                    <h2 className="text-3xl font-bold text-center cursor-default">Send Money</h2>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center">
                                    <UserIcon givenInitialNames={name[0]}/>
                                    <h3 className="text-2xl font-semibold cursor-default">{name}</h3>
                                </div>
                                <div className="py-4">
                                    <div className="py-1">
                                        <label 
                                        className="text-md font-medium leading-none">
                                            Amount (in Rs)
                                        </label>
                                        <input type="number" 
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm my-1"
                                        id="amount"
                                        placeholder="Enter Amount"
                                        onChange={e=>{
                                            const val = parseInt(e.target.value);
                                            setAmount(val);
                                        }}
                                        />
                                    </div>
                                    <div className="flex justify-center mt-2">
                                        <Button onClick={handleOnClick} label="Initiate Transfer"/>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}
