import { atomWithStorage } from "jotai/utils";
import { workoutsDefault } from "./constants";

export const workoutListAtom = atomWithStorage('workouts', workoutsDefault, undefined, {getOnInit: true})
