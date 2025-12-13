import { useRef, useState, type ChangeEvent } from "react";
import type { IAthlete } from "../../interfaces/IAthlete";
import ImageUploadService from "../../services/ImageUploadService";

const AthleteAdd = () => {

    const [image, setImage] = useState<File | null>(null);
    const nameInput = useRef<HTMLInputElement | null>(null);
    const genderInput = useRef<HTMLSelectElement | null>(null);
    const priceInput = useRef<HTMLInputElement | null>(null);

    const [status, setStatus] = useState("");

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target;

        if(files != null){
            setImage(files[0]);
            setStatus(`Image selected: ${files[0].name}`);
        }
    }

    const registerAthlete = async () => {
        if(
            nameInput.current &&
            nameInput.current.value.trim() != "" &&
            genderInput.current &&
            genderInput.current.value.trim() != "" &&
            priceInput.current &&
            priceInput.current.value.trim() != "" &&
            image != null
        ){
            const newAthlete : IAthlete = {
                name: nameInput.current.value,
                gender: genderInput.current.value,
                price: Number(priceInput.current.value),
                image: image.name
            }

            try{
                await ImageUploadService.postAthlete(newAthlete, image);
                setStatus("Athlete registered successfully");
            }catch{
                setStatus("Registration failed. Please try again")
            }

        }else{
            setStatus("Some fields are missing input");
        }
    }

    return (
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
    )
}

export default AthleteAdd;