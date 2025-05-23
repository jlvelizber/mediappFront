import { create } from "zustand";
import { devtools } from "zustand/middleware";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

interface ToastStoreInterface {
    toasts: Toast[];
    addToast: (message: string, type: ToastType) => void;
    removeToast: (id: number) => void;
    resetSlice: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createToastSlice = (set: any): ToastStoreInterface => ({
    toasts: [],

    addToast: (message: string, type: ToastType) => {
        const id = Date.now();
        set((state: ToastStoreInterface) => ({
            toasts: [...state.toasts, { id, message, type }],
        }), false, "toastStore/addToast");

        setTimeout(() => set((state: ToastStoreInterface) => ({
            toasts: state.toasts.filter((toast) => toast.id !== id),
        })), 4000); // 📌 Se elimina automáticamente después de 4 segundos
    },

    removeToast: (id: number) => {
        set((state: ToastStoreInterface) => ({
            toasts: state.toasts.filter((toast) => toast.id !== id),
        }), false, "toastStore/removeToast");
    },
    resetSlice: () => {
        set({ toasts: [] }, false, "toastStore/resetSlice");
    },
})

export const useToastStore = create<ToastStoreInterface>()(devtools(
    (set) => ({
        ...createToastSlice(set),
    }),
    { name: "toastStore" } // nombre para la extensión de Redux DevTools
));
