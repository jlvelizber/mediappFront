import { ConfirmationModal, DashboardLayout, Loader, MedicalRecordForm, PageWrapper, PatientCard } from "@/app/components";
import { messages } from "@/app/config";
import { PatientInterface } from "@/app/intefaces";
import { useAppointmentStore, useMedicalRecordStore, usePatientStore } from "@/app/store";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function MedicalHistory() {
  const TITLE_PAGE = "Cita";
  const { loading: { fetching }, confirmation: confirmationMessagesModal } = messages.appointment;
  const [isOpenAlert, setIsOpenAlert] = useState<boolean>(false);
  const [formDataOnState, setFormDataOnState] = useState<FormData>(new FormData());
  const [messageOnLoader, setMessageOnLoader] = useState<string>(fetching);
  const [titlePage, setTitlePage] = useState<string>(TITLE_PAGE);
  const { isLoading, setIsLoading } = useAppointmentStore();
  const { getPatientBasedOnAppointment } = usePatientStore();
  const { isLoading: loadingMedicalRecord, addMedicalRecord } = useMedicalRecordStore()
  const [patient, setPatient] = useState<PatientInterface>({} as PatientInterface);
  const params = useParams<{ id: string }>();


  const loadDependencies = async () => {
    setIsLoading(true);
    Promise.all([
      getPatientBasedOnAppointment(params ? params?.id : ""),
    ]).then((res) => {
      if (!res) {
        setMessageOnLoader("No se encontró el paciente asociado a la cita");
      }
      setPatient(res[0] as PatientInterface);

      setIsLoading(false);
    })
  }

  useEffect(() => {
    setTitlePage(TITLE_PAGE);
    loadDependencies();
    return () => {
      setTitlePage("");
    };
  }, [params?.id]);



  const onHandleCancel = () => {
    // redirect to the appointments page

  };

  const onHandleSubmit = (formData: FormData) => {
    setIsOpenAlert(true);
    formData.append("appointment_id", String(params?.id));
    setFormDataOnState(formData);
  };

  /**
   * Handles the confirmation of adding a medical record.
   * It sets the alert to closed and calls the addMedicalRecord function with the form data
   */
  const handleConfirmAddMedicalRecord = async () => {
    setIsOpenAlert(false);
    await addMedicalRecord(formDataOnState)
  };

  if (isLoading || loadingMedicalRecord) return <Loader message={messageOnLoader} />
  return (
    <DashboardLayout>
      <PageWrapper>
        {/* Confirmation modal */}
        <ConfirmationModal isOpen={isOpenAlert}
          onConfirm={handleConfirmAddMedicalRecord}
          title={confirmationMessagesModal.title}
          message={confirmationMessagesModal.message}
          confirmText={confirmationMessagesModal.confirmText}
          cancelText={confirmationMessagesModal.cancelText}
          onCancel={() => setIsOpenAlert(false)} />

        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold mb-4">Citas médicas - {titlePage}</h1>
          </div>
          <PatientCard patient={patient} />
          <MedicalRecordForm handleCancel={onHandleCancel} handleSubmit={onHandleSubmit} />
        </div></PageWrapper>
    </DashboardLayout>
  )
}
