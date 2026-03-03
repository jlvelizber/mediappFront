import { DashboardLayout, Loader, PageWrapper } from "@/app/components";
import { useLayout } from "@/app/context";
import { DoctorSettingsData, DoctorSettingsService } from "@/app/services";
import { useToastStore } from "@/app/store";
import { FormEvent, useEffect, useState } from "react";

export default function DoctorSettingsPage() {
    const TITLE_PAGE = "Configuración";
    const { setTitlePage } = useLayout();
    const { addToast } = useToastStore();
    const [loading, setLoading] = useState<boolean>(true);
    const [saving, setSaving] = useState<boolean>(false);
    const [settings, setSettings] = useState<DoctorSettingsData>({
        default_appointment_duration: 20,
        default_appointment_price: 0,
        currency_default_appointment: "USD",
        currency_symbol_default_appointment: "$",
        way_notify_appointment: "both",
        reminder_hour_appointment: 24,
        medical_center_name: "",
        medical_center_address: "",
        medical_center_phone: "",
    });

    useEffect(() => {
        setTitlePage(TITLE_PAGE);
        loadSettings();
        return () => setTitlePage("");
    // eslint-disable-next-line react-hooks/exhaustive-deps -- initialize settings only on mount
    }, []);

    const loadSettings = async () => {
        try {
            setLoading(true);
            const data = await DoctorSettingsService.getSettings();
            setSettings((prev) => ({ ...prev, ...data }));
        } catch (error) {
            console.error("Error loading doctor settings:", error);
            addToast("No se pudo cargar la configuración.", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field: keyof DoctorSettingsData, value: string | number) => {
        setSettings((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setSaving(true);
            const updated = await DoctorSettingsService.updateSettings(settings);
            setSettings((prev) => ({ ...prev, ...updated }));
            addToast("Configuración actualizada correctamente.", "success");
        } catch (error) {
            console.error("Error updating doctor settings:", error);
            addToast("No se pudo actualizar la configuración.", "error");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <Loader message="Cargando configuración..." />;

    return (
        <DashboardLayout>
            <PageWrapper>
                <div className="container mx-auto p-4">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <section className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-primary mb-4">Agenda</h2>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Duración por cita (minutos)</label>
                                <input
                                    type="number"
                                    min={5}
                                    className="w-full md:w-64 border border-gray-300 rounded-md px-3 py-2"
                                    value={settings.default_appointment_duration}
                                    onChange={(e) => handleChange("default_appointment_duration", Number(e.target.value))}
                                />
                            </div>
                        </section>

                        <section className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-primary mb-4">Consulta</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Precio base</label>
                                    <input
                                        type="number"
                                        min={0}
                                        step="0.01"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        value={settings.default_appointment_price}
                                        onChange={(e) => handleChange("default_appointment_price", Number(e.target.value))}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Moneda</label>
                                    <input
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        value={settings.currency_default_appointment}
                                        onChange={(e) => handleChange("currency_default_appointment", e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Símbolo de moneda</label>
                                    <input
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        value={settings.currency_symbol_default_appointment}
                                        onChange={(e) => handleChange("currency_symbol_default_appointment", e.target.value)}
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-primary mb-4">Notificaciones</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Canal de envío</label>
                                    <select
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        value={settings.way_notify_appointment}
                                        onChange={(e) => handleChange("way_notify_appointment", e.target.value as DoctorSettingsData["way_notify_appointment"])}
                                    >
                                        <option value="both">Email + WhatsApp</option>
                                        <option value="email">Solo Email</option>
                                        <option value="whatsapp">Solo WhatsApp</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Recordatorio (horas antes)</label>
                                    <input
                                        type="number"
                                        min={1}
                                        max={168}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        value={settings.reminder_hour_appointment}
                                        onChange={(e) => handleChange("reminder_hour_appointment", Number(e.target.value))}
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-primary mb-4">Consultorio</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del consultorio</label>
                                    <input
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        value={settings.medical_center_name ?? ""}
                                        onChange={(e) => handleChange("medical_center_name", e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono del consultorio</label>
                                    <input
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        value={settings.medical_center_phone ?? ""}
                                        onChange={(e) => handleChange("medical_center_phone", e.target.value)}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Dirección del consultorio</label>
                                    <input
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        value={settings.medical_center_address ?? ""}
                                        onChange={(e) => handleChange("medical_center_address", e.target.value)}
                                    />
                                </div>
                            </div>
                        </section>

                        <button type="submit" className="btn-primary disabled:opacity-50" disabled={saving}>
                            {saving ? "Guardando..." : "Guardar configuración"}
                        </button>
                    </form>
                </div>
            </PageWrapper>
        </DashboardLayout>
    );
}
