"use client";
import { getTransactionHistory, TransactionHistoryCardProps } from "@/utils/data";
import { useEffect, useState } from "react";
import TransactionHistoryCard from "./TransactionHistoryCard";

export default function TransactionHistory(){
    const [transactions, setTransactions] = useState<TransactionHistoryCardProps[]>([]);
    const[loading, setLoading] = useState(true);
    useEffect(() => {
        getTransactionHistory().then((transactionsData) => {
            setTransactions(transactionsData);
            setLoading(false);
        }).catch((error) => {
            console.log("Error fetching transaction history:", error);
        }
        );
    },[]);
    if(loading){
        return <div>
            Loading...
        </div>
    }

    if(transactions.length === 0){
        return <div>
            No transactions found.
        </div>
    }
    return (
        <div className="mt-8">
            <h2 className="text-lg font-semibold">Transaction History</h2>
            <div className="mt-4">
                {transactions.map((transaction) => (
                    <div key={transaction.date} className="py-2">
                        <TransactionHistoryCard {...transaction} />
                    </div>
                ))}
            </div>
        </div>
    );
}