import type { IAthlete } from "./IAthlete";
export interface IAthleteItemResponse{
    success: boolean,
    data: IAthlete | null
}