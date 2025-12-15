import { useState, type ChangeEvent } from "react";
import type { IAthlete } from "../../interfaces/IAthlete";
import AthleteItem from "./AthleteItem";
import athletesService from "../../services/athletesService";

const AthleteSearch = () => {
    const [name, setName] = useState("");
    const [athletes, setAthletes] = useState<IAthlete[]>([]);
    const [status, setStatus] = useState("");


    const search = async () => {
        setStatus("");
        setAthletes([]);

        try {
            const response = await athletesService.getAthleteByName(name);

            if (response.success && response.data != null) {
                if (response.data.length === 0) {
                    setStatus("No athletes found.");
                } else {
                    setAthletes(response.data);
                }
            } else {
                setStatus("Search failed. Please try again.");
            }
        } catch (error) {
            // Viser feilmelding i konsoll
            console.error(error);
            // Viser feilmelding til brukeren
            setStatus("Search failed. Please try again.");
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
                    a={athlete}
                />
            )
        });
        return athleteJSX;
    }

    return (
        <section className="p-4 bg-gray-100 border-2 border-gray-200 rounded-md shadow-lg">
            <p className="text-xl text-center font-semibold mb-4">Search athletes</p>
            {status && (
                <p className="text-sm mb-4 -mt-2 text-gray-500 text-center italic">{status}</p>
            )}
            <div className="p-4 bg-blue-200 border-2 border-blue-300 rounded-md shadow-md mb-4">
                <div className="flex gap-4">
                    <input 
                    onChange={handleNameChange} 
                    type="text"
                    placeholder="Type in name of athlete..."
                    className="w-full h-8 px-3 py-2 bg-white rounded-md shadow-md placeholder:text-xs placeholder:italic placeholder:text-gray-500"/>
                    <button onClick={search} className="px-2.5 py-2 w-1/4 bg-blue-600 text-white text-xs font-bold hover:cursor-pointer rounded-md hover:bg-blue-800 hover:scale-110 hover:shadow-md transition-transform">
                        Search
                    </button>
                </div>
            </div>
            {getAthleteJSX()}
        </section>
    )
}

export default AthleteSearch;