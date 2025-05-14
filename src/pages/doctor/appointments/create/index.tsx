import { AppointmentForm, DashboardLayout, Loader, PageWrapper } from "@/app/components";
import { messages } from "@/app/config";
import { useAuth, useLayout } from "@/app/context";
import { PatientInterface } from "@/app/intefaces";
import { routeNames } from "@/app/routes";
import { useAppointmentStore, usePatientStore, useToastStore } from "@/app/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CreateAppointment() {
    const TITLE_PAGE = "Crear Cita";
    const { loading: { fetching, creating }, created } = messages.appointment;
    const router = useRouter();
    const { user } = useAuth();
    const { setTitlePage } = useLayout();
    const { getPatientsByDoctorInSession } = usePatientStore();
    const { isLoading, setIsLoading, addAppointment, resetFormDataAppointment } = useAppointmentStore();
    const { addToast } = useToastStore();
    const [messageOnLoader, setMessageOnLoader] = useState<string>(fetching);
    const [deps, setDeps] = useState<{
        patients: PatientInterface[];
    }>({
        patients: [],
    });


    const loadDependencies = async () => {
        setIsLoading(true);
        Promise.all([
            getPatientsByDoctorInSession(),
        ]).then((res) => {
            console.log(res);
            setDeps({
                patients: res[0] as unknown as PatientInterface[],
            });

            setIsLoading(false);
        })
    }

    useEffect(() => {
        setTitlePage(TITLE_PAGE);
        loadDependencies();
        return () => {
            setTitlePage("");
        };
    }, []);

    const goToList = () => {
        router.replace(`/${user?.role}${routeNames.appointments}`);
    }

    const handleCancel = () => {
        goToList();
        resetFormDataAppointment();
    }

    const goEdit = (id: string) => {
        router.replace(`/${user?.role}${routeNames.appointments}/edit/${id}`);
    }

    const handleSubmit = async (formData: FormData) => {
        setMessageOnLoader(creating);
        const appointmentId = await addAppointment(formData);
        if (appointmentId) {
            goEdit(appointmentId as unknown as string);
            addToast(created, "success");
        }
    }

    if (isLoading) return <Loader message={messageOnLoader} />

    return (
        <DashboardLayout>
            <PageWrapper>
                <div className="container mx-auto p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold mb-4">Citas médicas - {TITLE_PAGE}</h1>
                    </div>
                    <AppointmentForm handleCancel={handleCancel} handleSubmit={handleSubmit} deps={deps} />
                </div>
            </PageWrapper>
        </DashboardLayout>
    );
}