"use server"
import UserIcon from "./ui/UserIcon";

export default async function Appbar(){ 
    
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PAY App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <UserIcon/>
        </div>
    </div>
}