// Server component: enumerates kid module ids at build time (output: export) and
// renders the client certificate view.
import { MODULES } from "@/content";
import { CertificateView } from "./CertificateView";

export function generateStaticParams() {
  return MODULES.filter((m) => m.kidMode).map((m) => ({ moduleId: m.id }));
}

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  return <CertificateView moduleId={moduleId} />;
}
