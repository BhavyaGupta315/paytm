import Appbar from "@/components/Appbar";
import AuthProvider from "@/components/AuthProvider";
import Balance from "@/components/Balance";
import Users from "@/components/Users";

export default function Dashboard(){
    return <div className="mx-40 mt-1">
        <AuthProvider>
        <Appbar/>
        <div className="mt-8">
            <Balance/>
            <Users/>
        </div>
        </AuthProvider>
    </div>
}