import { DashboardLayout, Loader, PageWrapper, PatientForm } from "@/app/components";
import { useAuth } from "@/app/context";
import { usePatientStore } from "@/app/store";
import { useRouter } from "next/router";

export default function CreatePatient() {
    const TITLE_PAGE = "Crear Paciente";
    const { user } = useAuth();
    const router = useRouter();
    const messageOnloading = "Guardando paciente...";
    const { addPatient, isLoading } = usePatientStore();

    const goToList = () => {
        router.push(`/${user?.role}/patients`);
    }

    const handleSubmit = async (formData: FormData) => {
        debugger
        await addPatient(formData);
    }

    if (isLoading) return <Loader message={messageOnloading} />


    return (
        <DashboardLayout>
            <PageWrapper>
                <div className="container mx-auto p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold mb-4">Pacientes - {TITLE_PAGE}</h1>
                    </div>
                    <PatientForm handleSubmit={handleSubmit} handleCancel={goToList} />
                </div>
            </PageWrapper>
        </DashboardLayout>
    )
}