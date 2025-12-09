import { AppointmentList, DeleteConfirmation, EmptyState, Loader, PageWrapper, Paginator, Tabs } from "@/app/components";
import AppointmentCalendar from "@/app/components/AppointmentCalendar/AppointmentCalendar";
import { DashboardLayout } from "@/app/components/Layouts";
import { messages } from "@/app/config";
import { useLayout } from "@/app/context";
import { useAuth } from "@/app/context/AuthContext";
import { AppointmentListItemInterface, Meta } from "@/app/intefaces";
import { routeNames } from "@/app/routes";
import { AppointmentService } from "@/app/services";
import { useAppointmentStore, useToastStore } from "@/app/store";
import { PlusIcon } from "@primer/octicons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent, useEffect, useState } from "react";

export default function AppointmentsPage() {
    const TITLE_PAGE = "Citas médicas";
    const DEFAULT_NUM_PAGE = 1;
    const { loading: { fetchingList, deleting }, deleted: deletedMessage } = messages.appointment
    const { setTitlePage } = useLayout();
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [messageOnLoader, setMessageOnLoader] = useState<string>(fetchingList);
    const [hasDataInFirstFetch, setHasDataInFirstFetch] = useState<boolean>(true);
    const [fetchingOnTable, setFetchingOnTable] = useState<boolean>(false);
    const [appointments, setAppointments] = useState<AppointmentListItemInterface[]>([]);
    const [findWassSuccess, setFindWassSuccess] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");
    const [flowDelete, setFlowDelete] = useState<{ isOpenDeleteConfirmation: boolean, appId: number }>({
        isOpenDeleteConfirmation: false,
        appId: 0
    });
    const [meta, setMeta] = useState<Meta>();
    const { removeAppointment, isLoading, setIsLoading, mustUpdateList } = useAppointmentStore();
    const { addToast } = useToastStore();
    const [activeTab, setActiveTab] = useState<"list" | "calendar">("list");


    useEffect(() => {
        if (appointments.length === 0) {
            setHasDataInFirstFetch(false)
        } else {
            setHasDataInFirstFetch(true)
        }
    }, [loading, appointments.length])


    useEffect(() => {
        setTitlePage(TITLE_PAGE);
        loadAppointments();
    }, []);

    useEffect(() => {
        if (!search && appointments.length < 1) {
            loadAppointments(DEFAULT_NUM_PAGE, true)
        } else {
            filterQueryAppointments()
        }

    }, [search])

    useEffect(() => {
        if (!findWassSuccess) {
            loadAppointments(DEFAULT_NUM_PAGE, true);
        }
    }, [findWassSuccess])

    useEffect(() => {
        if (mustUpdateList) {
            loadAppointments(DEFAULT_NUM_PAGE, true);
        }
    }, [mustUpdateList])


    const handleEdit = (e: MouseEvent<HTMLButtonElement>, appId: number) => {
        e.preventDefault()
        router.push(`/${user?.role}${routeNames.appointments}/edit/${appId}`)
    }

    // attend appointment
    const attendAppointment = (appointmenForAttendId: number) => {
        if (!appointmenForAttendId) return;
        router.push(`/${user?.role}${routeNames.appointments}/${appointmenForAttendId}/medical-record`);
    }


    const onClickEvent = (event: AppointmentListItemInterface) => {
        console.log("Evento seleccionado:", event);
        router.push(`/${user?.role}${routeNames.appointments}/edit/${event.id}`);
    }

    const loadAppointments = async (page?: number, onTable?: boolean) => {
        try {
            if (!onTable) {
                setLoading(true);
                setIsLoading(true);
            } else {
                setFetchingOnTable(true)
            }
            const { data, meta } = await AppointmentService.listMyAppointmentsByDoctor(page, search);
            setAppointments(data);
            setMeta(meta);
        } catch (error) {
            console.error("Error fetching availability", error);
        } finally {
            if (!onTable) {
                setLoading(false);
                setIsLoading(false);
            } else {
                setFetchingOnTable(false)
            }
        }
    };

    const filterQueryAppointments = async () => {
        const filtered = appointments.filter(
            (filtered) =>
                filtered.patient.toLowerCase().includes(search.toLowerCase())
        );
        setAppointments(filtered);

        if (!filtered.length) {
            setFindWassSuccess(false)
        } else {
            setFindWassSuccess(true);
        }
    }

    const paginateAppointmentsOnTable = async (page: number) => await loadAppointments(page, true)


    /**
     * HANDLE REMOVE PATIENT 
     */

    const handleCloseDeleteConfirmation = () => {
        setFlowDelete({
            isOpenDeleteConfirmation: false,
            appId: 0
        });
    }

    const handleRemove = (e: MouseEvent<HTMLButtonElement>, appId: number) => {
        e.preventDefault()
        setFlowDelete({
            isOpenDeleteConfirmation: true,
            appId
        });
    }

    const handleConfirmDelete = async () => {
        const { appId } = flowDelete;
        setMessageOnLoader(deleting);
        handleCloseDeleteConfirmation();
        await removeAppointment(appId);
        await loadAppointments(DEFAULT_NUM_PAGE, true);
        addToast(deletedMessage, "success");
    };

    const handleView = (e: MouseEvent<HTMLButtonElement>, appId: number, medicalRecordId: number | null) => {
        e.preventDefault()
        router.push(`/${user?.role}${routeNames.appointments}/${appId}/medical-record/${medicalRecordId}/show`);
    }


    if (loading || isLoading) return <Loader message={messageOnLoader} />
    return (
        <>
            <DeleteConfirmation entityName="Cita" isOpen={flowDelete.isOpenDeleteConfirmation} onClose={handleCloseDeleteConfirmation} onConfirm={handleConfirmDelete} />

            <DashboardLayout>
                <PageWrapper>
                    <div className="container mx-auto p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-bold mb-4">{TITLE_PAGE}</h1>
                            {/* 🔹 Botón SIEMPRE visible */}
                            <Link href={`/${user?.role}/appointments/create`}>
                                <button className="btn-primary">
                                    <PlusIcon className="w-5 h-5 mr-2" />
                                    Agregar Cita
                                </button>
                            </Link>
                        </div>
                        {!hasDataInFirstFetch ? (
                            <EmptyState />
                        ) : (
                            <>
                                <Tabs
                                    tabs={[
                                        { label: "Listado", value: "list" },
                                        { label: "Calendario", value: "calendar" },
                                    ]}
                                    active={activeTab}
                                    onChange={(value) => setActiveTab(value as "list" | "calendar")}
                                />
                                {activeTab === "list" && (
                                    <>
                                        <input
                                            type="text"
                                            placeholder="Buscar cita..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                                        />
                                        <AppointmentList items={appointments} fetching={fetchingOnTable} actions={{ onEdit: handleEdit, onRemove: handleRemove, onAttendAppointment: attendAppointment, onView: handleView }} />
                                        {meta && <Paginator meta={meta} onPageChange={paginateAppointmentsOnTable} />}
                                    </>
                                )}
                                {activeTab === "calendar" && (
                                    // Aquí podrías implementar la vista de calendario
                                    <AppointmentCalendar handleSelectEvent={(event: unknown) => onClickEvent(event as AppointmentListItemInterface)} />
                                )}
                            </>
                        )}
                    </div>
                </PageWrapper>
            </DashboardLayout>
        </>)
}
