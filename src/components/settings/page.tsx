import { ProfileForm } from "@/components/settings/profile-form";
import { SecurityForm } from "@/components/settings/security-form";
import { AppearanceForm } from "@/components/settings/appearance-form";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-slate-900">Configurações</h3>
        <p className="text-sm text-slate-500">
          Gerencie as informações do seu perfil e preferências do sistema.
        </p>
      </div>
      
      <Separator className="bg-slate-200" />

      <div className="grid gap-8">
        <ProfileForm />
        <Separator className="bg-slate-100" />
        <SecurityForm />
        <Separator className="bg-slate-100" />
        <AppearanceForm />
      </div>
    </div>
  );
}