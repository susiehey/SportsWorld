import { useState } from "react";
import { increaseMoney, payLoan } from "../../services/financeService";

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
        // Oppdaterer FinanceCard
        window.dispatchEvent(new Event("finance:updated"));
    } catch (error) {
        console.error(error);
        setMessage("Failed to take loan.");
    }
    };

    const submitPayLoan = async () => {
        try {
            await payLoan();
            setMessage("Loan paid successfully.");
            // Oppdaterer FinanceCard
            window.dispatchEvent(new Event("finance:updated"));
        } catch (error) {
            console.error(error);
            setMessage("Failed to pay loan.");
        }
    }

    return (
        <section className="p-4 bg-gray-100 rounded-md border-2 border-gray-200 shadow-lg">
            <p className="text-xl text-center font-semibold mb-4">Take loan from bank</p>
            {message && <p className="text-sm mb-4 text-gray-500 italic">{message}</p>}
            <div className="p-4 space-y-2 bg-blue-200 border-2 border-blue-300 rounded-md shadow-md">
                <div className="mb-4">
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full h-8 px-3 py-2 bg-white text-gray-400 italic rounded-md shadow-md"/>
                </div>
                <div className="flex gap-2 justify-center">
                    <button
                        type="button"
                        onClick={submitLoan}
                        className="px-2.5 py-2 bg-blue-600 text-white text-xs font-bold hover:cursor-pointer rounded-md hover:bg-blue-800">
                            Take loan
                    </button>
                    <button
                        type="button"
                        onClick={submitPayLoan}
                        className="px-2.5 py-2 bg-blue-600 text-white text-xs font-bold hover:cursor-pointer rounded-md hover:bg-blue-800">
                            Pay loan in full
                    </button>
                </div>
            </div>
        </section>
    );
}

export default LoanCard;