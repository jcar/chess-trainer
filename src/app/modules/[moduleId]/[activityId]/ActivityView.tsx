"use client";

import { notFound } from "next/navigation";
import { findActivity } from "@/content";
import { ActivityPlayer } from "@/components/ActivityPlayer";

export function ActivityView({
  moduleId,
  activityId,
}: {
  moduleId: string;
  activityId: string;
}) {
  const found = findActivity(moduleId, activityId);
  if (!found) notFound();

  return (
    <main>
      <ActivityPlayer
        module={found.module}
        lesson={found.lesson}
        activity={found.activity}
      />
    </main>
  );
}
