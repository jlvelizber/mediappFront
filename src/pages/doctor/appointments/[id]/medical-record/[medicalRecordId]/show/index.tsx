import { DashboardLayout, Loader, MedicalRecordForm, MedicalRecordFormDataInterface, PageWrapper, PatientCard } from "@/app/components";
import { useAuth } from "@/app/context";
import { AppointmentInterface, PatientInterface } from "@/app/intefaces";
import { routeNames } from "@/app/routes";
import { useAppointmentStore } from "@/app/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MedicalHistory() {
  const TITLE_PAGE = "Cita atendida";
  const [messageOnLoader, setMessageOnLoader] = useState<string>("Cargando...");
  const [titlePage, setTitlePage] = useState<string>(TITLE_PAGE);
  const [appointment, setAppointment] = useState<AppointmentInterface | null>(null);
  // const [patient, setPatient] = useState<PatientInterface | null>(null);
  // const { isLoading, setIsLoading, showDetailMedicalRecord } = useMedicalRecordStore();
  const { getAppointment, isLoading, setIsLoading } = useAppointmentStore();
  // const { getPatientBasedOnAppointment } = usePatientStore();
  const params = useParams<{ id: string; medicalRecordId: string }>();
  const router = useRouter();
  const { user } = useAuth();

  const loadDependencies = async () => {
    if (!params?.id || !params?.medicalRecordId) {
      setMessageOnLoader("Parámetros de la ruta no válidos");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setMessageOnLoader("Cargando datos de la cita...");
    try {
      const [appointmentData] = await Promise.all([
        getAppointment(Number(params.id)),
        // getPatientBasedOnAppointment(params.id),
        // showDetailMedicalRecord(params.medicalRecordId),
      ]);
      if (appointmentData) {
        setAppointment(appointmentData);
        const dateTime = appointmentData.date_time ? new Date(appointmentData.date_time) : null;
        if (dateTime) setTitlePage(`Cita del ${dateTime.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}`);
      }
      // if (patientData) setPatient(patientData);
      // if (!medicalRecordData) {
      //   setMessageOnLoader("No se encontró el expediente médico asociado a la cita");
      // }
    } catch {
      setMessageOnLoader("No se pudo cargar la información de la cita");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDependencies();
    return () => setTitlePage("");
  // eslint-disable-next-line react-hooks/exhaustive-deps -- load only when route params change
  }, [params?.id, params?.medicalRecordId]);

  const onHandleCancel = () => {
    router.push(`/${user?.role}${routeNames.appointments}`);
  };

  const medicalRecordFormData: MedicalRecordFormDataInterface = {
    fields: {
      id: appointment?.medical_record?.id,
      appointment_id: appointment?.medical_record?.appointment_id ?? appointment?.id ?? null,
      symptoms: appointment?.medical_record?.symptoms ?? "",
      diagnosis: appointment?.medical_record?.diagnosis ?? "",
      treatment: appointment?.medical_record?.treatment ?? "",
      notes: appointment?.medical_record?.notes ?? "",
      prescription: {
        appointment_id: appointment?.prescription?.appointment_id ?? appointment?.id ?? null,
        notes: appointment?.prescription?.notes ?? "",
        items: appointment?.prescription?.items ?? [],
      },
    },
    errors: {},
    error: "",
  };

  if (isLoading) return <Loader message={messageOnLoader} />;

  return (
    <DashboardLayout>
      <PageWrapper>
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Cita médica atendida{titlePage !== TITLE_PAGE ? ` - ${titlePage}` : ""}</h1>
          </div>

          {/* Datos de la cita */}
          {appointment && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-6">
              <h2 className="text-lg font-semibold text-primary mb-2">📅 Datos de la cita</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
                <div>
                  <strong>Fecha y hora:</strong>{" "}
                  {appointment.date_time
                    ? new Date(appointment.date_time).toLocaleString("es-ES", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })
                    : "—"}
                </div>
                <div>
                  <strong>Motivo:</strong> {appointment.reason ?? "—"}
                </div>
                <div>
                  <strong>Estado:</strong> {appointment.status_label ?? appointment.status ?? "—"}
                </div>
              </div>
            </div>
          )}

          {/* Información del paciente */}
          {appointment?.patient && <PatientCard patient={appointment.patient as PatientInterface} />}

          {/* Expediente médico */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-primary mb-2">📋 Expediente médico</h2>
            <MedicalRecordForm
              initialData={medicalRecordFormData}
              handleCancel={onHandleCancel}
              onlyViewMode={true}
            />
          </div>
        </div>
      </PageWrapper>
    </DashboardLayout>
  );
}
