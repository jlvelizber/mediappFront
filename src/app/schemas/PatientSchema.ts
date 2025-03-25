import { z } from "zod";
import { PatientGenderEnum } from "../Enums";

export const PatientStoreSchema =
    z.object({
        name: z.string().min(2, "El nombre es obligatorio"),
        lastname: z.string().min(2, "El apellido es obligatorio"),
        document: z.string().min(10, "Documento inválido"),
        email: z.string().email("Correo inválido"),
        phone: z.string().min(10, "Teléfono inválido"),
        address: z.string().nullable(),
        dob: z.string().date('Fecha inválida'),
        gender: z.nativeEnum(PatientGenderEnum),
    });
