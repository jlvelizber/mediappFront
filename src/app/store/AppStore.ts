import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createPatientSlice } from "./PatientStore";


export const useAppStore = create()(
    devtools((set) => ({
        ...createPatientSlice(set)
    })),
);