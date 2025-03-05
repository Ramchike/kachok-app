
import { Difficulty, TagKey } from "../exercise";

export type ExerciseType = 'reps' | 'weight' | 'time';

export interface WorkoutStats {
    totalTime: number;
    totalReps: number;
    completedExercises: number;
    skippedExercises: number;
    points: number;
}

export interface WorkoutExercise {
    exerciseId: number;
    sets: number;
    reps: number;
    time?: number;
    weight?: number;
}
  
export interface Workout {
    id: number;
    name: string;
    description?: string;
    exercises: WorkoutExercise[];
    tags: TagKey[];
    difficulty: Difficulty;
    estimatedTime: number; 
    createdAt: string;
    lastUsed?: string;
    timesUsed: number;
    isPinned?: boolean;
}

