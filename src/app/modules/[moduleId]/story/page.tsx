// Server component: enumerates kid module ids at build time (output: export) and
// renders the client "Story so far" view.
import { MODULES } from "@/content";
import { StoryView } from "./StoryView";

export function generateStaticParams() {
  return MODULES.filter((m) => m.kidMode).map((m) => ({ moduleId: m.id }));
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  return <StoryView moduleId={moduleId} />;
}
