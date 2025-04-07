import Appbar from "@/components/Appbar";
import Balance from "@/components/Balance";
import TransactionHistory from "@/components/TransactionHistory";

export default function Home(){
  return <div className="sm:mx-40 mx-10 mt-1">
        <Appbar/>
        <div className="mt-8">
            <Balance/>
            <TransactionHistory/>
        </div>
  </div>
}