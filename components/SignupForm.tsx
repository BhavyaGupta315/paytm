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
        firstName : "",
        lastName : "",
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

    const handleSignup = async () => {
        try {
            const response = await axios.post("/api/v1/user/signup", formData);
            if(response.status === 200){
                localStorage.setItem("token", response.data.token);
                router.push("/dashboard");
            }else{
                console.log(response.data.message);
            }
        }catch(err){
            console.error("Signup Failed - ", err);
        }
    }
    return <>
        <Heading label = "Sign Up"/>
        <SubHeading label = "Enter your Information to create an account" />

        <InputBox label="First Name" placeholder="Enter your First Name" onChange={handleChange} />
        <InputBox label="Last Name" placeholder="Enter your Last Name" onChange={handleChange} />
        <InputBox label="Username" placeholder="Enter your Username" onChange={handleChange} />
        <InputBox label="Password" placeholder="Enter your Password" onChange={handleChange}  type="password"/>

        <div className="pt-4">
            <Button onClick={handleSignup} label="Sign Up" />
        </div>

        <BottomWarning label="Already have an account?" buttonText="Signin" to="/signin" />
    </>
}