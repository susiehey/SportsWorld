import type IFinance from "../../interfaces/IFinance";
import { useEffect, useState } from "react";
import { getFinance } from "../../services/financeService";

const FinanceCard = () => {
    const [finance, setFinance] = useState<IFinance | null>(null);
    const [message, setMessage] = useState("");
    const moneyLeft = finance?.moneyLeft ?? 0;
    const numberOfPurchases = finance?.numberOfPurchases ?? 0;
    const moneySpent = finance?.moneySpent ?? 0;
    const loanBalance = finance?.loanBalance ?? 0;

    const loadFinance = async () => {
        try {
            const f = await getFinance().catch(() => null)
            setFinance(f);
        } catch (error) {
            console.error(error);
            setMessage("Failed to load finance.");
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
            {message && (
                <p className="text-sm mb-4 text-gray-500 italic">{message}</p>
            )}
            <div className="p-4 bg-blue-200 border-2 border-blue-300 rounded-md shadow-md">
                <ul className="space-y-2 text-sm">
                    <li className="flex items-baseline justify-between gap-4">
                        <span className="font-medium">Money left:</span>
                        <span className="font-bold bg-white px-2 py-1 rounded-md shadow-md">${moneyLeft.toLocaleString()}</span>
                    </li>
                    <li className="flex items-baseline justify-between gap-4">
                        <span className="font-medium">Purchased athletes:</span>
                        <span className="font-bold bg-white px-2 py-1 rounded-md shadow-md">{numberOfPurchases}</span>
                    </li>
                    <li className="flex items-baseline justify-between gap-4">
                        <span className="font-medium">Total spending so far:</span>
                        <span className="font-bold bg-white px-2 py-1 rounded-md shadow-md">${moneySpent.toLocaleString()}</span>
                    </li>
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