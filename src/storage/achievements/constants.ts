import { AchievementDefinition } from ".";
import { MdOutlineAccessibilityNew } from "react-icons/md";
import { GiExtraTime, GiMuscleFat, GiStarsStack } from "react-icons/gi"
import { TbBarbellFilled } from "react-icons/tb"
import { RiPulseAiLine } from "react-icons/ri";


export const achievementDefinitions: AchievementDefinition[] = [
    {
      id: 'first_steps',
      name: 'Первые шаги',
      description: 'Выполните первые 10 тренировок',
      total: 10,
      icon: MdOutlineAccessibilityNew ,
      color: 'bg-blue-500',
      metric: 'workouts_completed',
      calculateProgress: ({ workoutHistory }) => workoutHistory.length
    },
    {
      id: 'total_reps',
      name: 'Силач',
      description: 'Выполните 1000 повторений',
      total: 1000,
      icon: GiMuscleFat,
      color: 'bg-green-500',
      metric: 'total_reps',
      calculateProgress: ({ workoutHistory }) => 
        workoutHistory.reduce((total, workout) => total + workout.stats.totalReps, 0)
    },
    {
      id: 'workout_streak',
      name: 'Марафонец',
      description: 'Тренируйтесь 7 дней подряд',
      total: 7,
      icon: GiExtraTime,
      color: 'bg-yellow-500',
      metric: 'workout_streak',
      calculateProgress: ({ workoutHistory }) => {
        if (workoutHistory.length === 0) return 0;
        const dates = new Set(workoutHistory.map(w => 
          w.date.toISOString().split('T')[0]
        ));
        let streak = 0;
        const today = new Date();
        for (let i = 0; i < 365; i++) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          if (dates.has(dateStr)) {
            streak++;
          } else break;
        }
        return streak;
      }
    },
    {
      id: 'cardio_master',
      name: 'Мастер кардио',
      description: 'Выполните 20 кардио тренировок',
      total: 20,
      icon: RiPulseAiLine,
      color: 'bg-green-500',
      metric: 'specific_tag_workouts',
      tags: ['cardio'],
      calculateProgress: ({ workoutHistory, workouts, tags }) => {
        if (!tags) return 0;
        return workoutHistory.reduce((count, history) => {
          const workout = workouts.find(w => w.id.toString() === history.workoutId.toString());
          if (workout && workout.tags.some(tag => tags.includes(tag))) {
            return count + 1;
          }
          return count;
        }, 0);
      }
    },
    {
      id: 'strength_master',
      name: 'Силовой мастер',
      description: 'Выполните 30 тренировок со штангой',
      total: 30,
      icon: TbBarbellFilled,
      color: 'bg-purple-500',
      metric: 'specific_equipment_workouts',
      equipment: ['barbell'],
      calculateProgress: ({ workoutHistory, workouts, equipment }) => {
        if (!equipment) return 0;
        return workoutHistory.reduce((count, history) => {
          const workout = workouts.find(w => w.id.toString() === history.workoutId.toString());
          const exercises = workout?.exercises || [];
          if (exercises.some(ex => equipment.includes(ex.exerciseId.toString()))) {
            return count + 1;
          }
          return count;
        }, 0);
      }
    },
    {
      id: 'challenge_seeker',
      name: 'Искатель вызовов',
      description: 'Выполните 10 сложных тренировок',
      total: 10,
      icon: GiStarsStack,
      color: 'bg-red-500',
      metric: 'high_difficulty_workouts',
      calculateProgress: ({ workoutHistory, workouts }) => {
        return workoutHistory.reduce((count, history) => {
          const workout = workouts.find(w => w.id.toString() === history.workoutId.toString());
          if (workout && workout.difficulty === 3) {
            return count + 1;
          }
          return count;
        }, 0);
      }
    }
  ];