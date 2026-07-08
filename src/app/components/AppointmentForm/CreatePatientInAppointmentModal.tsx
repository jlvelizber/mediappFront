import { PatientForm } from "@/app/components";
import { messages } from "@/app/config";
import { usePatientStore, useToastStore } from "@/app/store";
import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment } from "react";

export interface CreatePatientInAppointmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPatientCreated: (patientId: number) => void;
}

export const CreatePatientInAppointmentModal: FC<CreatePatientInAppointmentModalProps> = ({
    isOpen,
    onClose,
    onPatientCreated,
}) => {
    const { addPatient, resetFormDataPatient, isLoading } = usePatientStore();
    const { addToast } = useToastStore();
    const { created, loading: { creating } } = messages.patient;
    const modalCopy = messages.appointment.createPatientModal;

    const handleClose = () => {
        onClose();
    };

    const handleCancel = () => {
        handleClose();
    };

    const handleSubmit = async (formData: FormData) => {
        const patientId = await addPatient(formData);
        if (patientId) {
            addToast(created, "success");
            resetFormDataPatient();
            onPatientCreated(patientId);
            handleClose();
        }
    };

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={handleClose}>
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
                        <Dialog.Panel className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
                            <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
                                {modalCopy.title}
                            </Dialog.Title>

                            {isLoading && (
                                <p className="text-sm text-gray-500 mb-4">{creating}</p>
                            )}

                            <PatientForm handleSubmit={handleSubmit} handleCancel={handleCancel} />
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};
