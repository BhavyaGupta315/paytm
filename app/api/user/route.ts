import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/models/Schemas";
import dbConnect from "@/utils/dbconnect";

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function GET(req: NextRequest){
    const authHeader = req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")){
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        await dbConnect();

        const user = await User.findOne({ _id: decoded.userId });
        if (!user) {
            return NextResponse.json({ message: "User not found or token expired" }, { status: 404 });
        }
        return NextResponse.json({ user }, { status: 200 });
    }catch(error){
        return NextResponse.json({ message: "Invalid or expired token", Error : error }, { status: 403 });
    }
}
