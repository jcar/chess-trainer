// Server component: enumerates every module×activity id pair at build time
// (required by `output: export`) and renders the client view.
import { MODULES, getModuleActivities } from "@/content";
import { ActivityView } from "./ActivityView";

export function generateStaticParams() {
  return MODULES.flatMap((m) =>
    getModuleActivities(m).map((a) => ({ moduleId: m.id, activityId: a.id })),
  );
}

export default async function ActivityPage({
  params,
}: {
  params: Promise<{ moduleId: string; activityId: string }>;
}) {
  const { moduleId, activityId } = await params;
  return <ActivityView moduleId={moduleId} activityId={activityId} />;
}
