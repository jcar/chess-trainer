// Server component: one static route per endgame position (output: export).
import { ENDGAMES } from "@/lib/endgames/positions";
import { EndgameDrillView } from "./EndgameDrillView";

export function generateStaticParams() {
  return ENDGAMES.map((e) => ({ id: e.id }));
}

export default async function EndgamePositionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EndgameDrillView id={id} />;
}
