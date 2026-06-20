"use client";

// React binding for the progress store. Uses useSyncExternalStore so that:
//   - reads stay in sync with writes automatically (no manual version counter),
//   - SSR and the first client render use the same empty snapshot, avoiding a
//     hydration mismatch when localStorage isn't available on the server.

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  LocalProgressStore,
  selectActivityState,
  selectModuleProgress,
  selectStars,
  selectTotalStars,
  selectAllComplete,
  type ActivityState,
  type ProgressStore,
} from "./store";

interface ProgressContextValue {
  getActivityState: (activityId: string) => ActivityState;
  moduleProgress: (activityIds: string[]) => number;
  /** Stars (0–3) for one activity. */
  activityStars: (activityId: string) => number;
  /** Total stars across a set of activities (e.g. a lesson). */
  totalStars: (activityIds: string[]) => number;
  /** Whether every activity in the set is complete (e.g. a lesson trophy). */
  allComplete: (activityIds: string[]) => boolean;
  markComplete: (activityId: string, score?: number) => void;
  recordAttempt: (activityId: string) => void;
  reset: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

// Single store instance for the app.
const store: ProgressStore = new LocalProgressStore();

export function ProgressProvider({ children }: { children: ReactNode }) {
  const data = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );

  const value = useMemo<ProgressContextValue>(
    () => ({
      getActivityState: (id) => selectActivityState(data, id),
      moduleProgress: (ids) => selectModuleProgress(data, ids),
      activityStars: (id) => selectStars(data, id),
      totalStars: (ids) => selectTotalStars(data, ids),
      allComplete: (ids) => selectAllComplete(data, ids),
      markComplete: (id, score) => store.markComplete(id, score),
      recordAttempt: (id) => store.recordAttempt(id),
      reset: () => store.reset(),
    }),
    [data],
  );

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return ctx;
}
