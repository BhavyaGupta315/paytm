import Appbar from "@/components/Appbar";
import Balance from "@/components/Balance";
import TransactionHistory from "@/components/TransactionHistory";

export default function Home(){
  return <div className="mx-40 mt-1">
        <Appbar/>
        <div className="mt-8">
            <Balance/>
            <TransactionHistory/>
        </div>
  </div>
}