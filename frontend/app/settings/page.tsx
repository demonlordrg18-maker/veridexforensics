import { ProtectedPlaceholder } from "@/components/ProtectedPlaceholder";

export default function SettingsPage() {
  return (
    <ProtectedPlaceholder
      eyebrow="// User Preferences"
      title="Settings"
      description="Account preferences, notification settings, session controls, default audit modality, and security settings will attach here."
    />
  );
}
