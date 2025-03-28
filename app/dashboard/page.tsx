import Appbar from "@/components/Appbar";
import AuthProvider from "@/components/AuthProvider";
import Balance from "@/components/Balance";

export default function Dashboard(){
    return <div>
        <AuthProvider>
        <Appbar/>
        <div className="m-8">
            <Balance/>
        </div>
        </AuthProvider>
    </div>
}