import { useEffect, useMemo, useState } from "react";
import type { IAthlete } from "../../interfaces/IAthlete";
import athleteService from "../../services/athletesService";
import { purchaseAthlete as purchaseAthleteApi } from "../../services/financeService";

const PurchaseCard = () => {
    const [athletes, setAthletes] = useState<IAthlete[]>([]);
    const [message, setMessage] = useState("");

    const loadAthletes = async () => {
        const a = await athleteService.getAllAthletes();
        if (a.success && a.data) {
            setAthletes(a.data);
        } else {
            setMessage("Failed to load athletes.");
        }
    };

    useEffect(() => {
        loadAthletes();
    }, []);

    const buyableAthletes = useMemo(
        () => athletes.filter((a) => !a.purchaseStatus),
        [athletes]
    )

    const purchaseAthlete = async (id: number) => {
        try {
            await purchaseAthleteApi(id);
            setAthletes((prev) =>
                prev.map((a) => (a.id === id ? { ...a, purchaseStatus: true } : a))
            );
            setMessage("Athlete purchased successfully.");
            // Varsler til FinanceCard når data er endret og om å hente på nytt
            window.dispatchEvent(new Event("finance:updated"));
        } catch (error) {
            setMessage("Failed to purchase athlete.");
        }
    }

    return (
        <section className="p-4">
            <p className="text-xl font-semibold mb-2">Purchase available athletes</p>
            {message && <p className="text-sm mb-2">{message}</p>}
            {buyableAthletes.length === 0 ? (
                <p className="text-sm">No athletes available for purchase.</p>
            ) : (
                <ul className="space-y-2">
                {buyableAthletes.map(a => (
                    <li key={a.id} className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            {a.image &&
                            <img 
                                src={a.image} 
                                alt={a.name} 
                                className="w-10 h-10 object-cover" 
                            />
                            }
                            <div>
                                <p className="font-medium">
                                    {a.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    ${a.price.toLocaleString()}
                                </p>
                            </div>
                        </div>
                        <button
                            className="border px-3 py-2 bg-blue-600 text-white font-bold hover:cursor-pointer"
                            onClick={() => purchaseAthlete(a.id!)}
                        >
                            Buy
                        </button>
                    </li>
                ))}
                </ul>
            )}
        </section>
    );
}

export default PurchaseCard;