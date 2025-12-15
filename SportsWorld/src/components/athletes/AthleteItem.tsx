import type { IAthlete } from "../../interfaces/IAthlete";
import { imageUrl } from "../../services/imageUrl";

const AthleteItem = ({a}:{a: IAthlete}) => {
    return (
        <li className="p-3 bg-white border-2 border-gray-200 rounded-md shadow-md list-none hover:border-blue-600 hover:border-3 hover:cursor-pointer transition-transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500">
            <div className="flex items-center gap-4">
                {a.image && (
                    <img 
                        src={`http://localhost:5048/images/${a.image}`}
                        alt={`Picture of ${a.name}`}
                        className="w-20 h-fit object-cover"
                    />
                )}
                <div className="space-y-0.5 text-xs">
                    <p className="font-semibold text-sm">{a.id}. {a.name}</p>
                    <p className="text-gray-500">{a.gender}</p>
                    <p className="text-gray-500">${a.price.toLocaleString()}</p>
                    <p className="font-semibold mt-2">{a.purchaseStatus ? ( 
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