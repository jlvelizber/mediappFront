"use client";

import { DashboardLayout, Loader, PageWrapper, PatientForm } from "@/app/components";
import { messages } from "@/app/config";
import { useAuth } from "@/app/context";
import { routeNames } from "@/app/routes";
import { usePatientStore, useToastStore } from "@/app/store";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function EditPatient() {
    const TITLE_PAGE = "Editar Paciente";
    const { user } = useAuth();
    const router = useRouter();
    const { isLoading, getPatientForEdit, updatePatient, resetFormDataPatient } = usePatientStore();
    const { addToast } = useToastStore();
    const { loading: { fetching }, updated } = messages.patient
    const params = useParams<{ id: string }>();

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
        resetFormDataPatient();
        goToList();
    }


    const handleSubmit = async (formData: FormData) => {
        updatePatient(formData);
        addToast(updated, "success");
    }


    if (isLoading) return <Loader message={fetching} />


    return (
        <DashboardLayout>
            <PageWrapper>
                <div className="container mx-auto p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold mb-4">Pacientes - {TITLE_PAGE}</h1>
                    </div>
                    <PatientForm handleSubmit={handleSubmit} handleCancel={handleCancel} />
                </div>
            </PageWrapper>
        </DashboardLayout>
    )
}