"use client";

// Knight's Gauntlet as a real route (/arcade/gauntlet) so Back returns to the
// lobby instead of leaving the Arcade. The game's intro/playing/over phases stay
// internal state (you don't want Back rewinding a move).

import { ArcadeShell } from "@/components/arcade/ArcadeShell";
import { GauntletGame } from "@/components/arcade/GauntletGame";
import { useToolBack } from "@/lib/nav/useToolBack";

export default function GauntletPage() {
  const back = useToolBack("/arcade");
  return (
    <div className="space-y-5">
      <ArcadeShell>
        <GauntletGame onExit={back} />
      </ArcadeShell>
    </div>
  );
}
