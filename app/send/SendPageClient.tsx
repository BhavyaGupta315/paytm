"use client"; 
import { useEffect, useState } from "react";
import validateToken, { validateTokenProps } from "@/lib/validatetoken";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import UserIcon from "@/components/ui/UserIcon";

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

    const handleOnClick = async ()=>{
        await axios.post("http://localhost:3000/api/account/transfer",{
            amount : amount,
            to : id,
            userId : userId
        },{
            headers : {
                Authorization : "Bearer " + localStorage.getItem("token") 
            }
        })
        router.push("/dashboard");                       
    }

    return (
        <div className="flex justify-center h-screen bg-gray-100">
                <div className="h-full flex flex-col justify-center">
                    <div className="border h-min p-4 w-96 bg-white shadow-md hover:shadow-2xl transition duration-300 rounded-lg hover:bg-zinc-50">
                        <div className="flex flex-col p-6">
                            <h2 className="text-3xl font-bold text-center cursor-default">Send Money</h2>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center">
                                <UserIcon givenInitialNames={name[0]}/>
                                <h3 className="text-2xl font-semibold cursor-default">{name}</h3>
                            </div>
                            <div className="py-4">
                                <div className="py-1">
                                    <label 
                                    className="text-sm font-medium leading-none">
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
    );
}
