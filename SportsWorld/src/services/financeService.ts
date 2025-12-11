import { api } from './client';
import type IFinance from '../interfaces/IFinance';

export async function getFinance(): Promise<IFinance> {
    const response = await api.get<IFinance>("/finance");
    return response.data;
}

export async function increaseMoney(amount: number): Promise<IFinance> {
    const response = await api.post<IFinance>("/finance/loan", { amount });
    return response.data;
}

export async function purchaseAthlete(athleteId: number): Promise<IFinance> {
    const response = await api.post<IFinance>("/finance/purchase", { athleteId });
    return response.data;
}