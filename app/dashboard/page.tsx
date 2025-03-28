import Appbar from "@/components/Appbar";
import AuthProvider from "@/components/AuthProvider";

export default function Dashboard(){
    return <div>
        <AuthProvider>
        <Appbar/>
        </AuthProvider>
    </div>
}