import type IFinance from '../interfaces/IFinance';
import axios from 'axios';


const endpoint = "http://localhost:5048/api/finance";

// GET: Hent finansinformasjon
const getFinance = async (): Promise<IFinance> => {
    const { data } = await axios.get<IFinance>(endpoint);
    return data;
}

// POST: Ta lån
const increaseMoney = async (amount: number): Promise<IFinance> => {
    const { data } = await axios.post<IFinance>(`${endpoint}/increaseMoney`, { amount });
    return data;
}

// POST: Betal lån tilbake
const payLoan = async (): Promise<IFinance> => {
    const { data } = await axios.post<IFinance>(`${endpoint}/payLoan`, {});
    return data;

}

// POST: Kjøp utøver
const purchaseAthlete = async (athleteId: number): Promise<IFinance> => {
    const { data } = await axios.post<IFinance>(`${endpoint}/purchase`, { athleteId });
    return data;
}

// POST: Angre kjøp av utøver
const undoPurchase = async (athleteId: number): Promise<IFinance> => {
    const { data } = await axios.post<IFinance>(`${endpoint}/refund`, { athleteId });
    return data;
}


export default { 
    getFinance, 
    increaseMoney, 
    purchaseAthlete,
    payLoan,
    undoPurchase
};