import type { IAthlete } from "../../interfaces/IAthlete";

const AthleteItem = ({athlete}:{athlete: IAthlete}) => {
    return (
        <li className="p-3 bg-white border-2 border-gray-200 rounded-md shadow-md list-none hover:border-blue-600 hover:border-3 hover:cursor-pointer transition-transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500">
            <div className="flex items-center gap-4">
                {athlete.image && (
                    <img 
                        src={`http://localhost:5048/images/${athlete.image}`}
                        alt={`Picture of ${athlete.name}`}
                        className="w-20 h-fit object-cover"
                    />
                )}
                <div className="space-y-0.5 text-xs">
                    <p className="font-semibold text-sm">{athlete.id}. {athlete.name}</p>
                    <p className="text-gray-500">{athlete.gender}</p>
                    <p className="text-gray-500">${athlete.price.toLocaleString()}</p>
                    <p className="font-semibold mt-2">{athlete.purchaseStatus ? ( 
                        <span className="text-green-700">Purchased</span>
                        ) : ( 
                        <span className="text-gray-500">Available for purchase</span>
                        )}
                    </p>
                </div>
            </div>
        </li>
    )
}

export default AthleteItem;