import { AppointmentForm, DashboardLayout, DeleteConfirmation, Loader, PageWrapper } from "@/app/components";
import { messages } from "@/app/config";
import { useAuth, useLayout } from "@/app/context";
import { PatientInterface } from "@/app/intefaces";
import { routeNames } from "@/app/routes";
import { useAppointmentStore, usePatientStore, useToastStore } from "@/app/store";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { MouseEvent, useEffect, useState } from "react";

export default function CreateAppointment() {
    const TITLE_PAGE = "Editar Cita";
    const { loading: { fetching, updating, deleting }, updated, deleted: deletedMessage } = messages.appointment;
    const router = useRouter();
    const { user } = useAuth();
    const { setTitlePage } = useLayout();
    const { getPatientsByDoctorInSession } = usePatientStore();
    const { isLoading, setIsLoading, resetFormDataAppointment, getAppointmentForEdit, updateAppointment, removeAppointment } = useAppointmentStore();
    const { addToast } = useToastStore();
    const [messageOnLoader, setMessageOnLoader] = useState<string>(fetching);
    const [flowDelete, setFlowDelete] = useState<{ isOpenDeleteConfirmation: boolean, appId: number }>({
        isOpenDeleteConfirmation: false,
        appId: 0
    });
    const [deps, setDeps] = useState<{
        patients: PatientInterface[];
    }>({
        patients: [],
    });
    const params = useParams<{ id: string }>();

    useEffect(() => {
        if (params) {
            // Aquí puedes realizar la lógica para obtener el paciente por ID
            // Por ejemplo, podrías llamar a una función de tu store o hacer una solicitud a la API
            getAppointmentForEdit(params.id as unknown as number);
        }
    }, [params])


    const loadDependencies = async () => {
        setIsLoading(true);
        Promise.all([
            getPatientsByDoctorInSession(),
        ]).then((res) => {
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
        setIsLoading(true)
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
        if (!params) {
            addToast("Error: Invalid appointment ID", "error");
            return;
        }
        setMessageOnLoader(updating);
        const id = params.id as unknown as number;
        const appointmentId = await updateAppointment(id, formData);
        if (appointmentId) {
            goEdit(appointmentId as unknown as string);
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
        await removeAppointment(appId);
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

    if (isLoading || isLoading) return <Loader message={messageOnLoader} />

    return (
        <>
            <DeleteConfirmation entityName="Cita" isOpen={flowDelete.isOpenDeleteConfirmation} onClose={handleCloseDeleteConfirmation} onConfirm={handleConfirmDelete} />
            <DashboardLayout>
                <PageWrapper>
                    <div className="container mx-auto p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-bold mb-4">Citas médicas - {TITLE_PAGE}</h1>
                        </div>
                        {!isLoading && <AppointmentForm handleCancel={handleCancel} handleSubmit={handleSubmit} handleDelete={handleRemove} deps={deps} />}

                    </div>
                </PageWrapper>
            </DashboardLayout>
        </>
    );
}