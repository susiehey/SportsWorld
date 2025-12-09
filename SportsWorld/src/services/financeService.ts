import { api } from './client';
import type IFinance from '../interfaces/IFinance';
import type { IAthlete } from '../interfaces/IAthlete';
import { updateAthlete } from './athletesService';

// Definerer endepunkter
const finance = "/finance";
const loan = `${finance}/loan`;
const purchase = (id: number) => `${finance}/${id}/purchase`;

// Henter finansdata
export async function getFinance(): Promise<IFinance> {
    const response = await api.get<IFinance>(finance);
    return response.data;
}

// Øker tilgjengelige penger ved lån
export async function increaseMoney(amount: number): Promise<IFinance> {
    const response = await api.post<IFinance>(loan, { amount });
    return response.data;
}

// Kjøper en utøver
export async function purchaseAthlete(id: number): Promise<{ athlete: IAthlete; finance?: IFinance }> {
    try {
        const response = await api.post<{ athlete: IAthlete; finance: IFinance }>(purchase(id), {});
        return response.data;
    } catch (error) {
        // Hvis kjøpet mislykkes, oppdateres utøverens status tilbake til ikke-kjøpt
        const athlete = await updateAthlete(id, { purchaseStatus: false });
        return { athlete };
    }
}