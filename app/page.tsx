import AuthProvider from "@/components/AuthProvider";
import Dashboard from "./dashboard/page";

export default function Home(){
  return <div>
      <AuthProvider>
        <Dashboard/>
      </AuthProvider>
  </div>
}