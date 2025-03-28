"use client"
import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";
import { useEffect, useState } from "react";
import { getUsers } from "@/utils/data";
import UserIcon from "./ui/UserIcon";


export default function Users(){
    const [users, setUsers] = useState<UserProps[]>([]);
    const [filter, setFilter] = useState<string>("");
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        getUsers(filter).then((usersData) => {
            setUsers(usersData);
            setLoading(false);
        })
    }, [filter])
    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={e => setFilter(e.target.value)} type="text" placeholder="Search Users.." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {(loading) ? "...................................." : null}
            {(users) ? users.map(user => <User user={user} key={user._id}/>) : ""}
        </div>
    </>
}

interface UserProps {
    firstName : string,
    lastName : string,
    _id : string,
}

function User({ user } : {user : UserProps}){
    const router = useRouter();
    return <div className="rounded-md shadow-md my-2 p-1 hover:shadow-lg hover:scale-101 transition duration-300 cursor-pointer">
        <div className="flex justify-between">
            <div className="flex">
                <UserIcon givenInitialNames={`${user.firstName[0]+user.lastName[0]}`}/>
                <div className="flex flex-col justify-center h-full">
                    <div>
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center h-full mt-1 mr-5">
                <Button onClick={e =>{
                    router.push(`/send?id=${user._id}&name=${user.firstName}`);
                }} label={"Send Money"}/>
            </div>
        </div>
    </div>
}