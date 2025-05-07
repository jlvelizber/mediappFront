import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createAppointmentSlice } from "./AppointmentStore";
import { createPatientSlice } from "./PatientStore";
import { createToastSlice } from "./ToastStore";


export const useAppStore = create()(
    devtools((set, get) => ({
        ...createPatientSlice(set, get),
        ...createToastSlice(set),
        ...createAppointmentSlice(set, get),
    })),
);