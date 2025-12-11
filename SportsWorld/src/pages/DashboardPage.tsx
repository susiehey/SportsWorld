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
            <section className="p-4">
                <p className="mb-2 text-2xl font-bold">
                    Dashboard
                </p>
                <p className="mb-4 text-lg font-light">
                    Monitor your loans and purchases of your MMA athletes.
                </p>
            </section>
            
            
            <FinanceCard></FinanceCard>
            
            <LoanCard></LoanCard>
            {/* 
            <PurchaseCard></PurchaseCard>
            */}
        </>
    );
}