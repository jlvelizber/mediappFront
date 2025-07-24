import { DashboardLayout, Loader, MedicalRecordForm, PageWrapper, PatientCard } from "@/app/components";
import { messages } from "@/app/config";
import { PatientInterface } from "@/app/intefaces";
import { useAppointmentStore } from "@/app/store";
import { useEffect, useState } from "react";

export default function MedicalHistory() {
  const TITLE_PAGE = "Cita";
  const { loading: { fetching }, } = messages.appointment;
  const [messageOnLoader, setMessageOnLoader] = useState<string>(fetching);
  const [titlePage, setTitlePage] = useState<string>(TITLE_PAGE);
  const { isLoading, appointmenForAttendId } = useAppointmentStore();
  const [deps, setDeps] = useState<{
    patient: PatientInterface;
  }>({
    patient: {} as unknown as PatientInterface,
  });

  const loadDependencies = async () => {
    // setIsLoading(true);
    Promise.all([
      // getPatientsByDoctorInSession(),
    ]).then((res) => {
      setDeps({
        patient: {} as unknown as PatientInterface,
      });

      // setIsLoading(false);
    })
  }

  useEffect(() => {
    setTitlePage(TITLE_PAGE);
    loadDependencies();
    return () => {
      setTitlePage("");
    };
  }, []);



  const onHandleCancel = () => {
    // Aquí puedes implementar la lógica para manejar la cancelación
    // Por ejemplo, redirigir a otra página o cerrar un modal
  };

  const onHandleSubmit = async (formData: FormData) => {
    // Aquí puedes implementar la lógica para manejar el envío del formulario
    // Por ejemplo, enviar los datos a una API o actualizar el estado de la aplicación
    console.log("Form data submitted:", formData);
  };

  if (isLoading) return <Loader message={messageOnLoader} />
  return (
    <DashboardLayout>
      <PageWrapper>
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold mb-4">Citas médicas - {titlePage}</h1>
          </div>
          <PatientCard />
          <MedicalRecordForm handleCancel={onHandleCancel} handleSubmit={onHandleSubmit} deps={deps} />
        </div></PageWrapper>
    </DashboardLayout>
  )
}
