"use client"; // 📌 Necesario para usar Server Actions en el frontend

import { createPatient } from "@/app/actions/patientActions";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { PatientFormComponentInterface } from "./PatientFormComponentInterface";

const INITIAL_STATE = {
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



export default function PatientForm({ handleIsPending }: PatientFormComponentInterface) {
    const router = useRouter();

    // 📌 Estado del formulario manejado por Server Actions
    const [state, formAction, pending] = useActionState(createPatient, INITIAL_STATE);

    useEffect(() => {

        console.log(pending)
        // handleIsPending(pending)
    }, [pending])


    return (
        <>
            {/* 📌 Mensaje de error global */}
            {state?.error && <p className="text-red-500 mb-4">{state.error}</p>}

            <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Documento */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Documento de identificación</label>
                    <input name="document" type="text" className="input-field" />
                    {state?.errors?.document && <p className="text-red-500 text-sm">{state.errors.document}</p>}
                </div>

                {/* Nombre */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input name="name" type="text" className="input-field" />
                    {state?.errors?.name && <p className="text-red-500 text-sm">{state.errors.name}</p>}
                </div>

                {/* Apellido */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Apellido</label>
                    <input name="lastname" type="text" className="input-field" />
                    {state?.errors?.lastname && <p className="text-red-500 text-sm">{state.errors.lastname}</p>}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                    <input name="email" type="email" className="input-field" />
                    {state?.errors?.email && <p className="text-red-500 text-sm">{state.errors.email}</p>}
                </div>

                {/* Teléfono */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                    <input name="phone" type="tel" className="input-field" />
                    {state?.errors?.phone && <p className="text-red-500 text-sm">{state.errors.phone}</p>}
                </div>

                {/* Dirección */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Dirección</label>
                    <input name="address" type="text" className="input-field" />
                </div>

                {/* Fecha de nacimiento */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                    <input name="dob" type="date" className="input-field" />
                </div>

                {/* Género */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Género</label>
                    <select name="gender" className="input-field">
                        <option value="">Seleccione una opción</option>
                        <option value="male">Masculino</option>
                        <option value="female">Femenino</option>
                        <option value="other">Otro</option>
                    </select>
                </div>

                {/* Botones */}
                <div className="md:col-span-2 flex justify-between mt-4">
                    <button type="button" onClick={() => router.push("/patients")} className="btn-secondary">
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
