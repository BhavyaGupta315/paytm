import { User } from "@/models/Schemas";
import dbConnect from "@/utils/dbconnect";
import { NextRequest } from "next/server";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = (process.env.JWT_SECRET) ? process.env.JWT_SECRET : "";

interface User {
    username : string;
    password : string;
}

export async function POST(req : NextRequest){
    const body : User = await req.json();
    await dbConnect();
    console.log(body);
    const userAlready = await User.findOne({
        username : body.username,
        password : body.password
    })
    console.log(userAlready);
    console.log("Here comes the first API Request")
    if(!userAlready){
        return new Response(JSON.stringify({message : "User Not Found"}), {
            status : 404,
            headers : {
                "Content-Type" : "application/json"
            }
        });
    }
    const token = jwt.sign({userId : userAlready._id}, JWT_SECRET);
    return new Response(JSON.stringify({
        message : "User Login Successfully",
        token : token
    }), {
        status : 200,
        headers : {
            "Content-Type" : "application/json"
        }
    });
}