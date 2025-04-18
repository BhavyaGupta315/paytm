import { Account, User } from "@/models/Schemas";
import dbConnect from "@/utils/dbconnect";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = (process.env.JWT_SECRET) ? process.env.JWT_SECRET : "";

interface User {
    username : string;
    password : string;
    firstName : string;
    lastName : string;
}

export async function POST(req : NextRequest){
    const body : User = await req.json();
    await dbConnect();
    const userAlready = await User.findOne({
        username : body.username,
    })
    if(userAlready){
        return new Response(JSON.stringify({message : "User Already Present"}), {
            status : 404,
            headers : {
                "Content-Type" : "application/json"
            }
        });
    }
    const newUser = await User.create({
        username : body.username,
        password : body.password,
        firstName : body.firstName,
        lastName : body.lastName
    });
    if(!newUser){
        return new Response(JSON.stringify({message : "User Not Created"}), {
            status : 404,
            headers : {
                "Content-Type" : "application/json"
            }
        });
    }

    const userId = newUser._id;

    await Account.create({
        userId, 
        balance : (1 + Math.floor(Math.random()*10000))
    })
    
    const token = jwt.sign({userId : newUser._id}, JWT_SECRET);
    
    return new Response(JSON.stringify({
        message : "User Signed Up Successfully",
        token : token
    }), {
        status : 200,
        headers : {
            "Content-Type" : "application/json"
        }
    });
}