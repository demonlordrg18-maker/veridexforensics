import { ProtectedPlaceholder } from "@/components/ProtectedPlaceholder";

export default function ReportsPage() {
  return (
    <ProtectedPlaceholder
      eyebrow="// Report Archive"
      title="Reports"
      description="Signed forensic reports, exports, redactions, and evidence-backed findings will live behind this protected archive."
    />
  );
}
