import { useRef, useState } from "react";
import athletesService from "../../services/athletesService";
import type { IAthlete } from "../../interfaces/IAthlete";

const AthleteEdit = () => {
    const idInput = useRef<HTMLInputElement | null>(null);
    const nameInput = useRef<HTMLInputElement | null>(null);
    const genderInput = useRef<HTMLSelectElement | null>(null);
    const priceInput = useRef<HTMLInputElement | null>(null);
    const [image, setImage] = useState<string>();
    const [status, setStatus] = useState("");

    const getAthleteById = async () => {
        setStatus("");
        if (idInput.current && idInput.current.value.trim() != ""){
            const idParsed = Number(idInput.current.value);

            if (!isNaN(idParsed)){
                const response = await athletesService.getAthleteById(idParsed);

                if (response.success === true){
                    if (nameInput.current != null){
                        nameInput.current.value = response.data?.name || "Not set";
                    }
                    if (genderInput.current != null){
                        genderInput.current.value = response.data?.gender || "Not set";
                    }
                    if (priceInput.current != null){
                        priceInput.current.value = String(response.data?.price);
                    }
                    setImage(response.data?.image);
                } else {
                    setStatus("Athlete not found");
                }
            } else {
                setStatus("Invalid ID");
            }
        }
    }

    const editAthlete = async () => {
        setStatus("");
        if (
            idInput.current &&
            nameInput.current &&
            genderInput.current &&
            priceInput.current &&

            idInput.current.value.trim() != "" &&
            nameInput.current.value.trim() != "" &&
            genderInput.current.value.trim() != "" &&
            priceInput.current.value.trim() != ""
        ) {
            const id = Number(idInput.current.value);
            const name = nameInput.current.value;
            const gender = genderInput.current.value;
            const price = Number(priceInput.current.value);

            if (!isNaN(id)){
                const editedAthlete : IAthlete = {
                    id: id,
                    name: name,
                    gender: gender,
                    price: price,
                    image
                }
                const response = await athletesService.updateAthlete(editedAthlete);

                if (response.success === true){
                    setStatus("Changes saved successfully.");
                } else {
                    setStatus("Failed to save changes.");
                }
            }
        } else {
            setStatus("Some fields are missing input. Please fill in all fields.");
        }
    }

    const deleteAthlete = async () => {
        setStatus("");

        if (!idInput.current || idInput.current.value.trim() == "") {
            setStatus("Please enter ID first.");
            return;
        }

        const id = Number(idInput.current?.value);
        if (isNaN(id)) {
            setStatus("Invalid ID.");
            return;
        };

        // Vi vil unngå at brukeren sletter feil utøver med et uhell, så dette bekrefter sletting av utøver
        if (!window.confirm("Are you sure you want to delete this athlete?")) {
            return;
        }

        try {
            const response = await athletesService.deleteAthlete(id);
            if (response?.success === true) {
                setStatus("Athlete deleted successfully.");

                // Tømmer feltene etter sletting
                if (nameInput.current) nameInput.current.value = "";
                if (genderInput.current) genderInput.current.value = "";
                if (priceInput.current) priceInput.current.value = "";
                setImage(undefined);
            } else {
                setStatus("Could not delete athlete. Check if ID is correct.");
            }
        } catch (error) {
            // Viser feilmelding i konsoll
            console.error(error);
            // Viser feilmelding til brukeren
            setStatus("Could not delete athlete. Check if ID is correct.");
        };
    }

    return (
         <section className="p-4 bg-gray-100 border-2 border-gray-200 rounded-md shadow-lg">
            <p className="text-xl text-center font-semibold mb-4">Edit or delete athlete</p>
            {/* Status-melding */}
            {status && (
                <p className="text-sm mb-4 -mt-2 text-gray-500 text-center italic">{status}</p>
            )}
            <div>
                <div className="p-4 bg-blue-200 border-2 border-blue-300 rounded-md shadow-md">
                {/* Søk etter ID  */}
                <div className="flex gap-4">
                    <input
                        type="number" 
                        min="0"
                        ref={idInput} 
                        placeholder="Type in ID of athlete..."
                        className="w-3/4 h-8 px-3 py-2 bg-white rounded-md shadow-md placeholder:text-xs placeholder:italic placeholder:text-gray-500"/>
                        <button
                            onClick={getAthleteById}
                            className="px-2.5 py-2 w-1/4 bg-blue-600 text-white text-xs font-bold hover:cursor-pointer rounded-md hover:bg-blue-800 hover:scale-110 hover:shadow-md transition-transform">
                                Get athlete
                        </button>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    {/* Skriv inn navn */}
                    <label className="text-sm font-medium">Name:</label>
                    <input 
                        type="text" 
                        ref={nameInput} 
                        placeholder="Type in name..."
                        className="w-full h-8 px-3 py-2 bg-white rounded-md shadow-md placeholder:text-xs placeholder:italic placeholder:text-gray-500"/>
                </div>
                <div>
                    {/* Velg kjønn */}
                    <label className="text-sm font-medium">Gender:</label>
                    <select 
                        ref={genderInput} 
                        className="w-full h-8 px-3 py-2 bg-white text-gray-500 text-xs italic rounded-md shadow-md">
                        <option value="">Select gender</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    {/* Skriv inn pris */}
                    <label className="text-sm font-medium">Price:</label>
                    <input 
                        type="number" 
                        min="0" 
                        ref={priceInput}
                        placeholder="Type in price..."
                        className="w-full h-8 px-3 py-2 bg-white rounded-md shadow-md placeholder:text-xs placeholder:italic placeholder:text-gray-500"/>
                </div>
            </div>
            </div>
                <div className="mt-4 flex justify-center gap-4">
                    {/* Lagre endringer knapp */}
                    <button
                        onClick={editAthlete}
                        className="px-2.5 py-2 bg-blue-600 text-white text-xs font-bold rounded-md hover:bg-blue-800 hover:cursor-pointer hover:scale-110 hover:shadow-md transition-transform">
                            Save changes
                    </button>
                    {/* Slett utøver knapp */}
                    <button
                        onClick={deleteAthlete}
                        className="px-2.5 py-2 bg-rose-600 text-white text-xs font-bold rounded-md hover:bg-rose-800 hover:cursor-pointer hover:scale-110 hover:shadow-md transition-transform"
                        >
                            Delete athlete
                    </button>
                </div>
            </div>
        </section>
    )
}

export default AthleteEdit;