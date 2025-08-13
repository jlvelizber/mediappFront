import { Dialog, Transition } from '@headlessui/react';
import { AlertIcon } from "@primer/octicons-react";
import { FC, Fragment } from 'react';
import { ConfirmationModalInterface } from './ConfirmationModalinterface';

export const ConfirmationModal: FC<ConfirmationModalInterface> = ({
    isOpen,
    title,
    message,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    onConfirm,
    onCancel
}) => {
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onCancel}>
                {/* Fondo oscurecido */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />
                </Transition.Child>

                {/* Contenedor modal */}
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <Dialog.Panel className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <AlertIcon className="h-8 w-8 text-yellow-500" />
                                </div>
                                <div className="ml-4">
                                    <Dialog.Title className="text-lg font-medium text-gray-900">
                                        {title}
                                    </Dialog.Title>
                                    <p className="mt-2 text-sm text-gray-600">{message}</p>
                                </div>
                            </div>

                            {/* Botones */}
                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={onCancel}
                                >
                                    {cancelText}
                                </button>
                                <button
                                    type="button"
                                    className="btn-primary"
                                    onClick={onConfirm}
                                >
                                    {confirmText}
                                </button>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}