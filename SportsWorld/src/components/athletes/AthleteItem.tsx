import type { IAthlete } from "../../interfaces/IAthlete";

const AthleteItem = ({athlete}:{athlete: IAthlete}) => {
    return (
        <div className="col-span-3 border m-8 flex justify-between">
            <div className="space-y-2">
                <p>
                    <b className="font-bold">Athlete Number: </b>
                    {athlete.id}
                </p>
                <p>
                    <b className="font-bold">Name: </b>
                    {athlete.name}
                </p>
                <p>
                    <b className="font-bold">Gender: </b> 
                    {athlete.gender}
                </p>
                <p>
                    <b className="font-bold">Price: </b>
                    {athlete.price}
                </p>
                <p>{athlete.purchaseStatus}</p>
            </div>
            <img 
                className="h-50"
                src={`http://localhost:5074/images/${athlete.image}`} 
                alt={`Bilde av ${athlete.name}`}
            />
        </div>
    )
}

export default AthleteItem;