import { useToastStore } from "@/app/store";
import { AlertIcon, CheckCircleIcon, InfoIcon, XCircleIcon } from "@primer/octicons-react";

const icons = {
    success: CheckCircleIcon,
    error: XCircleIcon,
    warning: AlertIcon,
    info: InfoIcon,
};

const colors = {
    success: "bg-green-600", // 💚 Verde médico
    error: "bg-red-600", // ❌ Rojo sobrio
    warning: "bg-yellow-500", // ⚠️ Amarillo alerta
    info: "bg-blue-600", // 🔵 Azul institucional
};

export default function Toasts() {
    const { toasts, removeToast } = useToastStore();

    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-72 max-w-full">
            {toasts.map(({ id, message, type }) => {
                const Icon = icons[type];
                return (
                    <div key={id} className={`flex items-center p-4 rounded-lg shadow-md text-white ${colors[type]}`}>
                        <Icon className="w-5 h-5 mr-3" />
                        <span className="flex-1">{message}</span>
                        <button onClick={() => removeToast(id)} className="ml-2 text-white">✕</button>
                    </div>
                );
            })}
        </div>
    );
}
