export const messages = {
    patient: {
        created: "Paciente creado correctamente",
        updated: "Paciente actualizado correctamente",
        deleted: "Paciente eliminado correctamente",
        error: {
            notFound: "Paciente no encontrado",
            invalidData: "Datos inválidos",
            serverError: "Error del servidor",
            unknownError: "Error desconocido",
        },
        loading: {
            creating: "Creando paciente...",
            updating: "Actualizando paciente...",
            deleting: "Eliminando paciente...",
            fetching: "Cargando paciente...",
            fetchingList: "Cargando lista de pacientes...",
        },
    },
    appointment: {
        created: "Cita creada correctamente",
        medicalRecordCreated: "Historial médico creado correctamente",
        updated: "Cita actualizada correctamente",
        deleted: "Cita eliminada correctamente",
        error: {
            notFound: "Cita no encontrada",
            invalidData: "Datos inválidos",
            serverError: "Error del servidor",
            unknownError: "Error desconocido",
        },
        loading: {
            creating: "Creando cita...",
            updating: "Actualizando cita...",
            deleting: "Eliminando cita...",
            fetching: "Cargando cita...",
            fetchingList: "Cargando lista de citas...",
        },
        confirmation: {
            title: "Confirmar finalización de cita",
            message: "Una vez guardada, la cita pasará a estado 'Completada' y se enviarán las notificaciones correspondientes al paciente. Esta acción no se puede deshacer.",
            confirmText: "Sí, guardar y enviar",
            cancelText: "Cancelar",
        }
    },
    dashboard: {
        loading: "Cargando datos"
    }
};