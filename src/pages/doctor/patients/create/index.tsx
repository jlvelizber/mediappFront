import { DashboardLayout, Loader, PageWrapper, PatientForm } from "@/app/components";
import { messages } from "@/app/config";
import { useAuth } from "@/app/context";
import { routeNames } from "@/app/routes";
import { usePatientStore, useToastStore } from "@/app/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CreatePatient() {
    const { created, loading: { creating } } = messages.patient;
    const TITLE_PAGE = "Crear Paciente";
    const { user } = useAuth();
    const router = useRouter();
    const { addPatient, isLoading, resetFormDataPatient } = usePatientStore();
    const { addToast } = useToastStore();
    const [isFormReady, setIsFormReady] = useState(false);

    useEffect(() => {
        resetFormDataPatient();
        setIsFormReady(true);
    }, [resetFormDataPatient]);

    const goToList = () => {
        router.replace(`/${user?.role}${routeNames.patients}`);
    }

    const handleCancel = () => {
        resetFormDataPatient();
        goToList();
    }

    const goEdit = (id: string) => {
        router.replace(`/${user?.role}${routeNames.patients}/${id}/edit`);
    }

    const handleSubmit = async (formData: FormData) => {
        const patientId = await addPatient(formData);
        if (patientId) {
            goEdit(patientId as unknown as string);
            addToast(created, "success");
        }
    }

    if (isLoading || !isFormReady) return <Loader message={creating} />


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