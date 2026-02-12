import { DashboardLayout, Loader, PageWrapper, PatientCard, PatientHistoryTabs } from "@/app/components";
import { messages } from "@/app/config";
import { useAuth } from "@/app/context";
import { PatientHistoryInterface } from "@/app/intefaces";
import { routeNames } from "@/app/routes";
import { usePatientStore } from "@/app/store";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PatientHistory() {
    const TITLE_PAGE = "Historial de";
    const { user } = useAuth()
    const { getPatientHistory, isLoading, setIsLoading } = usePatientStore();
    const [patientName, setPatientName] = useState<string>("");
    const [patient, setPatient] = useState<PatientHistoryInterface | null>(null);
    const { loading: { fetching } } = messages.patient
    const params = useParams<{ id: string }>();
    const router = useRouter();
    useEffect(() => {
        setIsLoading(true);
        getPatientHistory(params?.id as unknown as number).then((patient) => {
            setPatientName(patient?.name ?? "");
            setPatient(patient as PatientHistoryInterface | null);
            setIsLoading(false);
        });
    }, [params?.id, getPatientHistory, setIsLoading]);

    const handleGoBack = () => {
        router.push(`/${user?.role}${routeNames.patients}`);
    }


    if (isLoading) return <Loader message={fetching} />
    return (
        <DashboardLayout>
            <PageWrapper>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                            {TITLE_PAGE} {patientName}
                        </h1>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Información completa del historial médico del paciente
                        </p>
                    </div>

                    {/* Patient Card */}
                    {patient && (
                        <div className="mb-6">
                            <PatientCard patient={patient} />
                        </div>
                    )}

                    {/* History Tabs */}
                    <div className="bg-white rounded-lg shadow-sm">
                        <PatientHistoryTabs appointments={patient?.appointments} />
                    </div>
                    <div className="flex justify-start mt-4">  
                        <button onClick={() => handleGoBack()} className="btn-secondary">Regresar</button>
                    </div>
                </div>
            </PageWrapper>
        </DashboardLayout>
    )
}
