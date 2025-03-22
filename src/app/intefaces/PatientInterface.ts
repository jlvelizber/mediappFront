import { PaginatorInterface } from "./PaginatorInterface";

export interface PatientInterface {
    id: number,
    document: string,
    name: string,
    email: string,
    phone: string,
    address?: string,
}

export type PatientPaginationInterface = PaginatorInterface<PatientInterface>