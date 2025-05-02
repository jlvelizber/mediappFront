import { AppointmentForm, DashboardLayout, PageWrapper } from "@/app/components";
import { useAuth } from "@/app/context";
import { routeNames } from "@/app/routes";
import { useRouter } from "next/router";

export default function CreateAppointment() {
    const TITLE_PAGE = "Crear";
    const router = useRouter();
    const { user } = useAuth();

    const goToList = () => {
        router.replace(`/${user?.role}${routeNames.appointments}`);
    }

    const handleCancel = () => {
        goToList();
        // resetFormDataPatient();
    }

    const handleSubmit = async (formData: unknown) => {
        console.log(formData);
        // const patientId = await addPatient(formData);
        // if (patientId) {
        //     goEdit(patientId as unknown as string);
        //     addToast(created, "success");
        // }
    }

    return (
        <DashboardLayout>
            <PageWrapper>
                <div className="container mx-auto p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold mb-4">Citas médicas - {TITLE_PAGE}</h1>
                    </div>
                    <AppointmentForm handleCancel={handleCancel} handleSubmit={handleSubmit} />
                </div>
            </PageWrapper>
        </DashboardLayout>
    );
}