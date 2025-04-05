"use server"
import UserIcon from "./ui/UserIcon";

export default async function Appbar(){ 
    
    return <div className="shadow bg-white/10 rounded-xl mt-4 h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PAY App
        </div>
        <div className="flex mr-4">
            <div className="flex flex-col justify-center h-full mr-4">
                Hi
            </div>
            <div>
                <UserIcon/>
            </div>
        </div>
    </div>
}