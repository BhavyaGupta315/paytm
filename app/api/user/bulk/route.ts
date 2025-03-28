import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/models/Schemas";
import dbConnect from "@/utils/dbconnect";

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function GET(req : NextRequest){
    const authHeader = req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")){
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        await dbConnect();
        const userId = decoded.userId;
        if(!userId){
            return NextResponse.json({message : "Invalid Token"}, {status  : 401});
        }
        
        const { searchParams } = new URL(req.url);
        const filter = searchParams.get("filter") || "";

        const query : Record<string, any> = {_id : {$ne : userId}};
        if(filter){
            query.$or = [
                {firstName : {$regex : filter, $options : "i"}}, // $options = "i" case sensitive ko insensitive karne ke liye
                {lastName : {$regex : filter, $options : "i"}}
            ];
        }
        
        const users = await User.find(query).select("username firstName lastName _id");

        return NextResponse.json({users});
    }catch(error){
        return NextResponse.json({ message: "Invalid or expired token" }, { status: 403 });
    }
}