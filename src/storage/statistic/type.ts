import { IconType } from "react-icons";
import { WorkoutStats } from "../workout";


export interface ActivityDay {
    date: string;
    hasWorkout: boolean;
}
export interface WorkoutInHistory {
    workoutId: number
    date: Date
    stats: WorkoutStats
}

export interface TotalStats {
    totalWorkouts: number;
    totalExercises: number;
    totalTime: number;
    totalReps: number;
    uniqueWorkoutDays: number;
}

export interface TagStat {
    id: string;
    name: string;
    value: number;
    color: string;
}
  
export interface BodyPartProgress {
    name: string;
    value: number;
    color: string;
    icon: IconType;
}
  
export interface FavoriteWorkout {
    name: string;
    usageCount: number;
    lastUsed: string;
}
  
export interface WorkoutActivity {
    date: string;
    hasWorkout: boolean;
}