// Server component: enumerates module ids at build time (required by
// `output: export`) and renders the client sticker-book view.
import { MODULES } from "@/content";
import { StickersView } from "./StickersView";

export function generateStaticParams() {
  // Only kid modules have a sticker book.
  return MODULES.filter((m) => m.kidMode).map((m) => ({ moduleId: m.id }));
}

export default async function StickersPage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  return <StickersView moduleId={moduleId} />;
}
