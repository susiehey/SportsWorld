{ /*
Page 3. Dashboard
A dashboard consisting of 3 different and separate sections: 1. Financial situation, 2. get more money/loan from bank and 3. purchase component.
*/ }
import { useEffect, useMemo, useState } from "react";
import type { IAthlete } from "../interfaces/IAthlete";
import type IFinance from "../interfaces/IFinance";
import { getAthletes } from "../services/athletesService";
import { getFinance, increaseMoney, purchaseAthlete } from "../services/financeService";
import FinanceCard from "../components/dashboard/financeCard";
import LoanCard from "../components/dashboard/loanCard";
import PurchaseCard from "../components/dashboard/purchaseCard";

export default function DashboardPage() {

    const [athletes, setAthletes] = useState<IAthlete[]>([]);
    const [finance, setFinance] = useState<IFinance | null>(null);
    const [message, setMessage] = useState<string>("");

    // Henter utøvere og finansinformasjon
    useEffect(() => {
        (async () => {
            const loadedAthletes = await getAthletes();
            setAthletes(loadedAthletes);
            const financeData = await getFinance().catch(() => null);
            setFinance(financeData);
        });
    }, []);

    // Filtrerer utøvere som kan kjøpes
    const buyableAthletes = useMemo(
        () => athletes.filter(a => !a.purchaseStatus), [athletes]
    );

    const handleLoan = async (amount: number) => {
        if (amount <= 0) {
            setMessage("Loan amount must be greater than zero.");
            return;
        }
        try {
            const f = await increaseMoney(amount);
            setFinance(f);
            setMessage("Money increased successfully.");
        } catch {
            setMessage("Failed to increase money.");
        }
    };

    const handlePurchase = async (id: number) => {
        try {
            // Kjøper utøver via tjenesten
            const result = await purchaseAthlete(id);
            // Oppdaterer utøverens kjøpsstatus i tilstanden
            setAthletes(prev =>
                prev.map(a => (a.id === id ? { ...a, purchaseStatus: true } : a))
            );
            // Oppdaterer finansdata hvis tilgjengelig
            if (result.finance) {
                setFinance(result.finance);
            }
            setMessage("Athlete purchased successfully.");
        } catch (error) {
                setMessage("Purchase failed.");
        }
    };


    return (
        <>
            <section className="p-4">
                <p className="mb-2 text-2xl font-bold">Dashboard</p>
                <p className="mb-4 text-lg font-light">Monitor your loans and purchases of your MMA athletes.</p>
                {message && <p className="text-sm mb-2">{message}</p>}
            </section>

            <FinanceCard finance={finance} />

            <LoanCard takeLoan={handleLoan} />

            <PurchaseCard buyableAthletes={buyableAthletes} purchaseAthlete={handlePurchase} />
        </>
    );
}