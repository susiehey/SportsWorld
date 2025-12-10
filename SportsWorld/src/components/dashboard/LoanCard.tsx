import { useState } from "react";

interface LoanProps {
    takeLoan: (amount: number) => Promise<void>;
}

export default function LoanCard({ takeLoan }: LoanProps) {
    const [loanAmount, setLoanAmount] = useState<number>(0);
    const [message, setMessage] = useState<string>("");

    const submitLoan = async () => {
        if (loanAmount <= 0) {
            setMessage("Loan amount must be greater than zero.");
            return;
        }
        try {
            await takeLoan(loanAmount);
            setMessage("Money increased successfully.");
            setLoanAmount(0);
        } catch (error) {
            setMessage("Failed to take loan.");
        }
    };

    return (
        <section className="p-4">
                <p className="text-xl font-semibold mb-2">Loan from bank</p>
                <div className="max-w-fit border p-4">
                    {message && <p className="text-sm text-red-500 mb-2">{message}</p>}
                    <div className="flex gap-2">
                        <input type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        placeholder="Amount"
                        className="border w-md px-3 py-2"/>
                        <button type="button"
                        onClick={submitLoan}
                        className="border px-3 py-2 bg-blue-600 text-white font-bold hover:cursor-pointer">
                            Add money
                        </button>
                    </div>
                </div>
        </section>
    );
}