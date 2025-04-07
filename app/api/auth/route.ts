import { NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";

const SECRET_KEY = (process.env.JWT_SECRET) ? process.env.JWT_SECRET : "error"; 

export async function POST(req: Request) {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return NextResponse.json({ message: "Token is valid", user: decoded }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Invalid token", Error : error }, { status: 401 });
    }
}
