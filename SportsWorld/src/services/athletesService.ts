import axios from "axios";
import type { IAthlete } from '../interfaces/IAthlete';
import type { IResponseList } from '../interfaces/IResponseList';
import type { IAthleteItemResponse } from '../interfaces/IAthleteItemResponse';
import type { IDefaultResponse } from '../interfaces/IDefaultResponse';

const endpoint = "http://localhost:5048/api/athletes";

// GET: Henter alle utøvere
const getAllAthletes = async () : Promise<IResponseList> => {
    try {
        const response = await axios.get(endpoint);
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
        const response = await axios.get(`${endpoint}/GetByName/${name}`);
        return { success: true, data: response.data
        }
    } catch {
        return { success: false, data: null }
    }
}

// GET: Henter utøver basert på ID
const getAthleteById = async (id: number) : Promise<IAthleteItemResponse> => {
    try {
        const response = await axios.get(`${endpoint}/${id}`); 
        return { success: true, data: response.data
        }
    } catch {
        return { success: false, data: null }
    }
}

// PUT: Oppdaterer en utøver
const updateAthlete = async (editedAthlete: IAthlete) : Promise<IDefaultResponse> => {
    try {
        await axios.put(endpoint, editedAthlete);
        return { success: true }
    } catch {
        return { success: false }
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
    updateAthlete,
    deleteAthlete
};