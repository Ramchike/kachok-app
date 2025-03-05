import { tagList } from "../storage/exercise";
import { WorkoutInHistory, TotalStats, FavoriteWorkout, WorkoutActivity, TagStat } from "../storage/statistic";
import { Workout } from "../storage/workout";

export function calculateTotalStats(workoutHistory: WorkoutInHistory[]): TotalStats {
    const uniqueDates = new Set(
      workoutHistory.map(workout => {
        const date = workout.date
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      })
    );
  
    return workoutHistory.reduce((acc, { stats }) => ({
      totalWorkouts: acc.totalWorkouts + 1,
      totalExercises: acc.totalExercises + stats.completedExercises,
      totalTime: acc.totalTime + stats.totalTime,
      totalReps: acc.totalReps + stats.totalReps,
      uniqueWorkoutDays: uniqueDates.size
    }), {
      totalWorkouts: 0,
      totalExercises: 0,
      totalTime: 0,
      totalReps: 0,
      uniqueWorkoutDays: 0
    });
}
  
export function calculateStreak(workoutHistory: WorkoutInHistory[]): number {
    if (workoutHistory.length === 0) return 0;
  
    const workoutDates = new Set(
      workoutHistory.map(workout => {
        const date = workout.date;
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      })
    );
  
    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    for (let i = 0; i <= 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateString = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;
  
      if (workoutDates.has(dateString)) {
        currentStreak++;
      } else {
        break;
      }
    }
    return currentStreak;
}
  
export function calculateMaxStreak(workoutHistory: WorkoutInHistory[]): number {
    if (workoutHistory.length === 0) return 0;
  
    const workoutDates = [...new Set(
      workoutHistory.map(workout => {
        const date = workout.date;
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      })
    )].sort();
  
    let maxStreak = 0;
    let currentStreak = 1;
  
    for (let i = 1; i < workoutDates.length; i++) {
      const prevDate = new Date(workoutDates[i - 1]);
      const currentDate = new Date(workoutDates[i]);
      
      const dayDiff = Math.floor((currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
  
      if (dayDiff === 1) {
        currentStreak++;
      } else {
        maxStreak = Math.max(maxStreak, currentStreak);
        currentStreak = 1;
      }
    }
  
    maxStreak = Math.max(maxStreak, currentStreak);
    return maxStreak;
}
  
export function calculateFavoriteWorkouts(workouts: Workout[]): FavoriteWorkout[] {
    return workouts
      .map(workout => ({
        name: workout.name,
        usageCount: workout.timesUsed,
        lastUsed: workout.lastUsed || workout.createdAt
      }))
      .sort((a, b) => b.usageCount - a.usageCount)
      .slice(0, 5);
}
  
export function calculateTagProgress(workouts: Workout[]): TagStat[] {
    const tagCounts = new Map<string, number>();
    tagList.forEach(tag => {
      tagCounts.set(tag.id, 0);
    });
  
    workouts.forEach(workout => {
      workout.tags.forEach(tagId => {
        tagCounts.set(tagId, (tagCounts.get(tagId) || 0) + workout.timesUsed);
      });
    });
  
    return Array.from(tagCounts.entries())
      .map(([id, value]) => {
        const tag = tagList.find(t => t.id === id);
        if (!tag) return null;
        return {
          id,
          name: tag.name,
          value,
          color: tag.color
        };
      })
      .filter((stat): stat is TagStat => stat !== null)
      .sort((a, b) => b.value - a.value);
}
  
export function calculateWorkoutActivity(workoutHistory: WorkoutInHistory[]): WorkoutActivity[] {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(monday.getDate() - (monday.getDay() || 7) + 1);
    
    const workoutDates = new Set(
      workoutHistory.map(workout => {
        const date = workout.date;
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      })
    );
  
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(monday);
      date.setDate(date.getDate() + i);
      const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      return {
        date: date.toISOString(),
        hasWorkout: workoutDates.has(dateString)
      };
    });
}

export function generateRandomStats(): WorkoutInHistory[] {
  const numberOfWorkouts = Math.floor(Math.random() * 90) + 100; // 110-200 тренировок
  const today = new Date();
  
  return Array.from({ length: numberOfWorkouts }, () => {
    const date = new Date(today);
    date.setDate(date.getDate() - Math.floor(Math.random() * 60)); // Последние 2 месяца
    
    return {
      workoutId: Math.floor(Math.random() * 3) + 1,
      date,
      stats: {
        totalTime: Math.floor(Math.random() * 60) + 20,
        totalReps: Math.floor(Math.random() * 200) + 50,
        completedExercises: Math.floor(Math.random() * 8) + 3,
        skippedExercises: Math.floor(Math.random() * 2),
        points: Math.floor(Math.random() * 100) + 50
      }
    };
  }).sort((a, b) => b.date.getTime() - a.date.getTime()); // Сортировка от новых к старым
}