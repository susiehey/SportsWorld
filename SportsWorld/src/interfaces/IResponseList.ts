export interface IResponseList<T = any> {
    success: boolean,
    data: T | null
};