import { useState } from "react";
import { increaseMoney } from "../../services/financeService";

const LoanCard = () => {
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState("");

    const submitLoan = async () => {
    if (amount <= 0) {
        setMessage("Loan amount must be greater than zero.");
        return;
    }
    try {
        await increaseMoney(amount);
        setMessage("Loan taken successfully.");
        setAmount(0);
        // Varsler til FinanceCard når data er endret
        window.dispatchEvent(new Event("finance:updated"));
    } catch {
        setMessage("Failed to take loan.");
    }
    };

    return (
        <section className="p-4">
            <p className="text-xl font-semibold mb-2">Loan from bank</p>
            {message && <p className="text-sm mb-2">{message}</p>}
            <div className="max-w-fit border p-4">
                <div className="flex gap-2">
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        placeholder="Amount"
                        className="border w-40 px-3 py-2"/>
                    <button
                        type="button"
                        onClick={submitLoan}
                        className="border px-3 py-2 bg-blue-600 text-white font-bold hover:cursor-pointer">
                            Take loan
                    </button>
                </div>
            </div>
        </section>
    );
}

export default LoanCard;