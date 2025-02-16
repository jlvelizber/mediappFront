import { DoctorAvailabilityInterface } from "@/app/intefaces";

export interface AvailabilityListInterface {
    items : DoctorAvailabilityInterface[],
    onRemove: (itemId : number) => void 
}