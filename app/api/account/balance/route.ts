import { NextRequest, NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import dbConnect from "@/utils/dbconnect";
import { Account } from "@/models/Schemas";

const JWT_SECRET = (process.env.JWT_SECRET) ? process.env.JWT_SECRET : "";
export async function GET(req : NextRequest){
    const authHeader = req.headers.get("Authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return new Response(JSON.stringify({message : "UnAuthorized"}), {status : 403});
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (typeof decoded !== "object" || !("userId" in decoded)) {
            return NextResponse.json({ message: "Invalid token payload" }, { status: 401 });
        }

        const userId = decoded.userId;

        if (!userId) {
            return NextResponse.json({ message: "Invalid token payload" }, { status: 401 });
        }
        await dbConnect();
        
        const account = await Account.findOne({
            userId : userId
        })
        
        if(!account){
            return NextResponse.json({message : "User doesn't exist in table"}, {status : 404});
        }
        
        return NextResponse.json({ message : "Fetching Balance Successfull" ,balance : account.balance}, {status : 200})
        
    }catch(error){
        return new Response(JSON.stringify({ message: "Something Went Wrong", Error : error}), { status: 401 });
    }
}