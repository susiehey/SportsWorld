import { useEffect, useMemo, useState } from "react";
import type { IAthlete } from "../../interfaces/IAthlete";
import athleteService from "../../services/athletesService";
import { imageUrl } from "../../services/imageUrl";
import financeService from "../../services/financeService";

const PurchaseCard = () => {
    const [athletes, setAthletes] = useState<IAthlete[]>([]);
    const [status, setStatus] = useState("");

    const loadAthletes = async () => {
        const a = await athleteService.getAllAthletes();
        if (a.success && a.data) {
            setAthletes(a.data);
        } else {
            setStatus("Failed to load athletes.");
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
            await financeService.purchaseAthlete(id);
            setAthletes((prev) =>
                prev.map((a) => (a.id === id ? { ...a, purchaseStatus: true } : a))
            );
            setStatus("Athlete purchased successfully.");
            // Oppdaterer FinanceCard
            window.dispatchEvent(new Event("finance:updated"));
        } catch (error) {
            // Viser feilmelding i konsoll
            console.error(error);
            // Viser feilmelding til brukeren
            setStatus("Failed to purchase athlete. Please try again.");
        }
    }

    const doUndoPurchase = async (id: number) => {
        try {
            await financeService.undoPurchase(id);
            setAthletes(prev => prev.map(a => a.id === id ? { ...a, purchaseStatus: false } : a));
            setStatus("Refunded purchase successfully.");
            // Oppdaterer FinanceCard
            window.dispatchEvent(new Event("finance:updated"));
        } catch (error) {
            // Viser feilmelding i konsoll
            console.error(error);
            // Viser feilmelding til brukeren
            setStatus("Failed to undo purchase. Please try again.");
        }
    }

    return (
        <section className="p-4 bg-gray-100 border-2 border-gray-200 rounded-md shadow-md">
            <p className="text-xl text-center font-semibold mb-4">Purchase MMA athletes</p>
            {status && (
                <p className="text-sm mb-4 -mt-2 text-gray-500 text-center italic">{status}</p>
            )}
            {/* To kolonner: availableAthletes og purchasedAthletes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Viser utøvere som er tilgjengelige */}
                <div className="p-4 bg-blue-200 border-2 border-blue-300 rounded-md shadow-md h-100 overflow-scroll">
                    <p className="font-semibold mb-4 text-center">Available athletes</p>
                    {availableAthletes.length === 0 ? (
                    <p className="text-sm italic text-gray-500">No athletes available for purchase.</p>
                    ) : (
                        
                        <ul className="space-y-2">
                        {availableAthletes.map(a => (
                            <li key={a.id} className="flex items-center justify-between gap-4 p-4 bg-white rounded-md shadow-md">
                                <div className="flex items-center gap-4">
                                    {a.image && (
                                        <img 
                                            src={imageUrl(a.image)}
                                            className="w-12 h-fit object-cover"
                                        />
                                    )}
                                    <div>
                                        <p className="text-sm font-medium">
                                            {a.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            ${a.price.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className="px-2.5 py-2 bg-emerald-600 text-xs text-white font-bold hover:cursor-pointer rounded-md hover:bg-green-800
                                        hover:scale-110 hover:shadow-md transition-transform"
                                        onClick={() => doPurchase(a.id!)}
                                    >
                                        Buy
                                    </button>    
                                </div>
                            </li>
                        ))}
                        </ul>    
                    )}
                </div>
                {/* Viser utøvere som er kjøpt */}
                <div className="p-4 bg-blue-200 border-2 border-blue-300 rounded-md shadow-md h-100 overflow-scroll">
                    <p className="font-semibold mb-4 text-center">Purchased athletes</p>
                    {purchasedAthletes.length === 0 ? (
                        <p className="text-sm text-gray-500 italic">No athletes purchased.</p>
                    ) : (
                        <ul className="space-y-2">
                            {purchasedAthletes.map(a => (
                                <li key={a.id} className="flex items-center justify-between gap-4 p-4 bg-white rounded-md shadow-md">
                                    <div className="flex items-center gap-4">
                                        {a.image &&
                                        <img 
                                            src={imageUrl(a.image)}
                                            className="w-12 h-fit object-cover"
                                        />
                                        }
                                        <div>
                                            <p className="text-sm font-medium">
                                                {a.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                ${a.price.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                        className="px-2.5 py-2 bg-rose-600 text-white text-xs font-bold hover:cursor-pointer hover:bg-rose-800 rounded-md hover:scale-110 hover:shadow-md transition-transform"
                                        onClick={() => doUndoPurchase(a.id!)}
                                        >
                                            Undo
                                        </button>
                                    </div>
                                </li> 
                            ))}
                        </ul>
                    )}
                </div>    
            </div>
        </section>
    );
}

export default PurchaseCard;