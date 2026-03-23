import { AvailabilityList, DashboardLayout, EmptyState, Loader, PageWrapper, Tabs } from "@/app/components";
import { formFieldLabel, messages } from "@/app/config";
import { useLayout } from "@/app/context";
import { DoctorSettingsData, DoctorSettingsService } from "@/app/services";
import { useToastStore } from "@/app/store";
import type { DoctorAvailabilityInterface } from "@/app/intefaces";
import { AvailabilityService } from "@/app/services";
import { DateUtil } from "@/app/utils";
import { FormEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";

interface AvailabilityFormFields {
    day_of_week: string;
    start_time: string;
    end_time: string;
}

const s = messages.settings;

export default function DoctorSettingsPage() {
    const TITLE_PAGE = s.pageTitle;
    const router = useRouter();
    const { register, handleSubmit, reset, watch } = useForm<AvailabilityFormFields>({
        defaultValues: {
            day_of_week: "monday",
            start_time: "09:00",
            end_time: "13:00",
        },
    });
    const { setTitlePage } = useLayout();
    const { addToast } = useToastStore();
    const [activeTab, setActiveTab] = useState<"basic" | "availability">("basic");
    const [loading, setLoading] = useState<boolean>(true);
    const [saving, setSaving] = useState<boolean>(false);
    const [availabilities, setAvailabilities] = useState<DoctorAvailabilityInterface[]>([]);
    const [loadingAvailability, setLoadingAvailability] = useState<boolean>(false);
    const daysOfWeek = DateUtil.getDaysOfWeekAsObject();
    const watchedStartTime = watch("start_time");
    const watchedEndTime = watch("end_time");
    const hasInvalidRange = Boolean(watchedStartTime && watchedEndTime && watchedEndTime <= watchedStartTime);
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
        void loadSettings();
        void loadAvailabilities();
        return () => setTitlePage("");
    // eslint-disable-next-line react-hooks/exhaustive-deps -- initialize settings only on mount
    }, []);

    useEffect(() => {
        if (!router.isReady) return;
        if (router.query.tab === "availability") {
            setActiveTab("availability");
            return;
        }
        setActiveTab("basic");
    }, [router.isReady, router.query.tab]);

    const loadSettings = async (): Promise<void> => {
        try {
            setLoading(true);
            const data = await DoctorSettingsService.getSettings();
            setSettings((prev) => ({ ...prev, ...data }));
        } catch (error) {
            console.error("Error loading doctor settings:", error);
            addToast(s.toast.loadSettingsError, "error");
        } finally {
            setLoading(false);
        }
    };

    const loadAvailabilities = async (): Promise<void> => {
        try {
            setLoadingAvailability(true);
            const response = await AvailabilityService.getMyAvailability();
            setAvailabilities(response);
        } catch (error) {
            console.error("Error loading doctor availabilities:", error);
            addToast(s.toast.loadAvailabilityError, "error");
        } finally {
            setLoadingAvailability(false);
        }
    };

    const handleChange = (field: keyof DoctorSettingsData, value: string | number) => {
        setSettings((prev) => ({ ...prev, [field]: value }));
    };

    const handleSaveSettings = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setSaving(true);
            const updated = await DoctorSettingsService.updateSettings(settings);
            setSettings((prev) => ({ ...prev, ...updated }));
            addToast(s.toast.updateSuccess, "success");
        } catch (error) {
            console.error("Error updating doctor settings:", error);
            addToast(s.toast.updateError, "error");
        } finally {
            setSaving(false);
        }
    };

    const onSubmitAvailability: SubmitHandler<AvailabilityFormFields> = async (data) => {
        if (data.end_time <= data.start_time) {
            addToast(s.hints.endAfterStart, "warning");
            return;
        }

        try {
            setLoadingAvailability(true);
            await AvailabilityService.saveMyAvailability(data as DoctorAvailabilityInterface);
            reset();
            await loadAvailabilities();
            addToast(s.toast.availabilitySaved, "success");
        } catch (error) {
            console.error("Error saving availability:", error);
            addToast(s.toast.availabilitySaveError, "error");
        } finally {
            setLoadingAvailability(false);
        }
    };

    const handleRemoveAvailability = async (itemId: number) => {
        try {
            setLoadingAvailability(true);
            await AvailabilityService.removeAvailability(itemId);
            await loadAvailabilities();
            addToast(s.toast.availabilityDeleted, "success");
        } catch (error) {
            console.error("Error removing availability:", error);
            addToast(s.toast.availabilityDeleteError, "error");
        } finally {
            setLoadingAvailability(false);
        }
    };

    const handleChangeTab = (value: string) => {
        const tab = value === "availability" ? "availability" : "basic";
        setActiveTab(tab);
        void router.replace(
            {
                pathname: router.pathname,
                query: tab === "availability" ? { tab } : {},
            },
            undefined,
            { shallow: true }
        );
    };

    if (loading) return <Loader message={s.loading} />;

    return (
        <DashboardLayout>
            <PageWrapper>
                <div className="container mx-auto p-4">
                    <Tabs
                        tabs={[
                            { label: s.tabs.basic, value: "basic" },
                            { label: s.tabs.availability, value: "availability" },
                        ]}
                        active={activeTab}
                        onChange={handleChangeTab}
                    />

                    {activeTab === "basic" && (
                        <form onSubmit={handleSaveSettings} className="space-y-6">
                            <section className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-primary mb-4">{s.sections.agenda}</h2>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{s.labels.durationPerAppointment}</label>
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
                                <h2 className="text-lg font-semibold text-primary mb-4">{s.sections.consultation}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">{s.labels.basePrice}</label>
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
                                        <label className="block text-sm font-medium text-gray-700 mb-1">{s.labels.currency}</label>
                                        <input
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            value={settings.currency_default_appointment}
                                            onChange={(e) => handleChange("currency_default_appointment", e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">{s.labels.currencySymbol}</label>
                                        <input
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            value={settings.currency_symbol_default_appointment}
                                            onChange={(e) => handleChange("currency_symbol_default_appointment", e.target.value)}
                                        />
                                    </div>
                                </div>
                            </section>

                            <section className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-primary mb-4">{s.sections.notifications}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">{s.labels.notificationChannel}</label>
                                        <select
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            value={settings.way_notify_appointment}
                                            onChange={(e) => handleChange("way_notify_appointment", e.target.value as DoctorSettingsData["way_notify_appointment"])}
                                        >
                                            <option value="both">{s.notificationChannel.both}</option>
                                            <option value="email">{s.notificationChannel.email}</option>
                                            <option value="whatsapp">{s.notificationChannel.whatsapp}</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">{s.labels.reminderHoursBefore}</label>
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
                                <h2 className="text-lg font-semibold text-primary mb-4">{s.sections.office}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">{s.labels.officeName}</label>
                                        <input
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            value={settings.medical_center_name ?? ""}
                                            onChange={(e) => handleChange("medical_center_name", e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">{s.labels.officePhone}</label>
                                        <input
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            value={settings.medical_center_phone ?? ""}
                                            onChange={(e) => handleChange("medical_center_phone", e.target.value)}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">{s.labels.officeAddress}</label>
                                        <input
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            value={settings.medical_center_address ?? ""}
                                            onChange={(e) => handleChange("medical_center_address", e.target.value)}
                                        />
                                    </div>
                                </div>
                            </section>

                            <button type="submit" className="btn-primary disabled:opacity-50" disabled={saving}>
                                {saving ? s.buttons.savingSettings : s.buttons.saveSettings}
                            </button>
                        </form>
                    )}

                    {activeTab === "availability" && (
                        <div className="space-y-6">
                            <section className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-primary mb-4">{s.sections.schedule}</h2>
                                <p className="text-sm text-gray-600 mb-4">
                                    {s.hints.scheduleIntro}
                                </p>

                                <form onSubmit={handleSubmit(onSubmitAvailability)} className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">{s.labels.dayOfCare}</label>
                                        <select {...register("day_of_week")} required className="w-full border p-2 rounded">
                                            {daysOfWeek.map((day) => (
                                                <option key={day.id} value={day.value}>{day.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {formFieldLabel(s.labels.startTime, hasInvalidRange)}
                                        </label>
                                        <input type="time" {...register("start_time")} required className="w-full border p-2 rounded" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {formFieldLabel(s.labels.endTime, hasInvalidRange)}
                                        </label>
                                        <input type="time" {...register("end_time")} required className="w-full border p-2 rounded" />
                                    </div>
                                    <div className="flex items-end">
                                    <button
                                        type="submit"
                                        className="btn-primary disabled:opacity-50 w-full"
                                        disabled={loadingAvailability || hasInvalidRange}
                                    >
                                        {s.buttons.addSchedule}
                                    </button>
                                    </div>
                                </form>

                                {hasInvalidRange && (
                                    <p className="text-sm text-red-600 mt-3">
                                        {s.hints.endAfterStart}
                                    </p>
                                )}
                            </section>

                            <section className="bg-white rounded-lg shadow-sm p-6">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                                    <h2 className="text-lg font-semibold text-primary">{s.sections.registeredAvailability}</h2>
                                    <span className="text-sm text-gray-500">
                                        {availabilities.length}{" "}
                                        {availabilities.length === 1
                                            ? s.availabilityCount.one
                                            : s.availabilityCount.many}
                                    </span>
                                </div>
                                {loadingAvailability ? (
                                    <Loader message={s.loadingAvailabilities} />
                                ) : availabilities.length > 0 ? (
                                    <AvailabilityList items={availabilities} onRemove={handleRemoveAvailability} />
                                ) : (
                                    <div className="py-10">
                                        <EmptyState />
                                        <p className="text-center text-sm text-gray-500 mt-3">
                                            {s.hints.noSchedulesYet}
                                        </p>
                                    </div>
                                )}
                            </section>
                        </div>
                    )}
                </div>
            </PageWrapper>
        </DashboardLayout>
    );
}
