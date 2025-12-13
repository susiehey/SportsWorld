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

        if(idInput.current && idInput.current.value.trim() != ""){
            const idParsed = Number(idInput.current.value);

            if(!isNaN(idParsed)){
                const response = await athletesService.getAthleteById(idParsed);

                if(response.success === true){
                    if(nameInput.current != null){
                        nameInput.current.value = response.data?.name || "Not set";
                    }
                    if(genderInput.current != null){
                        genderInput.current.value = response.data?.gender || "Not set";
                    }
                    if(priceInput.current != null){
                        priceInput.current.value = String(response.data?.price);
                    }
                    setImage(response.data?.image);
                }else{
                    setStatus("Athlete not found");
                }
            }else{
                setStatus("Invalid ID");
            }
        }
    }

    const editAthlete = async () => {
        setStatus("");

        if(
            idInput.current &&
            nameInput.current &&
            genderInput.current &&
            priceInput.current &&

            idInput.current.value.trim() != "" &&
            nameInput.current.value.trim() != "" &&
            genderInput.current.value.trim() != "" &&
            priceInput.current.value.trim() != ""
        ){
            const id = Number(idInput.current.value);
            const name = nameInput.current.value;
            const gender = genderInput.current.value;
            const price = Number(priceInput.current.value);

            if(!isNaN(id)){
                const editedAthlete : IAthlete = {
                    id: id,
                    name: name,
                    gender: gender,
                    price: price,
                    image
                }
                const response = await athletesService.putAthlete(editedAthlete);

                if(response.success === true){
                    setStatus("Changes saved successfully");
                }else{
                    setStatus("Failed to save changes");
                }
            }
        }else{
            setStatus("All fields must be filled out before saving");
        }
    }

    return (
        <section>
            <h2 className="text-1xl font-bold m-1">Edit Athletes</h2>
            <div className="m-2">
                <label>Id</label>
                <input type="number" min="0" ref={idInput} className="border ml-2"/>
            </div>
            <div className="m-2">
                <button onClick={getAthleteById} className="border cursor-pointer rounded py-1 px-3">
                    Get Athlete
                </button>
            </div>
            <div className="m-2">
                <label>Name</label>
                <input type="text" ref={nameInput} className="border ml-2"/>
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
                <input type="number" min="0" ref={priceInput} className="border ml-2"/>
            </div>
            <div className="m-2">
                <p>Image: {image}</p>
            </div>
            <div className="m-2">
                <button onClick={editAthlete} className="border cursor-pointer bg-green-600 text-white font-bold py-2 px-4 rounded">
                    Save changes
                </button>
            </div>
            <p>Status: {status}</p>
        </section>
    )
}

export default AthleteEdit;