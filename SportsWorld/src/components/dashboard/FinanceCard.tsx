import type IFinance from "../../interfaces/IFinance";

interface FinanceProps {
  finance: IFinance | null;
}

export default function FinanceCard({ finance }: FinanceProps) {
    const moneyLeft = finance?.moneyLeft ?? 0;
    const numberOfPurchases = finance?.numberOfPurchases ?? 0;
    const moneySpent = finance?.moneySpent ?? 0;

    return (
         <section className="p-4">
            <p className="text-xl font-semibold mb-2">Financial situation</p>
                <ul className="space-y-1">
                <li>
                    <span className="font-light">Money left:</span>{" "}
                    ${moneyLeft.toLocaleString()}
                </li>
                <li>
                    <span className="font-light">Purchased athletes:</span>{" "}
                    {numberOfPurchases}
                </li>
                <li>
                    <span className="font-light">Total spending so far:</span>{" "}
                    ${moneySpent.toLocaleString()}
                </li>
                </ul>
        </section>
    );
}