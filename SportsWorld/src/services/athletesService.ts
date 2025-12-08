import { api } from './client';
import type { IAthlete } from '../interfaces/IAthlete';

export async function getAthletes(): Promise<IAthlete[]> {
    const response = await api.get<IAthlete[]>('/athletes');
    return response.data;
}

// export async function createAthletes(): Promise<IAthlete[]> {}

// export async function updateAthlete(): Promise<IAthlete[]> {}

export async function deleteAthlete(id: number): Promise<void> {
    await api.delete(`/athletes/${id}`);
}