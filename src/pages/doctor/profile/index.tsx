import { DashboardLayout, Loader, PageWrapper } from "@/app/components";
import { messages } from "@/app/config";
import { useLayout } from "@/app/context";
import { DoctorProfileData, DoctorProfileService } from "@/app/services";
import { useToastStore } from "@/app/store";
import { FormEvent, useEffect, useState } from "react";

const p = messages.profile;

export default function DoctorProfile() {
  const TITLE_PAGE = p.pageTitle;
  const { setTitlePage } = useLayout();
  const { addToast } = useToastStore();

  const [loading, setLoading] = useState<boolean>(true);
  const [savingProfile, setSavingProfile] = useState<boolean>(false);
  const [savingPassword, setSavingPassword] = useState<boolean>(false);

  const [profile, setProfile] = useState<DoctorProfileData>({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    specialization: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    setTitlePage(TITLE_PAGE);
    loadProfile();
    return () => setTitlePage("");
  // eslint-disable-next-line react-hooks/exhaustive-deps -- initialize profile once on mount
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await DoctorProfileService.getProfile();
      setProfile({
        name: data.name ?? "",
        lastname: data.lastname ?? "",
        email: data.email ?? "",
        phone: data.phone ?? "",
        specialization: data.specialization ?? "",
      });
    } catch (error) {
      console.error("Error loading doctor profile:", error);
      addToast(p.toast.loadError, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileChange = (field: keyof DoctorProfileData, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field: keyof typeof passwordForm, value: string) => {
    setPasswordForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSavingProfile(true);
      const updated = await DoctorProfileService.updateProfile(profile);
      setProfile({
        name: updated.name ?? "",
        lastname: updated.lastname ?? "",
        email: updated.email ?? "",
        phone: updated.phone ?? "",
        specialization: updated.specialization ?? "",
      });
      addToast(p.toast.updateSuccess, "success");
    } catch (error) {
      console.error("Error updating doctor profile:", error);
      addToast(p.toast.updateError, "error");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleSavePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (passwordForm.password !== passwordForm.password_confirmation) {
      addToast(p.toast.passwordMismatch, "error");
      return;
    }

    try {
      setSavingPassword(true);
      const message = await DoctorProfileService.updatePassword(passwordForm);
      addToast(message, "success");
      setPasswordForm({
        current_password: "",
        password: "",
        password_confirmation: "",
      });
    } catch (error) {
      console.error("Error updating password:", error);
      addToast(p.toast.passwordUpdateError, "error");
    } finally {
      setSavingPassword(false);
    }
  };

  if (loading || savingProfile || savingPassword) {
    return (
      <Loader
        message={
          savingProfile
            ? p.loading.savingProfile
            : savingPassword
              ? p.loading.savingPassword
              : p.loading.profile
        }
      />
    );
  }

  return (
    <DashboardLayout>
      <PageWrapper>
        <div className="container mx-auto p-4 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{p.headings.professional}</h1>
            <p className="text-sm text-gray-600 mt-2">
              {p.headings.subtitle}
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="bg-white rounded-lg shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-semibold text-primary">{p.headings.profileData}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{p.labels.name}</label>
                <input
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={profile.name}
                  onChange={(e) => handleProfileChange("name", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{p.labels.lastname}</label>
                <input
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={profile.lastname}
                  onChange={(e) => handleProfileChange("lastname", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{p.labels.email}</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={profile.email}
                  onChange={(e) => handleProfileChange("email", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{p.labels.phone}</label>
                <input
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={profile.phone}
                  onChange={(e) => handleProfileChange("phone", e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">{p.labels.specialization}</label>
                <input
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={profile.specialization}
                  onChange={(e) => handleProfileChange("specialization", e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn-primary disabled:opacity-50" disabled={savingProfile}>
              {savingProfile ? p.buttons.savingProfile : p.buttons.saveProfile}
            </button>
          </form>

          <form onSubmit={handleSavePassword} className="bg-white rounded-lg shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-semibold text-primary">{p.headings.changePassword}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{p.labels.currentPassword}</label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={passwordForm.current_password}
                  onChange={(e) => handlePasswordChange("current_password", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{p.labels.newPassword}</label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={passwordForm.password}
                  onChange={(e) => handlePasswordChange("password", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{p.labels.confirmPassword}</label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={passwordForm.password_confirmation}
                  onChange={(e) => handlePasswordChange("password_confirmation", e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary disabled:opacity-50" disabled={savingPassword}>
              {savingPassword ? p.buttons.updatingPassword : p.buttons.updatePassword}
            </button>
          </form>
        </div>
      </PageWrapper>
    </DashboardLayout>
  )
}
