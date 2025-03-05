import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { WorkoutInHistory } from "./type";

export const workoutsHistoryAtom = atomWithStorage(
    'workoutsHistory',
    [] as WorkoutInHistory[],
    {
      getItem: (key) => {
        const item = localStorage.getItem(key);
        if (!item) {
          return [];
        }
        try {
          const parsed = JSON.parse(item);
          return parsed.map((workout: WorkoutInHistory) => ({
            ...workout,
            date: new Date(workout.date),
          }));
        } catch {
          return [];
        }
      },
      setItem: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
      },
      removeItem: (key) => {
        localStorage.removeItem(key);
      },
    }
);

export const addWorkoutToHistory = atom(
    null,
    (get, set, newWorkout: WorkoutInHistory) => {
        const current = get(workoutsHistoryAtom);
        set(workoutsHistoryAtom, [...current, newWorkout]);
    }
)