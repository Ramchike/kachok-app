import { coinPerRep, experiencePerRep } from "../config";
import { Difficulty, Exercise } from "../storage/exercise";
import { User } from "../storage/user";
import { WorkoutExercise, WorkoutStats } from "../storage/workout";

export function calculateRecommendedWeight(exercise: Exercise, user: User): number {
    // Коэффициент пола
    const baseMultiplier = user.gender === 'male' ? 0.8 : 0.6;
    
    // Коэффициент веса
    const weightMultiplier = user.weight / 75; 
    
    // Коэффициент сложности
    const difficultyMultiplier = exercise.difficulty === 1 ? 0.8 : exercise.difficulty === 2 ? 0.6 : 0.4;
    
    let recommendedWeight = 10 * baseMultiplier * weightMultiplier * difficultyMultiplier;
    
    // Округляем до ближайших 2.5кг
    recommendedWeight = Math.round(recommendedWeight / 2.5) * 2.5;
    
    return recommendedWeight;
}

export function calculateRecommendedReps(exercise: Exercise): number {
    // Базовое количество повторений зависит от сложности упражнения
    const baseReps = exercise.difficulty === 1 ? 15 : exercise.difficulty === 2 ? 8 : 6;
    
    return baseReps;
}

export function checkWorkoutSafety(exercise: WorkoutExercise, exercise_info: Exercise): {
    safe: boolean;
    message?: string;
} {
    // Проверяем безопасность на основе сложности и количества повторений
    const maxAllowedReps = exercise_info.difficulty === 1 ? 20 : exercise_info.difficulty === 2 ? 15 : 10;
    if (exercise.reps > maxAllowedReps) {
        return {
            safe: false,
            message: `Слишком много повторений". Рекомендуется не более ${maxAllowedReps} повторений.`,
        };
    }

    // Проверяем безопасность на основе времени выполнения
    const maxAllowedDuration = exercise_info.difficulty === 1 ? 60 : exercise_info.difficulty === 2 ? 45 : 30; // в секундах
    if (exercise.time && exercise.time > maxAllowedDuration) {
        return {
            safe: false,
            message: `Слишком большая продолжительность. Рекомендуется не более ${maxAllowedDuration} секунд.`,
        };
    }

    // Проверяем безопасность на основе количества подходов
    const maxAllowedSets = exercise_info.difficulty === 1 ? 5 : exercise_info.difficulty === 2 ? 4 : 3;
    if (exercise.sets > maxAllowedSets) {
        return {
            safe: false,
            message: `Слишком много подходов. Рекомендуется не более ${maxAllowedSets} подходов.`,
        };
    }

    return { safe: true };
}

export function calculateWorkoutDifficulty(exercises: WorkoutExercise[], exerciseInfos: Exercise[]): Difficulty {
    let totalScore = 0;
    let maxPossibleScore = 0;
    
    exercises.forEach(exercise => {
      const info = exerciseInfos.find(e => e.id === exercise.exerciseId);
      if (!info) return;
  
      let exerciseScore = info.difficulty;
      maxPossibleScore += 3; 
  
      // Коэффициент кол-во подходов
      // 1-2 подхода: 1x, 3-4 подхода: 1.2x, 5+ подходов: 1.4x
      const setsMultiplier = exercise.sets <= 2 ? 1 : exercise.sets <= 4 ? 1.2 : 1.4;
      exerciseScore *= setsMultiplier;
      maxPossibleScore *= 1.4; // Максимальный множитель подходов
  
      // Коэффициент веса
      if (exercise.weight) {
        // Относительно рекомендуемого веса
        const weightMultiplier = exercise.weight / (10);
        exerciseScore *= Math.min(weightMultiplier, 1.5); // Ограничиваем множитель весом 1.5x
        maxPossibleScore *= 1.5; // Максимальный множитель веса
      }
  
      // Коэффициент времени/повторений
      if (exercise.time) {
        const timeMultiplier = exercise.time / (30);
        exerciseScore *= Math.min(timeMultiplier, 1.3);
        maxPossibleScore *= 1.3;
      } else if (exercise.reps) {
        const repsMultiplier = exercise.reps / (12);
        exerciseScore *= Math.min(repsMultiplier, 1.3);
        maxPossibleScore *= 1.3;
      }
  
      totalScore += exerciseScore;
    });
  
    // Нормализуем общий счет относительно максимально возможного
    const normalizedScore = (totalScore / maxPossibleScore) * 3;
  
    // Определяем сложность на основе нормализованного счета
    if (normalizedScore <= 1.5) return 1;
    if (normalizedScore <= 2.3) return 2;
    return 3;
}

export function calculateRewards (stats: WorkoutStats) {
    const totalReps = stats.totalReps
    const experience = Math.round(totalReps*experiencePerRep);
    const coins = totalReps*coinPerRep;
    return { experience, coins };
};
