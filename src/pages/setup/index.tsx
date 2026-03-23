'use client'

import { Loader } from "@/app/components";
import { messages } from "@/app/config/messages";
import { useLayout } from "@/app/context";
import { useCSFR } from "@/app/hooks";
import { routeNames } from "@/app/routes";
import { SetupInitializePayload, SetupService } from "@/app/services";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const APP_NAME =
  process.env.NEXT_PUBLIC_TITLE || messages.setup.appNameFallback;

const INITIAL_FORM: SetupInitializePayload = {
  admin_name: "",
  admin_lastname: "",
  admin_email: "",
  admin_phone: "",
  admin_password: "",
  admin_password_confirmation: "",
  doctor_specialization: "",
  medical_center_name: "",
  medical_center_address: "",
  medical_center_phone: "",
  medical_center_email: "",
  default_appointment_duration: "",
  default_appointment_price: "",
  default_appointment_currency: "",
  default_appointment_currency_symbol: "",
  notification_way: "both",
  reminder_hour_appointment: "",
};

export default function SetupPage() {
  const router = useRouter();
  const { setTitlePage } = useLayout();
  const { getCSRFToken } = useCSFR();
  const [form, setForm] = useState<SetupInitializePayload>(INITIAL_FORM);
  const [isCheckingSetup, setIsCheckingSetup] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    setTitlePage("");
    const bootstrap = async () => {
      try {
        await getCSRFToken();
        const response = await SetupService.getStatus();
        if (response?.data?.installed) {
          await router.replace(routeNames.login);
          return;
        }
        if (response?.data?.defaults) {
          const defaults = response.data.defaults;
          setForm((prev) => ({
            ...prev,
            default_appointment_duration: String(defaults.default_appointment_duration),
            default_appointment_price: String(defaults.default_appointment_price),
            default_appointment_currency: defaults.default_appointment_currency,
            default_appointment_currency_symbol: defaults.default_appointment_currency_symbol,
            notification_way: defaults.notification_way,
            reminder_hour_appointment: String(defaults.reminder_hour_appointment),
          }));
        }
      } finally {
        setIsCheckingSetup(false);
      }
    };

    bootstrap();
  }, [getCSRFToken, router, setTitlePage]);

  const onChange = (field: keyof SetupInitializePayload, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      await SetupService.initialize(form);
      setSuccessMessage(messages.setup.success.completedRedirect);
      await router.replace(routeNames.login);
    } catch (error: unknown) {
      const apiError = error as AxiosError<{ message?: string }>;
      const message =
        apiError.response?.data?.message || messages.setup.error.generic;
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isCheckingSetup) {
    return <Loader message={messages.setup.loading.configuring} />;
  }

  if (isSubmitting) {
    return <Loader message={messages.setup.loading.completing} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-3xl font-semibold text-primary text-center mb-3">
          {APP_NAME}
        </h1>
        <h2 className="text-lg font-bold text-gray-800 text-center mb-6">
          {messages.setup.title}
        </h2>

        {errorMessage ? (
          <div className="mb-4 rounded-md bg-red-100 text-red-700 px-4 py-3 text-sm">
            {errorMessage}
          </div>
        ) : null}
        {successMessage ? (
          <div className="mb-4 rounded-md bg-green-100 text-green-700 px-4 py-3 text-sm">
            {successMessage}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-6">
          <section>
            <h3 className="text-base font-semibold text-gray-700 mb-3">
              {messages.setup.sections.doctorAdmin}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="admin_name">{messages.setup.placeholders.adminName}</label>
                <input
                  id="admin_name"
                  type="text"
                  value={form.admin_name}
                  onChange={(e) => onChange("admin_name", e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="admin_lastname">{messages.setup.placeholders.adminLastname}</label>
                <input
                  id="admin_lastname"
                  type="text"
                  value={form.admin_lastname}
                  onChange={(e) => onChange("admin_lastname", e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="admin_email">{messages.setup.placeholders.adminEmail}</label>
                <input
                  id="admin_email"
                  type="email"
                  value={form.admin_email}
                  onChange={(e) => onChange("admin_email", e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="admin_phone">{messages.setup.placeholders.adminPhone}</label>
                <input
                  id="admin_phone"
                  type="text"
                  value={form.admin_phone || ""}
                  onChange={(e) => onChange("admin_phone", e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="admin_password">{messages.setup.placeholders.adminPassword}</label>
                <input
                  id="admin_password"
                  type="password"
                  value={form.admin_password}
                  onChange={(e) => onChange("admin_password", e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="admin_password_confirmation">{messages.setup.placeholders.adminPasswordConfirm}</label>
                <input
                  id="admin_password_confirmation"
                  type="password"
                  value={form.admin_password_confirmation}
                  onChange={(e) =>
                    onChange("admin_password_confirmation", e.target.value)
                  }
                  className="input-field"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700" htmlFor="doctor_specialization">{messages.setup.placeholders.doctorSpecialization}</label>
                <input
                  id="doctor_specialization"
                  type="text"
                  value={form.doctor_specialization || ""}
                  onChange={(e) => onChange("doctor_specialization", e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-base font-semibold text-gray-700 mb-3">
              {messages.setup.sections.medicalCenter}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700" htmlFor="medical_center_name">{messages.setup.placeholders.medicalCenterName}</label>
                <input
                  id="medical_center_name"
                  type="text"
                  value={form.medical_center_name}
                  onChange={(e) => onChange("medical_center_name", e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700" htmlFor="medical_center_address">{messages.setup.placeholders.medicalCenterAddress}</label>
                <input
                  id="medical_center_address"
                  type="text"
                  value={form.medical_center_address || ""}
                  onChange={(e) => onChange("medical_center_address", e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="medical_center_phone">{messages.setup.placeholders.medicalCenterPhone}</label>
                <input
                  id="medical_center_phone"
                  type="text"
                  value={form.medical_center_phone || ""}
                  onChange={(e) => onChange("medical_center_phone", e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="medical_center_email">{messages.setup.placeholders.medicalCenterEmail}</label>
                <input
                  id="medical_center_email"
                  type="email"
                  value={form.medical_center_email || ""}
                  onChange={(e) => onChange("medical_center_email", e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-base font-semibold text-gray-700 mb-3">
              {messages.setup.sections.appointmentDefaults}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="default_appointment_duration">{messages.setup.placeholders.defaultDuration}</label>
                <input
                  id="default_appointment_duration"
                  type="number"
                  min={5}
                  max={240}
                  value={form.default_appointment_duration || ""}
                  onChange={(e) =>
                    onChange("default_appointment_duration", e.target.value)
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="default_appointment_price">{messages.setup.placeholders.defaultPrice}</label>
                <input
                  id="default_appointment_price"
                  type="number"
                  min={0}
                  step="0.01"
                  value={form.default_appointment_price || ""}
                  onChange={(e) =>
                    onChange("default_appointment_price", e.target.value)
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="default_appointment_currency">{messages.setup.placeholders.currency}</label>
                <input
                  id="default_appointment_currency"
                  type="text"
                  value={form.default_appointment_currency || ""}
                  onChange={(e) =>
                    onChange("default_appointment_currency", e.target.value)
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="default_appointment_currency_symbol">{messages.setup.placeholders.currencySymbol}</label>
                <input
                  id="default_appointment_currency_symbol"
                  type="text"
                  value={form.default_appointment_currency_symbol || ""}
                  onChange={(e) =>
                    onChange("default_appointment_currency_symbol", e.target.value)
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="notification_way">Canal de notificacion</label>
                <select
                  id="notification_way"
                  value={form.notification_way || "both"}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    onChange(
                      "notification_way",
                      e.target.value || "both"
                    )
                  }
                  className="input-field"
                >
                  <option value="both">
                    {messages.setup.notificationWay.both}
                  </option>
                  <option value="email">
                    {messages.setup.notificationWay.email}
                  </option>
                  <option value="whatsapp">
                    {messages.setup.notificationWay.whatsapp}
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="reminder_hour_appointment">{messages.setup.placeholders.reminderHours}</label>
                <input
                  id="reminder_hour_appointment"
                  type="number"
                  min={1}
                  max={168}
                  value={form.reminder_hour_appointment || ""}
                  onChange={(e) =>
                    onChange("reminder_hour_appointment", e.target.value)
                  }
                  className="input-field"
                />
              </div>
            </div>
          </section>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2 rounded-lg shadow-md transition"
          >
            {messages.setup.submit}
          </button>
        </form>
      </div>
    </div>
  );
}
