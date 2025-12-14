import { useState, type ChangeEvent } from "react";
import type { IAthlete } from "../../interfaces/IAthlete";
import AthleteItem from "./AthleteItem";
import athletesService from "../../services/athletesService";

const AthleteSearch = () => {
    const [name, setName] = useState("");
    const [athletes, setAthletes] = useState<IAthlete[]>([]);

    const search = async () => {
        const response = await athletesService.getAthleteByName(name);

        if(response.success && response.data != null){
            setAthletes(response.data);
        }else{
            setAthletes([]);
        }
    };
    
    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const getAthleteJSX = () => {
        const athleteJSX = athletes.map((athlete, index) => {
            return (
                <AthleteItem 
                    key={"athleteSearch" + index}
                    athlete={athlete}
                />
            )
        });
        return athleteJSX;
    }

    return (
        <section>
            <h2 className="text-1xl font-bold m-1">Search by Name</h2>
            <div className="m-2">
                <input onChange={handleNameChange} type="text" className="border"/>
                <button onClick={search} className="border cursor-pointer ml-1 px-2 rounded">
                    Search
                </button>
            </div>

            {getAthleteJSX()}

        </section>
    )
}

export default AthleteSearch;