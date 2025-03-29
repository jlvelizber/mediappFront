import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createPatientSlice } from "./PatientStore";
import { createToastSlice } from "./ToastStore";


export const useAppStore = create()(
    devtools((set) => ({
        ...createPatientSlice(set),
        ...createToastSlice(set),
    })),
);