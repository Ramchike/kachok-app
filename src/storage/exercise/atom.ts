import { Exercise, exercisesDefault} from ".";
import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

export const exerciseListAtom = atomWithStorage<Exercise[]>('exerciseList', exercisesDefault, undefined, {getOnInit: true});

export const addExerciseToListAtom = atom(
    null,
    (get, set, newExercise: Exercise) => {
        const currentExercises = get(exerciseListAtom);
        set(exerciseListAtom, [...currentExercises, newExercise]);
    }
)

