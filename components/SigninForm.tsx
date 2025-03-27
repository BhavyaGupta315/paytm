"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Heading } from "./ui/Heading";
import { SubHeading } from "./ui/SubHeading";
import { InputBox } from "./ui/InputBox";
import { Button } from "./ui/Button";
import { BottomWarning } from "./ui/BottomWarning";

export default function SignupForm(){
    const [formData, setFormData] = useState({
        username : "",
        password : ""
    });

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    }

    const handleSignin = async () => {
        try {
            const response = await axios.post("/api/v1/user/signin", formData);
            if(response.status === 200){
                localStorage.setItem("token", response.data.token);
                router.push("/dashboard");
            }else{
                console.log(response.data.message);
            }
        }catch(err){
            console.error("Signin Failed - ", err);
        }
    }
    return <>
        <Heading label = "Sign In"/>
        <SubHeading label = "Enter your Credentials" />

        <InputBox label="Username" placeholder="Enter your Username" onChange={handleChange} />
        <InputBox label="Password" placeholder="Enter your Password" onChange={handleChange}  type="password"/>

        <div className="pt-4">
            <Button onClick={handleSignin} label="Sign in" />
        </div>

        <BottomWarning label="Don't have an account?" buttonText="Signup" to="/signup" />
    </>
}