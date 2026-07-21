import { ProtectedPlaceholder } from "@/components/ProtectedPlaceholder";

export default function EvidencePage() {
  return (
    <ProtectedPlaceholder
      eyebrow="// Evidence Vault"
      title="Evidence"
      description="The evidence vault will manage hashed uploads, provenance, chain-of-custody records, and report links for future forensic workflows."
    />
  );
}
