import { DashboardLayout, Loader, PageWrapper, PatientHistoryTabs } from "@/app/components";
import { messages } from "@/app/config";
import { usePatientStore } from "@/app/store";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PatientHistory() {
    const TITLE_PAGE = "Historial de";
    const { getPatientHistory, isLoading, setIsLoading } = usePatientStore();
    const [patientName, setPatientName] = useState<string>("");
    const { loading: { fetching } } = messages.patient
    const params = useParams<{ id: string }>();

    useEffect(() => {
        setIsLoading(true);
        getPatientHistory(params?.id as unknown as number).then((patient) => {
            setPatientName(patient?.name ?? "");
            setIsLoading(false);
        });
    }, [params?.id]);


    if (isLoading) return <Loader message={fetching} />
    return (
        <DashboardLayout>
            <PageWrapper>
                <div className="container mx-auto p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold mb-4">Pacientes - {TITLE_PAGE} {patientName}</h1>
                    </div>
                    <PatientHistoryTabs />
                </div>
            </PageWrapper>
        </DashboardLayout>
    )
}
