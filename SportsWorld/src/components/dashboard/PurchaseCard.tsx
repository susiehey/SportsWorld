import { useEffect, useMemo, useState } from "react";
import type { IAthlete } from "../../interfaces/IAthlete";
import athleteService from "../../services/athletesService";
import { purchaseAthlete, undoPurchase } from "../../services/financeService";

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

    const availableAthletes = useMemo(
        () => athletes.filter((a) => !a.purchaseStatus),
        [athletes]
    )

    const purchasedAthletes = useMemo(
        () => athletes.filter((a) => a.purchaseStatus),
        [athletes]
    )

    const doPurchase = async (id: number) => {
        try {
            await purchaseAthlete(id);
            setAthletes((prev) =>
                prev.map((a) => (a.id === id ? { ...a, purchaseStatus: true } : a))
            );
            setMessage("Athlete purchased successfully.");
            // Oppdaterer FinanceCard
            window.dispatchEvent(new Event("finance:updated"));
        } catch (error) {
            console.error(error);
            setMessage("Failed to purchase athlete.");
        }
    }

    const doUndoPurchase = async (id: number) => {
        try {
            await undoPurchase(id);
            setAthletes(prev => prev.map(a => a.id === id ? { ...a, purchaseStatus: false } : a));
            setMessage("Refunded purchase successfully.");
            // Oppdaterer FinanceCard
            window.dispatchEvent(new Event("finance:updated"));
        } catch (error) {
            console.error(error);
            setMessage("Failed to undo purchase.");
        }
    }

    return (
        <section className="p-4">
            <div>
            <p className="text-xl font-semibold mb-2">Purchase available athletes</p>
            {message && <p className="text-sm mb-4 text-gray-500 italic">{message}</p>}
            {availableAthletes.length === 0 ? (
                <p className="text-sm">No athletes available for purchase.</p>
            ) : (
                <ul className="space-y-2">
                {availableAthletes.map(a => (
                    <li key={a.id} className="flex max-w-fit items-center justify-between gap-10 border p-4">
                        <div className="flex items-center gap-4">
                            {a.image &&
                            <img 
                                src={a.image}
                                className="w-10 h-10 object-cover border"
                            />
                            }
                            <div>
                                <p className="text-md font-medium">
                                    {a.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    ${a.price.toLocaleString()}
                                </p>
                            </div>
                        </div>
                        <button
                            className="border px-3 py-2 bg-blue-600 text-white font-bold hover:cursor-pointer"
                            onClick={() => doPurchase(a.id!)}
                        >
                            Buy
                        </button>
                    </li>
                ))}
                </ul>
            )}
            </div>
            <div>
                <p className="text-xl font-semibold mb-2">Purchased athletes</p>
                {message && <p className="text-sm">{message}</p>}
                {purchasedAthletes.length === 0 ? (
                    <p className="text-sm">No athletes purchased.</p>
                ) : (
                    <ul className="space-y-2">
                        {purchasedAthletes.map(a => (
                            <li key={a.id} className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    {a.image &&
                                    <img 
                                        src={a.image}
                                        className="w-10 h-10 object-cover border"
                                    />
                                    }
                                    <div>
                                        <p className="text-md font-medium">
                                            {a.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            ${a.price.toLocaleString()}
                                        </p>
                                    </div>
                                    <button
                                        className="border px-3 py-2 bg-rose-400 text-white font-bold hover:cursor-pointer"
                                        onClick={() => doUndoPurchase(a.id!)}
                                    >
                                        Undo purchase
                                    </button>
                                </div>
                            </li>
                                
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}

export default PurchaseCard;