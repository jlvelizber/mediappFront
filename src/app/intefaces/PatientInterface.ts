import { PatientGenderEnum } from "../Enums";
import { PaginatorInterface } from "./PaginatorInterface";

export interface PatientInterface {
    id?: number,
    document: string,
    name: string,
    lastname?: string,
    email: string,
    phone: string,
    address?: string,
    dob?: string,
    gender?: PatientGenderEnum
}

export type PatientPaginationInterface = PaginatorInterface<PatientInterface>