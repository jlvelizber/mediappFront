import { DashboardLayout, Loader, PageWrapper, PatientForm } from "@/app/components";
import { useAuth } from "@/app/context";
import { routeNames } from "@/app/routes";
import { usePatientStore } from "@/app/store";
import { useRouter } from "next/router";

export default function EditPatient() {
    const TITLE_PAGE = "Editar Paciente";
    const { user } = useAuth();
    const router = useRouter();
    const messageOnloading = "Actualizando paciente...";
    const { addPatient, isLoading } = usePatientStore();

    const goToList = () => {
        router.push(`/${user?.role}/${routeNames.patients}`);
    }

    const goEdit = (id: string) => {
        router.push(`/${user?.role}/${routeNames.patients}/edit/${id}`);
    }

    const handleSubmit = async (formData: FormData) => {
        const patientId = await addPatient(formData);
        debugger
        if (patientId) {
            goEdit(patientId as unknown as string);
        }
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