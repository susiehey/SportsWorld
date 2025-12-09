{ /*
Page 3. Dashboard
A dashboard consisting of 3 different and separate sections: 1. Financial situation, 2. get more money/loan from bank and 3. purchase component.
*/ }
import { useEffect, useMemo, useState } from "react";
import type { IAthlete } from "../interfaces/IAthlete";
import type IFinance from "../interfaces/IFinance";
import { getAthletes } from "../services/athletesService";
import { getFinance, increaseMoney, purchaseAthlete } from "../services/financeService";

export default function DashboardPage() {

    const [athletes, setAthletes] = useState<IAthlete[]>([]);
    const [finance, setFinance] = useState<IFinance | null>(null);
    const [loan, setLoan] = useState<number>(0);
    const [message, setMessage] = useState<string>("");

    // Henter utøvere og finansinformasjon når DashboardPage lastes
    useEffect(() => {
        (async () => {
            try {
                const loadedAthletes = await getAthletes();
                setAthletes(loadedAthletes);

                const financeData = await getFinance().catch(() => null);
                setFinance(financeData);
            } catch (error) {
                setMessage("Could not load data.");
            }
        })();
    }, []);

    // Filtrerer utøvere som kan kjøpes
    const buyableAthletes = useMemo(
        () => athletes.filter(a => !a.purchaseStatus), [athletes]
    );

    // Håndterer lån
    const handleLoan = async () => {
        try {
            // Validering av lånebeløp
            if (loan <= 0) {
            setMessage("Loan amount must be greater than zero.");
            return;
            }
            const updatedFinance = await increaseMoney(loan);
            // Sjekker om oppdatering var vellykket
            if (!updatedFinance) {
                setMessage("Failed to increase money.");
                return;
            }
            // Oppdaterer finansdata
            setFinance(updatedFinance);
            setLoan(0);
            setMessage("Money increased successfully.");
        } catch (error) {
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
                {message && <p className="text-sm text-red-500">{message}</p>}
            </section>

            <section className="p-4">
                <p className="text-xl font-semibold mb-2">Financial situation</p>
                {finance ? (
                    <ul className="space-y-1">
                    <li>Money left: ${finance.moneyLeft.toLocaleString()}</li>
                    <li>Purchased athletes: {finance.numberOfPurchases}</li>
                    <li>Total spent: ${finance.moneySpent.toLocaleString()}</li>
                    </ul>
                    ) : (
                    <p className="text-sm text-red-500">No finance data.</p>
                )}
            </section>

            <section className="p-4">
                <p className="text-xl font-semibold mb-2">Loan from bank</p>
                <div className="max-w-fit border p-4">
                    <p className="mb-2">How much do you want to increase?</p>
                    <div className="flex gap-2">
                        <input type="number"
                        value={loan}
                        onChange={(e) => setLoan(Number(e.target.value))}
                        placeholder="Amount"
                        className="border w-md px-3 py-2"/>
                        <button type="button"
                        onClick={handleLoan}
                        className="border px-3 py-2 bg-blue-600 text-white font-bold hover::cursor-pointer">
                            Increase
                        </button>
                    </div>
                </div>
            </section>

            <section className="p-4">
                <p className="text-xl font-semibold mb-2">Purchase component</p>
                {buyableAthletes.length === 0 ? (
                    <p className="text-sm text-red-500">No athletes available for purchase.</p>
                ) : (
                
                <ul className="space-y-2">
                    {buyableAthletes.map(a => (
                        <li key={a.id} className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                            {a.image && <img src={a.image} alt={a.name} className="w-10 h-10 object-cover" />}
                                <div>
                                    <p className="font-medium">{a.name}</p>
                                    <p className="text-xs text-gray-500">${a.price.toLocaleString()}</p>
                                </div>
                            </div>
                            <button className="border px-3 py-2 bg-blue-600 text-white font-bold hover::cursor-pointer"
                            onClick={() => handlePurchase(a.id!)}>
                                Buy
                            </button>
                        </li>
                    ))}
                </ul>
                )}
            </section>
        </>
    );
}