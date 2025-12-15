import { useState } from "react";
import financeService from "../../services/financeService";

const LoanCard = () => {
    const [amount, setAmount] = useState<number | "">("");
    const [status, setStatus] = useState("");

    const submitLoan = async () => {
    if (amount === "" || amount <= 0) {
        setStatus("Loan amount must be greater than zero. Please try again.");
        return;
    }
    try {
        await financeService.increaseMoney(amount);
        setStatus("Loan taken successfully.");
        setAmount(0);
        // Oppdaterer FinanceCard
        window.dispatchEvent(new Event("finance:updated"));
    } catch (error) {
        // Viser feilmelding i konsoll
        console.error(error);
        // Viser feilmelding til brukeren
        setStatus("Failed to take loan. Please try again.");
    }
    };

    const submitPayLoan = async () => {
        try {
            await financeService.payLoan();
            setStatus("Loan paid successfully.");
            // Oppdaterer FinanceCard
            window.dispatchEvent(new Event("finance:updated"));
        } catch (error) {
            // Viser feilmelding i konsoll
            console.error(error);
            // Viser feilmelding til brukeren
            setStatus("Failed to pay loan. Please try again.");
        }
    }

    return (
        <section className="p-4 bg-gray-100 rounded-md border-2 border-gray-200 shadow-lg">
            <p className="text-xl text-center font-semibold mb-4">Take loan from bank</p>
            {/* Status-melding */}
            {status && (
                <p className="text-sm mb-4 -mt-2 text-gray-500 text-center italic">{status}</p>
            )}
            <div className="p-4 space-y-2 bg-blue-200 border-2 border-blue-300 rounded-md shadow-md">
                {/* Taste inn lån */}
                <div className="mb-4">
                    <input
                        type="number"
                        value={amount}
                        placeholder="Type in loan amount..."
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full h-8 px-3 py-2 bg-white rounded-md shadow-md placeholder:text-sm placeholder:text-gray-500"/>
                </div>
                <div className="flex gap-2 justify-center">
                    {/* Ta lån knapp */}
                    <button
                        type="button"
                        onClick={submitLoan}
                        className="px-2.5 py-2 bg-blue-600 text-white text-xs font-bold hover:cursor-pointer rounded-md hover:bg-blue-800 hover:scale-110 hover:shadow-md transition-transform">
                            Take loan
                    </button>
                    {/* Betal lån knapp */}
                    <button
                        type="button"
                        onClick={submitPayLoan}
                        className="px-2.5 py-2 bg-blue-600 text-white text-xs font-bold hover:cursor-pointer rounded-md hover:bg-blue-800 hover:scale-105 hover:shadow-mdtransition-transform">
                            Pay loan in full
                    </button>
                </div>
            </div>
        </section>
    );
}

export default LoanCard;