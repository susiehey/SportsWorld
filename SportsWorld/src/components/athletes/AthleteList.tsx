import { useState, useEffect } from "react";
import athletesService from "../../services/athletesService";
import type { IAthlete } from "../../interfaces/IAthlete";
import AthleteItem from "./AthleteItem";

const AthleteList = () => {
    const [athletes, setAthletes] = useState<IAthlete[]>([]);


    useEffect( () => {
        getAndSetAthletes();
    }, [])

    const getAndSetAthletes = async () => {
        const response = await athletesService.getAllAthletes();
        
        if ( response.success == true && response.data != null && Array.isArray(response.data) ){   
            setAthletes( response.data );
        }
    }

    const getAthleteJSX = () => {
        const athleteJSX = athletes.map((athlete, index) => {
            return (
                <AthleteItem 
                    key={"athlete" + index}
                    athlete={athlete}
                />
            )
        });
        return athleteJSX;
    }

    return (
        <section className="p-4 bg-gray-100 border-2 border-gray-200 rounded-md shadow-lg">
            <p className="text-xl text-center font-semibold mb-4">All athletes</p>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 list-none bg-blue-200 border-2 border-blue-300 rounded-md shadow-md p-4">
                {getAthleteJSX()}
            </ul>
        </section>
    )
}

export default AthleteList;