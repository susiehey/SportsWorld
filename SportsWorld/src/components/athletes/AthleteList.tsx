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
        if( response.success == true && response.data != null && Array.isArray(response.data) ){   
            setAthletes( response.data );
        }else{
            // TODO: Feilmelding til bruker
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
        <section>
            {getAthleteJSX()}
        </section>
    )
}

export default AthleteList;