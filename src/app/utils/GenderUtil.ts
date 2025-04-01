import { PatientGenderEnum } from "../Enums";

export const getGenders = () => {
    return Object.entries(PatientGenderEnum).map(([key, value], index) => ({ id: index, value: key.toLowerCase(), label: value.charAt(0).toUpperCase() + value.slice(1) }));
}
