import { DashboardLayout, Loader, PageWrapper, PatientForm } from "@/app/components";
import { useAuth } from "@/app/context";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function CreatePatient() {
    const TITLE_PAGE = "Crear Paciente";
    const messageOnloading = "Guardando paciente";
    const [loading, setIsLoading] = useState<boolean>(false);
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // console.log(loading)
    }, [loading])


    const goToList = () => {
        router.push(`/${user?.role}/patients`);
    }

    if (loading) return <Loader message={messageOnloading} />


    return (
        <DashboardLayout>
            <PageWrapper>
                <div className="container mx-auto p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold mb-4">Pacientes - {TITLE_PAGE}</h1>
                    </div>
                    <PatientForm handleIsPending={(isPending: boolean) => setIsLoading(isPending)} handleCancel={goToList} />
                </div>
            </PageWrapper>
        </DashboardLayout>
    )
}