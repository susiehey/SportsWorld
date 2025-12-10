import type IFinance from "../../interfaces/IFinance";

interface FinanceProps {
  finance: IFinance | null;
}

export default function FinanceCard({ finance }: FinanceProps) {
    return (
         <section className="p-4">
            <p className="text-xl font-semibold mb-2">Financial situation</p>
                {!finance ? (
                    <p className="text-sm text-red-500">Data unavailable.</p>
                ) : (
                    <ul className="space-y-1">
                    <li>
                        <span className="font-light">Money left:</span>{" "}
                        ${finance.moneyLeft.toLocaleString()}
                    </li>
                    <li>
                        <span className="font-light">Purchased athletes:</span>{" "}
                        {finance.numberOfPurchases}
                    </li>
                    <li>
                        <span className="font-light">Total spending so far:</span>{" "}
                        ${finance.moneySpent.toLocaleString()}
                    </li>
                    </ul>
                )}
        </section>
    );
}