import { api } from './client';
<<<<<<< HEAD
import axios from 'axios';
=======
import axios from "axios";
>>>>>>> e8b76a62db6a38d88909f442e1b1693a81b66700
import type { IAthlete } from '../interfaces/IAthlete';

const endpoint = "http://localhost:5074/athlete";

interface IResponseList{
    success: boolean,
    data: IAthlete[] | null
};

// Henter alle utøvere
const getAllAthletes = async () : Promise<IResponseList> => {
    try{
        const response = await axios.get(endpoint);
        console.log("TRY");
        return {
            success: true,
            data: response.data
        };
    }catch{
        console.log("CATCH");
        return {
            success: false,
            data: null
        };
    }
}

const getAthleteByName = async (name: string) : Promise<IResponseList> => {
    try{
        const response = await axios.get(`${endpoint}/GetByName/${name}`);
        return {
            success: true,
            data: response.data
        }
    }catch{
        return {
            success: false,
            data: null
        }
    }
}

// Opretter en ny utøver (id genereres av backend)
export async function createAthletes(input: Omit<IAthlete, "id">): Promise<IAthlete> {
    const payload: Omit<IAthlete, "id"> = {
        name: input.name,
        age: input.age,
        gender: input.gender,
        image: input.image ?? "",
        price: input.price
    };
    const response = await api.post<IAthlete>('/athletes', payload);
    return response.data;
}

interface IAthleteItemResponse{
    success: boolean,
    data: IAthlete | null
}

const getAthleteById = async (id: number) : Promise<IAthleteItemResponse> => {
    try{
        const response = await axios.get(`${endpoint}/${id}`); 
        return {
            success: true,
            data: response.data
        }
    }catch{
        return {
            success: false,
            data: null
        }
    }
}

interface IDefaultResponse{
    success: boolean
}

const putAthlete = async (editedAthlete: IAthlete) : Promise<IDefaultResponse> => {
    try{
        const response = await axios.put(endpoint, editedAthlete);
        return {
            success: true
        }
    }catch{
        return {
            success: false
        }
    }
}

// Oppdaterer en utøver (partial gjør alle felter valgfrie)
export async function updateAthlete(id: number, patch: Partial<IAthlete>): Promise<IAthlete> {
    const response = await api.put<IAthlete>(`/athletes/${id}`, patch);
    return response.data;
}

// Sletter en utøver
export async function deleteAthlete(id: number): Promise<void> {
    await api.delete(`/athletes/${id}`);
}

export default {getAllAthletes, getAthleteByName, getAthleteById, putAthlete}