import { DashboardLayout, Loader, PageWrapper } from "@/app/components";
import { messages } from "@/app/config";
import { useAppointmentStore } from "@/app/store";
import { useState } from "react";

export default function MedicalHistory() {
  const TITLE_PAGE = "Cita";
  const { loading: { fetching }, } = messages.appointment;

  const [messageOnLoader, setMessageOnLoader] = useState<string>(fetching);
  const { isLoading } = useAppointmentStore();

  if (isLoading) return <Loader message={messageOnLoader} />
  return (
    <DashboardLayout>
      <PageWrapper>
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold mb-4">Citas médicas - {TITLE_PAGE}</h1>
          </div>
        </div></PageWrapper>
    </DashboardLayout>
  )
}
