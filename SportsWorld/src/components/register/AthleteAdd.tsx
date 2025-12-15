import { useRef, useState, type ChangeEvent } from "react";
import type { IAthlete } from "../../interfaces/IAthlete";
import ImageUploadService from "../../services/ImageUploadService";

const AthleteAdd = () => {
    const [image, setImage] = useState<File | null>(null);
    const [imageName, setImageName] = useState<string>("");
    const [status, setStatus] = useState("");
    const nameInput = useRef<HTMLInputElement | null>(null);
    const genderInput = useRef<HTMLSelectElement | null>(null);
    const priceInput = useRef<HTMLInputElement | null>(null);

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target;
        if (files != null) {
            setImage(files[0]);
            setImageName(files[0].name);
        }
    }

    const registerAthlete = async () => {
        setStatus("");
        if (
            nameInput.current &&
            nameInput.current.value.trim() != "" &&
            genderInput.current &&
            genderInput.current.value.trim() != "" &&
            priceInput.current &&
            priceInput.current.value.trim() != "" &&
            image != null
        ) {
            const newAthlete : IAthlete = {
                name: nameInput.current.value,
                gender: genderInput.current.value,
                price: Number(priceInput.current.value),
                image: image.name
            }
            try {
                await ImageUploadService.postAthlete(newAthlete, image);
                setStatus("Athlete registered successfully.");
            } catch (error) {
                // Viser feilmelding i konsoll
                console.error(error);
                // Viser feilmelding til brukeren
                setStatus("Registration failed. Please try again.")
            }
        } else {
            setStatus("Some fields are missing input. Please fill in all fields.");
        }
    }

    return (
        <section className="p-4 bg-gray-100 border-2 border-gray-200 rounded-md shadow-lg">
            <p className="text-xl text-center font-semibold mb-4">Fill in information</p>
            {/* Status-melding */}
            {status && (
                <p className="text-sm mb-4 -mt-2 text-gray-500 text-center italic">{status}</p>
            )}
            {/* Registreringsfelt */}
            <div className="text-sm p-4 bg-blue-200 border-2 border-blue-300 rounded-md shadow-md mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Skriv inn avn */}
                <div>
                    <label className="font-medium">Name:</label>
                    <input 
                        type="text" 
                        ref={nameInput}
                        placeholder="Type in first and last name..."
                        className="w-full h-8 px-3 py-2 bg-white rounded-md shadow-md placeholder:text-xs placeholder:text-gray-500 placeholder:italic"/>
                </div>
                {/* Velg kjønn */}
                <div>
                    <label className="font-medium">Gender:</label>
                    <select 
                        ref={genderInput} 
                        className="w-full h-8 px-3 py-2 bg-white rounded-md shadow-md italic text-xs text-gray-500">
                            <option value="">Select gender</option>
                            <option>Female</option>
                            <option>Male</option>
                            <option>Other</option>
                        </select>
                </div>
                {/* Skriv inn pris */}
                <div>
                    <label className="font-medium">Price:</label>
                    <input 
                        type="number" 
                        min="0"
                        ref={priceInput}
                        placeholder="Type in price..."
                        className="w-full h-8 px-3 py-2 bg-white rounded-md shadow-md placeholder:text-xs placeholder:text-gray-500 placeholder:italic"/>
                </div>
                {/* Last opp bilde */}
                <div>
                    <label className="font-medium">Upload image:</label>
                    <input 
                        type="file" 
                        onChange={changeHandler}
                        accept="image/png,image/jpeg,image/webp"
                        className="w-full border bg-white border-gray-200 shadow-sm rounded-lg text-sm file:text-xs file:bg-blue-600 file:me-4 file:py-2 file:px-4 file:text-white file:cursor-pointer file:font-bold hover:file:bg-blue-800"/>
                </div>
            </div>
            {/* Registrer utøver knapp */}
            <div className="flex justify-center mt-4">
                    <button
                    onClick={registerAthlete}
                    className="px-2.5 py-2 bg-blue-600 text-white text-xs font-bold rounded-md hover:bg-blue-800 hover:scale-110 hover:shadow-md transition-transform">
                        Register
                    </button>
                </div>
        </section>

       // gammelt
       /*
        <section>
            <div className="m-2">
                <label>Name</label>
                <input type="text" ref={nameInput} className="border ml-2" />
            </div>

            <div className="m-2">
                <label>Gender</label>
                <select ref={genderInput} className="border ml-2">
                    <option value="">Select gender</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div className="m-2">
                <label>Price</label>
                <input type="number" min="0" ref={priceInput} className="border ml-2" />
            </div>

            <div className="m-2">
                <p>Image selected: {imageName}</p>
            </div>

            <div className="m-2">
                <label className="border cursor-pointer rounded py-1 px-3">
                    Select Image
                    <input type="file" onChange={changeHandler} className="hidden"/>
                </label>
            </div>

            <div className="m-2">
                <button onClick={registerAthlete} className="border cursor-pointer bg-green-600 text-white font-bold py-2 px-4 rounded">
                    Register
                </button>
            </div>
            <div>
                <p>Status: {status}</p>
            </div>
        </section>
        */
    )
}

export default AthleteAdd;