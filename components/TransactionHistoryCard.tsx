"use client"

import { TransactionHistoryCardProps } from "@/utils/data";
import UserIcon from "./ui/UserIcon";
import { Button } from "./ui/Button";
import { useRouter } from "next/navigation";

export default function TransactionHistoryCard({account, amount, date, transactionType} : TransactionHistoryCardProps) {
    const router = useRouter();
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    });

    const firstName = account.firstName || "";
    const lastName = account.lastName || "";
    const userId = account._id || "";

    const onClickHandler = () => {
        router.push(`/send?id=${userId}&name=${firstName}`);
    }
    
    return (
        <div className="flex flex-row justify-between items-center bg-white/10 p-3 rounded-lg transition duration-300 hover:shadow-lg hover:scale-101 cursor-pointer "> 
            <div className="flex flex-row items-center">
                <UserIcon givenInitialNames={`${firstName[0]}${lastName[0]}`} />
                <div className="flex flex-col">
                    <span className="text-lg font-semibold">{firstName} {lastName}</span>
                    <span className="text-sm text-gray-500">{transactionType}</span>
                </div>
            </div>
            <div className="flex flex-row items-center">
                <div className="flex flex-col items-center mr-10">
                    <div className={`
                        text-lg font-semibold 
                        ${amount > 0 
                        ? 'text-green-500 hover:drop-shadow-[0_0_6px_rgba(34,197,94,0.6)]' 
                        : 'text-red-500 hover:drop-shadow-[0_0_6px_rgba(239,68,68,0.6)]'} 
                        transition duration-200 ease-in-out
                    `}>
                        {amount > 0 ? '+' : ''}{amount}
                    </div>
                    <div className="text-sm text-gray-400">
                        {formattedDate}
                    </div>
                </div>
                <Button label="Send Money" onClick={onClickHandler}/>
            </div>
        </div>
    )

}