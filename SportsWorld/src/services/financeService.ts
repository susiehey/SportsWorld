import { api } from './client';
import type IFinance from '../interfaces/IFinance';

// GET: Hent finansinformasjon
export const getFinance = async (): Promise<IFinance> => {
    const { data } = await api.get<IFinance>("/finance");
    return data;
}

// POST: Ta lån
export const increaseMoney = async (amount: number): Promise<IFinance> => {
    const { data } = await api.post<IFinance>("finance/increaseMoney", { amount });
    return data;
}

// POST: Kjøp utøver
export const purchaseAthlete = async (athleteId: number): Promise<IFinance> => {
    const { data } = await api.post<IFinance>("finance/purchase", { athleteId });
    return data;
}

export default { 
    getFinance, 
    increaseMoney, 
    purchaseAthlete 
};