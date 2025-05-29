"use client";

import { DashboardLayout, DeleteConfirmation, Loader, PageWrapper, PatientForm } from "@/app/components";
import { messages } from "@/app/config";
import { useAuth } from "@/app/context";
import { routeNames } from "@/app/routes";
import { usePatientStore, useToastStore } from "@/app/store";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { MouseEvent, useEffect, useState } from "react";

export default function EditPatient() {
    const TITLE_PAGE = "Editar Paciente";
    const { user } = useAuth();
    const router = useRouter();
    const { isLoading, getPatientForEdit, updatePatient, resetFormDataPatient, removePatient } = usePatientStore();
    const { addToast } = useToastStore();
    const { loading: { fetching, updating, deleting }, updated, deleted: deletedMessage } = messages.patient
    const params = useParams<{ id: string }>();
    const [messageOnLoader, setMessageOnLoader] = useState<string>(fetching);
    const [flowDelete, setFlowDelete] = useState<{ isOpenDeleteConfirmation: boolean, appId: number }>({
        isOpenDeleteConfirmation: false,
        appId: 0
    });

    useEffect(() => {
        if (params) {
            // Aquí puedes realizar la lógica para obtener el paciente por ID
            // Por ejemplo, podrías llamar a una función de tu store o hacer una solicitud a la API
            getPatientForEdit(params.id as unknown as number);
        }
    }, [params])

    const goToList = () => {
        router.replace(`/${user?.role}${routeNames.patients}`);
    }

    const handleCancel = () => {
        goToList();
        resetFormDataPatient();
    }


    const handleSubmit = async (formData: FormData) => {
        if (!params) {
            addToast("Error: Invalid patient ID", "error");
            return;
        }
        setMessageOnLoader(updating);
        const id = params.id as unknown as number;
        const patientId = await updatePatient(id, formData);
        if (patientId) {
            addToast(updated, "success");
        }
    }

    /**
         * HANDLE REMOVE APPOINTMENT 
         */

    const handleCloseDeleteConfirmation = () => {
        setFlowDelete({
            isOpenDeleteConfirmation: false,
            appId: 0
        });
    }

    const handleConfirmDelete = async () => {
        const { appId } = flowDelete;
        setMessageOnLoader(deleting);
        handleCloseDeleteConfirmation();
        await removePatient(appId);
        goToList();
        addToast(deletedMessage, "success");
    };


    const handleRemove = (e: MouseEvent<HTMLButtonElement>, appId: number) => {
        e.preventDefault()
        setFlowDelete({
            isOpenDeleteConfirmation: true,
            appId
        });
    }


    if (isLoading) return <Loader message={messageOnLoader} />


    return (
        <>
            <DeleteConfirmation entityName="Paciente" isOpen={flowDelete.isOpenDeleteConfirmation} onClose={handleCloseDeleteConfirmation} onConfirm={handleConfirmDelete} />
            <DashboardLayout>
                <PageWrapper>
                    <div className="container mx-auto p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-bold mb-4">Pacientes - {TITLE_PAGE}</h1>
                        </div>
                        <PatientForm handleSubmit={handleSubmit} handleCancel={handleCancel} handleDelete={handleRemove} />
                    </div>
                </PageWrapper>
            </DashboardLayout>
        </>
    )
}