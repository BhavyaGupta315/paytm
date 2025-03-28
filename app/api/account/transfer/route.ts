import validateToken from "@/lib/validatetoken";
import { Account } from "@/models/Schemas";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

interface transferProps{
    amount : number,
    to : string,
    userId : string
}

export async function POST(req : NextRequest){
    const authHeader = req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")){
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    validateToken(token).then((res) => {
        if(!res.check){
            return NextResponse.json({
                message : "Invalid Token"
            })
        }
    })
    const session = await mongoose.startSession();
    session.startTransaction();

    const {amount, to, userId} : transferProps = await req.json();

    const account = await Account.findOne({userId : userId}).session(session);
    if(!account || account.balance < amount){
        await session.abortTransaction();
        return NextResponse.json({
            message : "Insufficient Balance"
        },{
            status : 403
        })
    }
    const toAccount = await Account.findOne({userId : to}).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return NextResponse.json({
            message : "Wrong Account"
        },{
            status : 403
        })
    }
    await Account.updateOne({userId : userId}, {$inc : {balance : -amount}}).session(session);
    await Account.updateOne({userId : to}, {$inc : {balance : amount}}).session(session);

    await session.commitTransaction();
    return NextResponse.json({
        message : "Transaction Successful"
    })
}