// Server component: enumerates every module id at build time (required by
// `output: export`) and renders the client view. The interactive/progress logic
// lives in ModuleView (a client component).
import { MODULES } from "@/content";
import { ModuleView } from "./ModuleView";

export function generateStaticParams() {
  return MODULES.map((m) => ({ moduleId: m.id }));
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  return <ModuleView moduleId={moduleId} />;
}
