import { Achievement, MetricType } from "../storage/achievements";
import { achievementDefinitions } from "../storage/achievements/constants";
import { WorkoutInHistory } from "../storage/statistic";
import { Workout } from "../storage/workout";

export function calculateAchievements(workoutHistory: WorkoutInHistory[],workouts: Workout[]): Achievement[] {
    return achievementDefinitions.map(definition => {
      const progress = definition.calculateProgress({
        workoutHistory,
        workouts,
        metric: definition.metric,
        tags: definition.tags,
        equipment: definition.equipment
      });
      const completed = progress >= definition.total;
      let completionDate: string | undefined;
      if (completed) {
        const sortedHistory = [...workoutHistory]
          .sort((a, b) => b.date.getTime() - a.date.getTime());
        if (definition.metric === 'workout_streak') {
          const streakEnd = new Date();
          streakEnd.setDate(streakEnd.getDate() - (progress - 1));
          completionDate = streakEnd.toISOString();
        } else {
          const completionWorkout = sortedHistory[0];
          if (completionWorkout) {
            completionDate = completionWorkout.date.toISOString();
          }
        }
      }
      return {id: definition.id, name: definition.name, description: definition.description, progress: Math.min(progress, definition.total),
        total: definition.total,
        completed,
        icon: definition.icon,
        color: definition.color,
        date: completionDate,
        metric: definition.metric,
        tags: definition.tags,
        equipment: definition.equipment
      };
    });
}
  

export function trackMetric(
    metric: MetricType,
    data: {
      workoutHistory: WorkoutInHistory[];
      workouts: Workout[];
      tags?: string[];
      equipment?: string[];
    }
  ): number {
    const achievement = achievementDefinitions.find(a => a.metric === metric);
    if (!achievement) return 0;
    
    return achievement.calculateProgress({
      workoutHistory: data.workoutHistory,
      workouts: data.workouts,
      metric: metric,
      tags: data.tags,
      equipment: data.equipment
    });
}
  

export function isAchievementCompleted(
    achievementId: string,
    workoutHistory: WorkoutInHistory[],
    workouts: Workout[]
  ): boolean {
    const achievements = calculateAchievements(workoutHistory, workouts);
    const achievement = achievements.find(a => a.id === achievementId);
    return achievement?.completed || false;
}
  

export function getAchievementProgress(
    achievementId: string,
    workoutHistory: WorkoutInHistory[],
    workouts: Workout[]
  ): { current: number; total: number } | null {
    const achievements = calculateAchievements(workoutHistory, workouts);
    const achievement = achievements.find(a => a.id === achievementId);
    if (!achievement) return null;
    
  return {
    current: achievement.progress,
    total: achievement.total
  };
}