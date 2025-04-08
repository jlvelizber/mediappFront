import { AppointmentList, DeleteConfirmation, EmptyState, Loader, PageWrapper, Paginator } from "@/app/components";
import { DashboardLayout } from "@/app/components/Layouts";
import { messages } from "@/app/config";
import { useLayout } from "@/app/context";
import { useAuth } from "@/app/context/AuthContext";
import { AppointmentListItemInterface, Meta } from "@/app/intefaces";
import { routeNames } from "@/app/routes";
import { AppointmentService } from "@/app/services";
import { PlusIcon } from "@primer/octicons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent, useEffect, useState } from "react";

export default function AppointmentsPage() {
    const TITLE_PAGE = "Citas médicas";
    const DEFAULT_NUM_PAGE = 1;
    const { loading: { fetchingList, deleting } } = messages.appointment
    const { setTitlePage } = useLayout();
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [messageOnLoader, setMessageOnLoader] = useState<string>(fetchingList);
    const [hasDataInFirstFetch, setHasDataInFirstFetch] = useState<boolean>(true);
    const [fetchingOnTable, setFetchingOnTable] = useState<boolean>(false);
    const [appointments, setAppointments] = useState<AppointmentListItemInterface[]>([]);
    const [search, setSearch] = useState<string>("");
    const [flowDelete, setFlowDelete] = useState<{ isOpenDeleteConfirmation: boolean, appId: number }>({
        isOpenDeleteConfirmation: false,
        appId: 0
    });
    const [meta, setMeta] = useState<Meta>();

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


    const handleEdit = (e: MouseEvent<HTMLButtonElement>, appId: number) => {
        e.preventDefault()
        router.push(`/${user?.role}${routeNames.appointments}/edit/${appId}`)
    }

    const loadAppointments = async (page?: number, onTable?: boolean) => {
        try {
            if (!onTable) {
                setLoading(true);
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
            } else {
                setFetchingOnTable(false)
            }
        }
    };

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
        // const { appId } = flowDelete;
        setMessageOnLoader(deleting);
        handleCloseDeleteConfirmation();
        // await removePatient(appId);
        await loadAppointments(DEFAULT_NUM_PAGE, true);
    };


    if (loading) return <Loader message={messageOnLoader} />
    return (
        <>
            <DeleteConfirmation entityName="Paciente" isOpen={flowDelete.isOpenDeleteConfirmation} onClose={handleCloseDeleteConfirmation} onConfirm={handleConfirmDelete} />

            <DashboardLayout>
                <PageWrapper>
                    <div className="container mx-auto p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-bold mb-4">{TITLE_PAGE}</h1>
                            {/* 🔹 Botón SIEMPRE visible */}
                            <Link href={`/${user?.role}/patients/create`}>
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
                                <input
                                    type="text"
                                    placeholder="Buscar cita..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                                />
                                <AppointmentList items={appointments} fetching={fetchingOnTable} actions={{ onEdit: handleEdit, onRemove: handleRemove }} />
                                {meta && <Paginator meta={meta} onPageChange={paginateAppointmentsOnTable} />}
                            </>
                        )}
                    </div>
                </PageWrapper>
            </DashboardLayout>
        </>)
}
