import { useState } from "react";
import { calculateTotalStats, calculateStreak, calculateMaxStreak, calculateWorkoutActivity, calculateFavoriteWorkouts, calculateTagProgress } from "../utils/statsHelper";
import { workoutsHistoryAtom } from "../storage/statistic/atom";
import { useAtom } from "jotai";
import { workoutListAtom } from "../storage/workout";
import { ActivityCalendar, AchievementsWidget, FavoriteWorkouts, TagsProgress } from "../components/dashboards";
import { FullAchievementsModal } from "../components/modals/summary/Achievements";
import { FullCalendarModal } from "../components/modals/summary/Calendar";
import { calculateAchievements } from "../utils";

export const SummaryPage = () => {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
    const [workoutHistory] = useAtom(workoutsHistoryAtom) 
    const [workouts] = useAtom(workoutListAtom)
  
    const totalStats = calculateTotalStats(workoutHistory);
    const currentStreak = calculateStreak(workoutHistory);
    const maxStreak = calculateMaxStreak(workoutHistory);
    const activityDays = calculateWorkoutActivity(workoutHistory);
    const favoriteWorkouts = calculateFavoriteWorkouts(workouts);
    const tagStats = calculateTagProgress(workouts);
    const achievements = calculateAchievements(workoutHistory, workouts);
  
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-1">
          <div className="flex items-center gap-2 sm:mt-4">
            <h1 className="text-2xl dark:text-black sm:text-3xl font-bold mb-4">Сводка</h1>
          </div>
  
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 space-y-6">
              <div className="lg:max-w-sm">
                <ActivityCalendar
                  days={activityDays}
                  currentStreak={currentStreak}
                  maxStreak={maxStreak}
                  totalWorkouts={totalStats.totalWorkouts}
                  totalExercises={totalStats.totalExercises}
                  totalTime={totalStats.totalTime}
                  onOpenFullCalendar={() => setIsCalendarOpen(true)}
                />
              </div>
  
              <AchievementsWidget
                achievements={achievements}
                onOpenFullAchievements={() => setIsAchievementsOpen(true)}
              />
            </div>
  
            <div className="lg:col-span-4">
              <TagsProgress tagStats={tagStats} />
            </div>

            <div className="lg:col-span-4">
              <FavoriteWorkouts workouts={favoriteWorkouts} />
            </div>
          </div>
        </div>
  
        <FullCalendarModal
          isOpen={isCalendarOpen}
          onClose={() => setIsCalendarOpen(false)}
          workoutHistory={workoutHistory.map(workout => ({
            date: workout.date.toISOString(),
            name: workouts.find(w => w.id === workout.workoutId)?.name || 'Тренировка',
            duration: workout.stats.totalTime,
            exercises: workout.stats.completedExercises
          }))}
        />
  
        <FullAchievementsModal
          isOpen={isAchievementsOpen}
          onClose={() => setIsAchievementsOpen(false)}
          achievements={achievements}
        />
      </div>
    );
  }