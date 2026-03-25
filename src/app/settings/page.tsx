import { ProfileForm } from "@/components/settings/profile-form";
import { SecurityForm } from "@/components/settings/security-form";
import { AppearanceForm } from "@/components/settings/appearance-form";

export default function SettingsPage() {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-slate-200">
      <h1 className="text-2xl font-bold mb-6 text-slate-900">Configurações do Perfil</h1>
      
      <div className="space-y-12">
        <ProfileForm />
        <hr className="border-slate-100" />
        <SecurityForm />
        <hr className="border-slate-100" />
        <AppearanceForm />
      </div>
    </div>
  );
}