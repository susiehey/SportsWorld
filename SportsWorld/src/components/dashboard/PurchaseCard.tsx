import type { IAthlete } from "../../interfaces/IAthlete";

interface PurchaseProps {
    buyableAthletes: IAthlete[];
    purchaseAthlete: (id: number) => Promise<void>;
}

export default function PurchaseCard({ buyableAthletes, purchaseAthlete }: PurchaseProps) {
    return (
        <section className="p-4">
            <p className="text-xl font-semibold mb-2">Purchase available athletes</p>
            {buyableAthletes.length === 0 ? (
                <p className="text-sm text-red-500">No athletes available for purchase.</p>
            ) : (
                <ul className="space-y-2">
                {buyableAthletes.map(a => (
                    <li key={a.id} className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            {a.image && <img src={a.image} alt={a.name} className="w-10 h-10 object-cover" />}
                        <div>
                            <p className="font-medium">{a.name}</p>
                            <p className="text-xs text-gray-500">${a.price.toLocaleString()}</p>
                        </div>
                        </div>
                    <button
                        className="border px-3 py-2 bg-blue-600 text-white font-bold hover:cursor-pointer"
                        onClick={() => purchaseAthlete(a.id!)}>
                            Buy
                    </button>
                    </li>
                ))}
                </ul>
                )}
        </section>
    );
}