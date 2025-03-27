"use client"; // 📌 Necesario para usar Server Actions en el frontend

import { createPatient } from "@/app/actions/patientActions";
import { useActionState, useEffect } from "react";
import { PatientFormComponentInterface, PatientFormDataInterface } from "./PatientFormComponentInterface";

const INITIAL_STATE: PatientFormDataInterface = {
    fields: {
        id: undefined,
        name: "",
        lastname: undefined,
        email: "",
        phone: "",
        address: undefined,
        dob: undefined,
        document: "",
        gender: undefined,
    },
    errors: {
        name: [],
        lastname: [],
        email: [],
        phone: [],
        address: [],
        dob: [],
        document: [],
        gender: [],
    },
    error: "",
};



export default function PatientForm({ handleIsPending, handleCancel }: PatientFormComponentInterface) {

    // 📌 Estado del formulario manejado por Server Actions
    // eslint-disable-next-line @typescript-eslint/no-unused-vars , @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [state, formAction, pending] = useActionState<PatientFormDataInterface>(createPatient, INITIAL_STATE);

    useEffect(() => {
        handleIsPending(pending)
    }, [pending, handleIsPending])




    return (
        <>
            {/* 📌 Mensaje de error global */}
            {state?.error && <p className="text-red-500 mb-4">{state.error}</p>}

            <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Documento */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Documento de identificación</label>
                    <input name="document" type="text" className={`input-field ${state.errors?.document.length ? '!border-red-500' : ''}`} defaultValue={state?.fields?.document || INITIAL_STATE?.fields?.document} />
                    {state?.errors?.document && <p className="text-red-500 text-sm">{state.errors.document}</p>}
                </div>

                {/* Nombre */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input name="name" type="text" className={`input-field ${state.errors?.name.length ? '!border-red-500' : ''}`} defaultValue={state?.fields?.name || INITIAL_STATE?.fields?.name} />
                    {state?.errors?.name && <p className="text-red-500 text-sm">{state.errors.name}</p>}
                </div>

                {/* Apellido */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Apellido</label>
                    <input name="lastname" type="text" className={`input-field ${state.errors?.lastname.length ? '!border-red-500' : ''}`} defaultValue={state?.fields?.lastname || INITIAL_STATE?.fields?.lastname} />
                    {state?.errors?.lastname && <p className="text-red-500 text-sm">{state.errors.lastname}</p>}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                    <input name="email" type="email" className={`input-field ${state.errors?.email.length ? '!border-red-500' : ''}`} defaultValue={state?.fields?.email || INITIAL_STATE?.fields?.email} />
                    {state?.errors?.email && <p className="text-red-500 text-sm">{state.errors.email}</p>}
                </div>

                {/* Teléfono */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                    <input name="phone" type="tel" className={`input-field ${state.errors?.phone.length ? '!border-red-500' : ''}`} defaultValue={state?.fields?.phone || INITIAL_STATE?.fields?.phone} />
                    {state?.errors?.phone && <p className="text-red-500 text-sm">{state.errors.phone}</p>}
                </div>

                {/* Dirección */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Dirección</label>
                    <input name="address" type="text" className={`input-field ${state.errors?.address.length ? '!border-red-500' : ''}`} defaultValue={state?.fields?.address} />
                </div>

                {/* Fecha de nacimiento */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                    <input name="dob" type="date" className={`input-field ${state.errors?.dob.length ? '!border-red-500' : ''}`} defaultValue={state?.fields?.dob || INITIAL_STATE?.fields?.dob} />
                </div>

                {/* Género */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Género</label>
                    <select name="gender" className={`input-field ${state.errors?.gender.length ? '!border-red-500' : ''}`} defaultValue={state?.fields?.gender || INITIAL_STATE?.fields?.gender}>
                        <option value="">Seleccione una opción</option>
                        <option value="male">Masculino</option>
                        <option value="female">Femenino</option>
                        <option value="other">Otro</option>
                    </select>
                </div>

                {/* Botones */}
                <div className="md:col-span-2 flex justify-between mt-4">
                    <button type="button" onClick={handleCancel} className="btn-secondary">
                        Cancelar
                    </button>
                    <button type="submit" className="btn-primary">
                        Crear Paciente
                    </button>
                </div>
            </form>
        </>
    );
}
