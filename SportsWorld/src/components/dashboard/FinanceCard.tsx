import type IFinance from "../../interfaces/IFinance";
import { useEffect, useState } from "react";
import financeService from "../../services/financeService";

const FinanceCard = () => {
    const [finance, setFinance] = useState<IFinance | null>(null);
    const [status, setStatus] = useState("");
    const moneyLeft = finance?.moneyLeft ?? 0;
    const numberOfPurchases = finance?.numberOfPurchases ?? 0;
    const moneySpent = finance?.moneySpent ?? 0;
    const loanBalance = finance?.loanBalance ?? 0;

    const loadFinance = async () => {
        try {
            const f = await financeService.getFinance().catch(() => null)
            setFinance(f);
        } catch (error) {
            // Viser feilmelding i konsoll
            console.error(error);
            // Viser feilmelding til brukeren
            setStatus("Failed to load finance.");
        }
    }

    // Lytter til oppdateringer
    useEffect(() => {
        loadFinance();
        const updatedFinance = () => loadFinance();
        window.addEventListener("finance:updated", updatedFinance)
        return () => window.removeEventListener("finance:updated", updatedFinance);
    }, []);

    return (
         <section className="p-4 bg-gray-100 border-2 border-gray-200 rounded-md shadow-lg">
            <p className="text-xl text-center font-semibold mb-4">Financial situation</p>
            {/* Status-melding */}
            {status && (
                <p className="text-sm mb-4 text-gray-500 text-center italic">{status}</p>
            )}
            {/* Finansinformasjon */}
            <div className="p-4 bg-blue-200 border-2 border-blue-300 rounded-md shadow-md">
                <ul className="space-y-2 text-sm">
                    {/* Antall penger */}
                    <li className="flex items-baseline justify-between gap-4">
                        <span className="font-medium">Money left:</span>
                        <span className="font-bold bg-white px-2 py-1 rounded-md shadow-md">${moneyLeft.toLocaleString()}</span>
                    </li>
                    {/* Hvor mange utøvere som er kjøpt */}
                    <li className="flex items-baseline justify-between gap-4">
                        <span className="font-medium">Purchased athletes:</span>
                        <span className="font-bold bg-white px-2 py-1 rounded-md shadow-md">{numberOfPurchases}</span>
                    </li>
                    {/* Antall kjøp */}
                    <li className="flex items-baseline justify-between gap-4">
                        <span className="font-medium">Total spending so far:</span>
                        <span className="font-bold bg-white px-2 py-1 rounded-md shadow-md">${moneySpent.toLocaleString()}</span>
                    </li>
                    {/* Antall lån */}
                    <li className="flex items-baseline justify-between gap-4">
                        <span className="font-medium">Loan balance:</span>
                        <span className="font-bold bg-white px-2 py-1 rounded-md shadow-md">${loanBalance.toLocaleString()}</span>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default FinanceCard;