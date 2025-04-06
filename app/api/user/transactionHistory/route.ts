import dbConnect from "@/utils/dbconnect";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Transaction } from "@/models/Schemas";

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function GET(req: NextRequest){
    const authHeader = req.headers.get("Authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")){
        return NextResponse.json({ message: "Unauthorized" }, { status: 405 });
    }

    const token = authHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        await dbConnect();    
        const userId = decoded.userId;
        if(!userId){
            return NextResponse.json({message : "Invalid Token"}, {status  : 401});
        }

        const transactions = await Transaction.find({
            $or : [{
                from : userId
            }, {
                to : userId
            }]
        })
        .populate("from", "firstName lastName _id")
        .populate("to", "firstName lastName _id")
        .sort({date : -1});

        const formattedTransactions = transactions.map((txn) => {
            const isSender = txn.from._id.toString() === userId;
            const counterParty = isSender ? txn.to : txn.from;
            const transactionType = isSender ? "Sent" : "Received";
            return {
                transactionType,
                amount: isSender ? -txn.amount : txn.amount,
                date : txn.date,
                account : {
                    _id : counterParty._id,
                    firstName : counterParty.firstName,
                    lastName : counterParty.lastName
                }
            }
        });

        return NextResponse.json({
            transactions : formattedTransactions
        }, {
            status : 200
        })
    }catch(err){
        console.log("Failed to fetch transaction history ", err);
        return NextResponse.json({
            message : "Failed to fetch transaction history"
        }, {
            status : 500
        })
    }
    
}
