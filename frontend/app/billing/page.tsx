import { ProtectedPlaceholder } from "@/components/ProtectedPlaceholder";

export default function BillingPage() {
  return (
    <ProtectedPlaceholder
      eyebrow="// Billing Ledger"
      title="Billing"
      description="Subscriptions, invoices, credit purchases, tax metadata, and enterprise billing administration will build from this protected route."
    />
  );
}
