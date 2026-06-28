// Server component: one static route per opening (output: export).
import { allOpenings } from "@/lib/trainer/lines";
import { TrainerOpeningView } from "./TrainerOpeningView";

export function generateStaticParams() {
  return allOpenings().map((o) => ({ opening: o.id }));
}

export default async function OpeningPage({
  params,
}: {
  params: Promise<{ opening: string }>;
}) {
  const { opening } = await params;
  return <TrainerOpeningView openingId={opening} />;
}
