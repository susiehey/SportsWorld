import api from './api';
import type IFinance from '../interfaces/IFinance';

const endpoint = "/api/finance";

// GET: Hent finansinformasjon
const getFinance = async (): Promise<IFinance> => {
    const { data } = await api.get<IFinance>(endpoint);
    return data;
}

// POST: Ta lån
const increaseMoney = async (amount: number): Promise<IFinance> => {
    const { data } = await api.post<IFinance>(`${endpoint}/increaseMoney`, { amount });
    return data;
}

// POST: Betal lån tilbake
const payLoan = async (): Promise<IFinance> => {
    const { data } = await api.post<IFinance>(`${endpoint}/payLoan`, {});
    return data;

}

// POST: Kjøp utøver
const purchaseAthlete = async (athleteId: number): Promise<IFinance> => {
    const { data } = await api.post<IFinance>(`${endpoint}/purchase`, { athleteId });
    return data;
}

// POST: Angre kjøp av utøver
const undoPurchase = async (athleteId: number): Promise<IFinance> => {
    const { data } = await api.post<IFinance>(`${endpoint}/refund`, { athleteId });
    return data;
}


export default { 
    getFinance, 
    increaseMoney, 
    purchaseAthlete,
    payLoan,
    undoPurchase
};