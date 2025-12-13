import api from './api';
import type { IAthlete } from '../interfaces/IAthlete';
import type { IResponseList } from '../interfaces/IResponseList';
import type { IAthleteItemResponse } from '../interfaces/IAthleteItemResponse';
import type { IDefaultResponse } from '../interfaces/IDefaultResponse';

const endpoint = "/api/athletes";

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
export const getAthleteByName = async (name: string) : Promise<IResponseList> => {
    try {
        const response = await api.get(`${endpoint}/GetByName/${name}`);
        return { success: true, data: response.data
        }
    } catch {
        return { success: false, data: null }
    }
}

// GET: Henter utøver basert på ID
export const getAthleteById = async (id: number) : Promise<IAthleteItemResponse> => {
    try {
        const response = await api.get(`${endpoint}/${id}`); 
        return { success: true, data: response.data
        }
    } catch {
        return { success: false, data: null }
    }
}

// PUT: Oppdaterer en utøver (trenger vi denne?)
export const putAthlete = async (editedAthlete: IAthlete) : Promise<IDefaultResponse> => {
    try {
        const response = await api.put(endpoint, editedAthlete);
        return { success: true }
    } catch {
        return { success: false }
    }
}

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
export const deleteAthlete = async (id: number): Promise<void> => {
    try {
        await api.delete(`/athletes/${id}`);
    } catch (error) {
        //
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