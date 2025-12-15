import api from './api';
import axios from "axios";
import type { IAthlete } from '../interfaces/IAthlete';
import type { IResponseList } from '../interfaces/IResponseList';
import type { IAthleteItemResponse } from '../interfaces/IAthleteItemResponse';
import type { IDefaultResponse } from '../interfaces/IDefaultResponse';

const endpoint = "/api/athletes";

// GET: Henter alle utøvere
const getAllAthletes = async () : Promise<IResponseList> => {
    try {
        const response = await api.get(endpoint);
        console.log("TRY");
        return {
            success: true,
            data: response.data
        };
    } catch {
        console.log("CATCH");
        return {
            success: false,
            data: null
        };
    }
}

// GET: Henter utøver basert på navn
const getAthleteByName = async (name: string) : Promise<IResponseList> => {
    try {
        const response = await api.get(`${endpoint}/GetByName/${name}`);
        return { success: true, data: response.data
        }
    } catch {
        return { success: false, data: null }
    }
}

// GET: Henter utøver basert på ID
const getAthleteById = async (id: number) : Promise<IAthleteItemResponse> => {
    try {
        const response = await api.get(`${endpoint}/${id}`); 
        return { success: true, data: response.data
        }
    } catch {
        return { success: false, data: null }
    }
}

// PUT: Oppdaterer en utøver
const updateAthlete = async (editedAthlete: IAthlete) : Promise<IDefaultResponse> => {
    try {
        await api.put(endpoint, editedAthlete);
        return { success: true }
    } catch {
        return { success: false }
    }
}

//Emma: Denne tror jeg ikke vi trenger, det å registrere en ny athlete blir allerede gjort i imageuploadService og AthleteAdd
// POST: Opretter en ny utøver
const createAthletes = async (input: Omit<IAthlete, "id">): Promise<IResponseList<IAthlete>> => {
    try {
        const payload: Omit<IAthlete, "id"> = {
            name: input.name,
            gender: input.gender,
            image: input.image ?? "",
            price: input.price
        };
        const { data } = await api.post<IAthlete>(endpoint, payload);
        return { success: true, data };
    } catch {
        return { success: false, data: null };
    }
}

// DELETE: Sletter en utøver
const deleteAthlete = async (id: number) : Promise<IDefaultResponse> => {
    try{
        await axios.delete(`${endpoint}/${id}`)
        return {
            success: true
        }
    }catch{
        return {
            success: false
        }
    }
}

export default { 
    getAllAthletes,
    getAthleteByName, 
    getAthleteById,
    createAthletes,
    updateAthlete,
    deleteAthlete
};