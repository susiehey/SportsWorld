{ /*
Page 3. Dashboard
A dashboard consisting of 3 different and separate sections: 1. Financial situation, 2. get more money/loan from bank and 3. purchase component.
*/ }
import FinanceCard from "../components/dashboard/FinanceCard";
import LoanCard from "../components/dashboard/LoanCard";
import PurchaseCard from "../components/dashboard/PurchaseCard";

export default function DashboardPage() {
    return (
        <>
            <section className="p-4 text-center">
                <p className="mb-2 text-2xl font-bold">
                    Dashboard
                </p>
                <p className="mb-4 text-lg font-light">
                    Monitor your loans and purchases of your MMA athletes.
                </p>
            </section>
            
            <section className="px-4 pb-8 flex justify-center">
               <div className="w-full max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FinanceCard></FinanceCard>
                        <LoanCard></LoanCard> 
                    </div>
                    <div className="mt-4">
                        <PurchaseCard></PurchaseCard>
                    </div>
                </div>
            </section>
        </>
    );
}