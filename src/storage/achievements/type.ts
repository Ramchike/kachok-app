import { IconType } from "react-icons";
import { WorkoutInHistory } from "../statistic";
import { Workout } from "../workout";

export type MetricType = 
  | 'workouts_completed'
  | 'total_reps'
  | 'workout_streak'
  | 'total_time'
  | 'exercises_completed'
  | 'perfect_workouts'
  | 'specific_tag_workouts'
  | 'specific_equipment_workouts'
  | 'high_difficulty_workouts'
  | 'workout_variety'
  | 'weekly_goal'
  | 'monthly_goal';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  progress: number;
  total: number;
  completed: boolean;
  icon: IconType;
  color: string;
  date?: string;
  metric: MetricType;
  tags?: string[];
  equipment?: string[];
}

export interface AchievementDefinition {
  id: string;
  name: string;
  description: string;
  total: number;
  icon: IconType;
  color: string;
  metric: MetricType;
  tags?: string[];
  equipment?: string[];
  calculateProgress: (data: {
    workoutHistory: WorkoutInHistory[];
    workouts: Workout[];
    metric: MetricType;
    tags?: string[];
    equipment?: string[];
  }) => number;
}