import { api } from './client';
import type IFinance from '../interfaces/IFinance';

const base = "/finance";

// GET: Hent finansinformasjon
export const getFinance = async (): Promise<IFinance> => {
    const { data } = await api.get<IFinance>(base);
    return data;
}

// POST: Ta lån
export const increaseMoney = async (amount: number): Promise<IFinance> => {
    const { data } = await api.post<IFinance>(`${base}/loan`, { amount });
    return data;
}

// POST: Kjøp utøver
export const purchaseAthlete = async (athleteId: number): Promise<IFinance> => {
    const { data } = await api.post<IFinance>(`${base}/purchase`, { athleteId });
    return data;
}

export default { 
    getFinance, 
    increaseMoney, 
    purchaseAthlete 
};