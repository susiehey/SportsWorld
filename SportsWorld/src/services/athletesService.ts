import api from './api';
import axios from "axios";
import type { IAthlete } from '../interfaces/IAthlete';
import type { IResponseList } from '../interfaces/IResponseList';
import type { IAthleteItemResponse } from '../interfaces/IAthleteItemResponse';
import type { IDefaultResponse } from '../interfaces/IDefaultResponse';

const endpoint = "/api/athletes";

interface IResponseList{
    success: boolean,
    data: IAthlete[] | null
};

// GET: Henter alle utøvere
export const getAllAthletes = async () : Promise<IResponseList> => {
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

interface IAthleteItemResponse{
    success: boolean,
    data: IAthlete | null
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

interface IDefaultResponse{
    success: boolean
}

//Emma: Det er denne som sørger for at du kan redigere informasjonen om en athlete i AthleteEdit :)
// PUT: Oppdaterer en utøver (trenger vi denne?)
const putAthlete = async (editedAthlete: IAthlete) : Promise<IDefaultResponse> => {
    try {
        await api.put(endpoint, editedAthlete);
        return { success: true }
    } catch {
        return { success: false }
    }
}

//Emma: Denne tror jeg ikke vi trenger, det å registrere en ny athlete blir allerede gjort i imageuploadService og AthleteAdd
// POST: Opretter en ny utøver
export const createAthletes = async (input: Omit<IAthlete, "id">): Promise<IResponseList<IAthlete>> => {
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

//Emma: Gjør denne det samme som putAthlete?
// PUT: Oppdaterer en utøver
export const updateAthlete = async (id: number, patch: Partial<IAthlete>): Promise<IResponseList<IAthlete>> => {
    try {
        const { data } = await api.put<IAthlete>(`/athletes/${id}`, patch);
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
    putAthlete,
    createAthletes,
    updateAthlete,
    deleteAthlete
};