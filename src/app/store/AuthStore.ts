import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { AuthInterface, DoctorInterface, UserInterface } from "../intefaces";

export interface AuthStoreInterface {
    user: UserInterface | null;
    doctor?: DoctorInterface,
    setUser: (user: UserInterface | null) => void;
    setDoctor: (doctor: DoctorInterface | undefined) => void;
    getDoctorId: () => number | undefined;
    resetSlice: () => void;
}

const initialState: AuthInterface = {
    user: null,
    doctor: undefined,
    token: null
}

// Slice para el estado de pacientes
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createAuthStoreSlice = (set: any, get: any): AuthStoreInterface => ({

    user: initialState.user,
    doctor: initialState.doctor,
    setUser: (user: UserInterface | null) => {
        set((state: AuthStoreInterface) => ({
            ...state,
            user
        }), false, "app:auth/setUser");
    },
    setDoctor: (doctor: DoctorInterface | undefined) => {
        set((state: AuthStoreInterface) => ({
            ...state,
            doctor
        }), false, "app:auth/setDoctor");
    },
    getDoctorId: () => {
        const doctor = get().doctor;
        if (doctor) {
            return doctor.id;
        }
        return undefined;
    },
    resetSlice: () => {
        set({ user: null, doctor: undefined }, false, "app:auth/resetSlice");
    },


})


export const useAuthStore = create<AuthStoreInterface>()(
    devtools(
        persist((set, get) => ({
            ...createAuthStoreSlice(set, get), // Combina el slice con otros si es necesario
        }),
            { name: "AuthStore", storage: createJSONStorage(() => localStorage) } // Nombre que aparecerá en los devtools
        ))
)