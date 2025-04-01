import { FC } from "react";
import { DeleteConfirmationProps } from "./DeleteConfirmationInterface";

export const DeleteConfirmation: FC<DeleteConfirmationProps> = ({ isOpen, onClose, onConfirm, entityName }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
                <h2 className="text-lg font-semibold text-gray-900">Eliminar {entityName}</h2>
                <p className="text-gray-600 mt-2 text-sm">
                    ¿Estás seguro de que deseas eliminar <strong>{entityName}</strong>? Esta acción no se puede deshacer.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="w-full sm:w-auto px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition">
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};