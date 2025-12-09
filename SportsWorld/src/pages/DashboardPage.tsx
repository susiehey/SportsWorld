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

    // States
    const [athletes, setAthletes] = useState<IAthlete[]>([]);
    const [finance, setFinance] = useState<IFinance | null>(null);
    const [loans, setLoans] = useState<number>(0);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        (async () => {
            try {
                const list = await getAthletes();
                setAthletes(list);
            } catch (error) {
                setMessage("Could not load athletes.");
            }
        })();
    }, []);

    // Filtrerer utøvere som ikke er kjøpt
    const availableAthletes = useMemo(() => {
        return athletes.filter(athlete => !athlete.purchaseStatus);
    }, [athletes]);

    // const handleLoan = async () => {};

    // const handlePurchase = async (athleteId: number, athletePrice: number) => {};

    return (
        <>
            <section className="p-4 text-center">
                <p className="text-2xl font-bold">Dashboard</p>
                <p className="text-lg font-medium">Monitor your loans and purchases of your MMA athletes.</p>
            </section>

            <section className="p-4">
                <h2 className="text-xl font-semibold mb-2">Financial situation</h2>
                {/* Display financial information here */}
            </section>

            <section className="p-4">
                <h2 className="text-xl font-semibold mb-2">Loan from bank</h2>
                {/* Display loan information here */}
            </section>

            <section className="p-4">
                <h2 className="text-xl font-semibold mb-2">Purchase component</h2>
                {/* Display purchase information here */}
            </section>

        </>
    );
}