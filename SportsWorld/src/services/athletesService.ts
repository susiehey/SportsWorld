import { api } from './client';
import type { IAthlete } from '../interfaces/IAthlete';

// Henter alle utøvere
export async function getAthletes(): Promise<IAthlete[]> {
    const response = await api.get<IAthlete[]>('/athletes');
    return response.data;
}

// Opretter en ny utøver (id genereres av backend)
export async function createAthletes(input: Omit<IAthlete, "id">): Promise<IAthlete> {
    const payload: Omit<IAthlete, "id"> = {
        name: input.name,
        age: input.age,
        gender: input.gender,
        image: input.image ?? "",
        price: input.price
    };
    const response = await api.post<IAthlete>('/athletes', payload);
    return response.data;
}

// Oppdaterer en utøver (partial gjør alle felter valgfrie)
export async function updateAthlete(id: number, patch: Partial<IAthlete>): Promise<IAthlete> {
    const response = await api.put<IAthlete>(`/athletes/${id}`, patch);
    return response.data;
}

// Sletter en utøver
export async function deleteAthlete(id: number): Promise<void> {
    await api.delete(`/athletes/${id}`);
}