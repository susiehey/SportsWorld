import type IFinance from "../../interfaces/IFinance";
import { useEffect, useState } from "react";
import { getFinance } from "../../services/financeService";

const FinanceCard = () => {
    const [finance, setFinance] = useState<IFinance | null>(null);
    const moneyLeft = finance?.moneyLeft ?? 0;
    const numberOfPurchases = finance?.numberOfPurchases ?? 0;
    const moneySpent = finance?.moneySpent ?? 0;

    const loadFinance = async () => {
        try {
            const f = await getFinance().catch(() => null)
            setFinance(f);
        } catch (error) {
            //
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
         <section className="p-4">
            <p className="text-xl font-semibold mb-2">
                Financial situation
            </p>
            <ul className="space-y-1">
                <li>
                    <span className="font-light">
                        Money left:
                    </span>
                    {" "} ${moneyLeft.toLocaleString()}
                </li>
                <li>
                    <span className="font-light">
                        Purchased athletes:
                    </span>
                    {" "} {numberOfPurchases}
                </li>
                <li>
                    <span className="font-light">
                        Total spending so far:
                    </span>
                    {" "} ${moneySpent.toLocaleString()}
                </li>
            </ul>
        </section>
    );
}

export default FinanceCard;