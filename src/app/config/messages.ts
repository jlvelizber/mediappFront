export const messages = {
    common: {
        actions: {
            cancel: "Cancelar",
            back: "Regresar",
            save: "Guardar",
            delete: "Eliminar",
            create: "Crear",
            update: "Actualizar",
            add: "Añadir",
            saving: "Guardando...",
            updating: "Actualizando...",
        },
        form: {
            /** Sufijo opcional cuando el campo tiene error de validación (ver `formFieldLabel`) */
            invalidLabelSuffix: "(revisa la información)",
            selectOption: "Seleccione una opción",
            selectPatient: "Seleccione un paciente",
        },
    },

    navigation: {
        desk: "Escritorio",
        agenda: "Agenda",
        patients: "Pacientes",
        settings: "Configuración",
    },

    login: {
        title: "Iniciar sesión",
        labels: {
            email: "Correo electrónico",
            password: "Contraseña",
        },
        placeholders: {
            email: "Ingresa tu correo",
            password: "••••••••",
        },
        submit: "Iniciar sesión",
        forgotPassword: "¿Olvidaste tu contraseña?",
        loading: {
            signingIn: "Iniciando sesión",
        },
    },

    deleteConfirmation: {
        title: "Eliminar {entity}",
        messageBeforeEntity: "¿Estás seguro de que deseas eliminar ",
        messageAfterEntity: "? Esta acción no se puede deshacer.",
    },

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
        labels: {
            document: "Documento de identificación",
            name: "Nombre",
            lastname: "Apellido",
            email: "Correo electrónico",
            phone: "Teléfono",
            address: "Dirección",
            dob: "Fecha de nacimiento",
            gender: "Género",
        },
        actions: {
            deletePatient: "Eliminar paciente",
            submitCreate: "Crear paciente",
            submitUpdate: "Actualizar paciente",
        },
        pages: {
            listTitle: "Pacientes",
            createTitle: "Crear paciente",
            editTitle: "Editar paciente",
            listWithAction: "Pacientes — {action}",
            addButton: "Agregar paciente",
            searchPlaceholder: "Buscar paciente...",
        },
        entityName: "Paciente",
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
            message:
                "Una vez guardada, la cita pasará a estado 'Completada' y se enviarán las notificaciones correspondientes al paciente. Esta acción no se puede deshacer.",
            confirmText: "Sí, guardar y enviar",
            cancelText: "Cancelar",
        },
        labels: {
            patient: "Paciente",
            dateTime: "Fecha y hora",
            status: "Estado",
            reason: "Motivo de la cita",
        },
        status: {
            pending: "Pendiente",
            confirmed: "Confirmada",
            cancelled: "Cancelada",
        },
        actions: {
            deleteAppointment: "Eliminar cita",
            submitCreate: "Crear cita",
            submitUpdate: "Actualizar cita",
        },
        pages: {
            createTitle: "Crear cita",
            editTitle: "Editar cita",
            listWithAction: "Citas médicas — {action}",
        },
        entityName: "Cita",
    },

    medicalRecord: {
        labels: {
            symptoms: "Síntomas",
            diagnosis: "Diagnóstico",
            treatment: "Tratamiento",
            notes: "Notas adicionales",
            prescriptionSection: "Receta médica",
            prescriptionNotes: "Notas de la receta",
        },
        placeholders: {
            symptoms: "Describe los síntomas del paciente...",
            diagnosis: "Ingresa el diagnóstico clínico...",
            treatment: "Describe el tratamiento indicado...",
            notes: "Ingresa notas adicionales...",
        },
        actions: {
            addMedication: "+ Añadir medicamento",
            cancel: "Cancelar",
            save: "Guardar",
        },
    },

    prescription: {
        placeholders: {
            medication: "Medicamento",
            dosage: "Dosis",
            frequency: "Frecuencia",
            duration: "Duración",
            notes: "Notas",
        },
    },

    settings: {
        pageTitle: "Configuración",
        loading: "Cargando configuración...",
        tabs: {
            basic: "Configuración básica",
            availability: "Disponibilidad y horario",
        },
        sections: {
            agenda: "Agenda",
            consultation: "Consulta",
            notifications: "Notificaciones",
            office: "Consultorio",
            schedule: "Horario de atención",
            registeredAvailability: "Disponibilidades registradas",
        },
        labels: {
            durationPerAppointment: "Duración por cita (minutos)",
            basePrice: "Precio base",
            currency: "Moneda",
            currencySymbol: "Símbolo de moneda",
            notificationChannel: "Canal de envío",
            reminderHoursBefore: "Recordatorio (horas antes)",
            officeName: "Nombre del consultorio",
            officePhone: "Teléfono del consultorio",
            officeAddress: "Dirección del consultorio",
            dayOfCare: "Día de atención",
            startTime: "Hora inicio",
            endTime: "Hora fin",
        },
        notificationChannel: {
            both: "Correo + WhatsApp",
            email: "Solo correo",
            whatsapp: "Solo WhatsApp",
        },
        buttons: {
            saveSettings: "Guardar configuración",
            savingSettings: "Guardando...",
            addSchedule: "Agregar horario",
        },
        hints: {
            scheduleIntro:
                "Define aquí los bloques de tiempo en los que atiendes pacientes. Puedes agregar varios horarios por día.",
            endAfterStart: "La hora de fin debe ser posterior a la hora de inicio.",
            noSchedulesYet:
                "Aún no tienes horarios configurados. Agrega tu primer bloque arriba.",
        },
        availabilityCount: {
            one: "horario activo",
            many: "horarios activos",
        },
        loadingAvailabilities: "Actualizando horarios...",
        toast: {
            loadSettingsError: "No se pudo cargar la configuración.",
            loadAvailabilityError: "No se pudo cargar el horario.",
            updateSuccess: "Configuración actualizada correctamente.",
            updateError: "No se pudo actualizar la configuración.",
            availabilitySaved: "Horario guardado correctamente.",
            availabilitySaveError: "No se pudo guardar el horario.",
            availabilityDeleted: "Horario eliminado correctamente.",
            availabilityDeleteError: "No se pudo eliminar el horario.",
        },
    },

    profile: {
        pageTitle: "Mi perfil",
        loading: {
            profile: "Cargando perfil...",
            savingProfile: "Guardando perfil...",
            savingPassword: "Actualizando contraseña...",
        },
        headings: {
            professional: "Mi perfil profesional",
            subtitle:
                "Actualiza tus datos personales y profesionales del consultorio.",
            profileData: "Datos del perfil",
            changePassword: "Cambiar contraseña",
        },
        labels: {
            name: "Nombre",
            lastname: "Apellido",
            email: "Correo electrónico",
            phone: "Teléfono",
            specialization: "Especialidad",
            currentPassword: "Contraseña actual",
            newPassword: "Nueva contraseña",
            confirmPassword: "Confirmar contraseña",
        },
        buttons: {
            saveProfile: "Guardar perfil",
            savingProfile: "Guardando...",
            updatePassword: "Actualizar contraseña",
            updatingPassword: "Actualizando...",
        },
        toast: {
            loadError: "No se pudo cargar el perfil.",
            updateSuccess: "Perfil actualizado correctamente.",
            updateError: "No se pudo actualizar el perfil.",
            passwordMismatch: "La confirmación de contraseña no coincide.",
            passwordUpdateError: "No se pudo actualizar la contraseña.",
        },
    },

    dashboard: {
        loading: "Cargando panel del consultorio...",
        recentAppointments: "Citas recientes",
    },

    setup: {
        appNameFallback: "Mediapp",
        title: "Configuración inicial",
        loading: {
            configuring: "Configurando instalación inicial",
            completing: "Completando instalación...",
            verifyingInstallation: "Verificando instalación...",
        },
        success: {
            completedRedirect:
                "Instalación completada. Redirigiendo al inicio de sesión...",
        },
        error: {
            generic: "No se pudo completar la instalación inicial.",
        },
        sections: {
            doctorAdmin: "Doctor administrador",
            medicalCenter: "Centro médico",
            appointmentDefaults: "Configuración inicial de consulta",
        },
        placeholders: {
            adminName: "Nombre",
            adminLastname: "Apellido",
            adminEmail: "Correo",
            adminPhone: "Teléfono (opcional)",
            adminPassword: "Contraseña",
            adminPasswordConfirm: "Confirmar contraseña",
            doctorSpecialization: "Especialidad (opcional)",
            medicalCenterName: "Nombre del centro médico",
            medicalCenterAddress: "Dirección (opcional)",
            medicalCenterPhone: "Teléfono (opcional)",
            medicalCenterEmail: "Correo (opcional)",
            defaultDuration: "Duración por defecto (min)",
            defaultPrice: "Precio por defecto",
            currency: "Moneda (ej. USD)",
            currencySymbol: "Símbolo de moneda (ej. $)",
            reminderHours: "Recordatorio en horas",
        },
        notificationWay: {
            both: "Correo y WhatsApp",
            email: "Solo correo",
            whatsapp: "Solo WhatsApp",
        },
        submit: "Completar instalación",
    },
};

/** Reemplazo simple para textos con marcador `{entity}` */
export function formatMessage(
    template: string,
    vars: Record<string, string>
): string {
    let out = template;
    for (const [key, value] of Object.entries(vars)) {
        out = out.replaceAll(`{${key}}`, value);
    }
    return out;
}
