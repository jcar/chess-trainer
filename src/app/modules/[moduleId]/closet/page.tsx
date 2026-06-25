// Server component: enumerates kid module ids at build time (required by
// `output: export`) and renders the client closet view.
import { MODULES } from "@/content";
import { ClosetView } from "./ClosetView";

export function generateStaticParams() {
  return MODULES.filter((m) => m.kidMode).map((m) => ({ moduleId: m.id }));
}

export default async function ClosetPage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  return <ClosetView moduleId={moduleId} />;
}
