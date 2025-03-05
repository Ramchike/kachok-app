import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { Workout, WorkoutStats } from "../../../../storage/workout";
import { RestStage } from "./RestStage";
import { ExerciseStage } from "./ExerciseStage";
import { PreparationStage } from "./PreparationStage";
import { WorkoutHeader } from "./Header";
import { exerciseListAtom } from "../../../../storage/exercise";
import { useAtom } from "jotai";
import { PREPARATION_TIME, REST_TIME } from "../../../../config";

interface Props {
  workout: Workout;
  onClose: () => void;
  onComplete: (stats: WorkoutStats) => void;
}
  
export const WorkoutMode: React.FC<Props> = ({ workout, onClose, onComplete }) => {
  const [exercises] = useAtom(exerciseListAtom)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(-1);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [restTime, setRestTime] = useState(REST_TIME);
  const [preparationTime, setPreparationTime] = useState(PREPARATION_TIME);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);

  const [stats, setStats] = useState<WorkoutStats>({
    totalTime: 0,
    totalReps: 0,
    completedExercises: 0,
    skippedExercises: 0,
    points: 0
  });

  const currentExercise = workout.exercises[currentExerciseIndex];
  const exerciseInfo = currentExercise ? exercises.find(ex => ex.id === currentExercise.exerciseId) : null;
  const firstExercise = exercises.find(ex => ex.id === workout.exercises[0].exerciseId);
  const startTimeRef = useRef(Date.now());

  const handleCompleteSet = useCallback(() => {
    setStats(prev => ({
      ...prev,
      totalReps: prev.totalReps + (currentExercise?.reps || 0),
      totalTime: prev.totalTime + (currentExercise?.time || 0)
    }));

    if (currentSet < (currentExercise?.sets || 0)) {
      setCurrentSet(prev => prev + 1);
      setIsResting(true);
      setRestTime(REST_TIME);
      setTimer(0);
    } else {
      if (currentExerciseIndex < workout.exercises.length - 1) {
        setCurrentExerciseIndex(prev => prev + 1);
        setIsResting(true);
        setRestTime(REST_TIME);
        setCurrentSet(1);
        setTimer(0);
        setStats(prev => ({
          ...prev,
          completedExercises: prev.completedExercises + 1,
          points: prev.points + 10
        }));
      } else {
        const totalWorkoutTime = Math.floor((Date.now() - startTimeRef.current) / 1000 / 60);
        onComplete({
          ...stats,
          completedExercises: stats.completedExercises + 1,
          points: stats.points + 10,
          totalTime: totalWorkoutTime
        });
      }
    }
  }, [currentExercise, currentSet, currentExerciseIndex, workout.exercises.length, stats, onComplete]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (currentExerciseIndex === -1 && preparationTime > 0) {
      interval = setInterval(() => {
        setPreparationTime(prev => {
          if (prev <= 1) {
            setCurrentExerciseIndex(0);
            return PREPARATION_TIME;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (isResting && restTime > 0) {
      interval = setInterval(() => {
        setRestTime(prev => {
          if (prev <= 1) {
            setIsResting(false);
            const nextExercise = workout.exercises[currentExerciseIndex];
            if (nextExercise?.time) {
              setTimer(nextExercise.time);
              setIsPaused(false);
            }
            return REST_TIME;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (isResting && restTime <= 0) {
      setIsResting(false);
      const nextExercise = workout.exercises[currentExerciseIndex];
      if (nextExercise?.time) {
        setTimer(nextExercise.time);
        setIsPaused(false);
      }
    } else if (currentExercise?.time && timer > 0 && !isPaused) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            handleCompleteSet();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isResting, restTime, timer, currentExercise, preparationTime, currentExerciseIndex, isPaused, workout.exercises, handleCompleteSet, firstExercise]);

  useEffect(() => {
    if (currentExercise?.time && !isResting && timer === 0) {
      setTimer(currentExercise.time);
      setIsPaused(false);
    }
  }, [currentExercise, isResting, timer]);

  const handleTogglePause = () => {
    setIsPaused(prev => !prev);
  };

  const handleSkipExercise = () => {
    if (currentExerciseIndex < workout.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setCurrentSet(1);
      setTimer(0);
      setStats(prev => ({
        ...prev,
        skippedExercises: prev.skippedExercises + 1
      }));
    } else {
      const totalWorkoutTime = Math.floor((Date.now() - startTimeRef.current) / 1000 / 60);
      onComplete({
        ...stats,
        skippedExercises: stats.skippedExercises + 1,
        totalTime: totalWorkoutTime
      });
    }
  };

  if (currentExerciseIndex === -1) {
    return firstExercise ? (
      <PreparationStage
        preparationTime={preparationTime}
        firstExercise={firstExercise}
      />
    ) : null;
  }

  if (!currentExercise || !exerciseInfo) return null;

  return (
    <div className="fixed inset-0 bg-gray-100 z-50">
      <div className="h-full flex flex-col">
        <WorkoutHeader
          title={workout.name}
          currentExercise={currentExerciseIndex + 1}
          totalExercises={workout.exercises.length}
          onClose={() => setShowCloseConfirm(true)}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 py-6">
            {isResting ? (
              <RestStage
                restTime={restTime}
                onRestTimeChange={setRestTime}
                onSkipRest={() => setIsResting(false)}
              />
            ) : (
              <ExerciseStage
                exercise={exerciseInfo}
                workoutExercise={currentExercise}
                currentSet={currentSet}
                timer={timer}
                isPaused={isPaused}
                onTogglePause={handleTogglePause}
                onCompleteSet={handleCompleteSet}
                onSkipExercise={handleSkipExercise}
              />
            )}
          </div>
        </main>

        <AnimatePresence>
          {showCloseConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-sm bg-white rounded-2xl p-6"
              >
                <div className="flex items-start gap-3 mb-6">
                  <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={24} />
                  <div>
                    <h3 className="dark:text-black text-lg font-semibold">Прервать тренировку?</h3>
                    <p className="text-gray-600 mt-1">
                      Весь прогресс будет потерян. Вы уверены?
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCloseConfirm(false)}
                    className="dark:text-black flex-1 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 active:bg-gray-100 font-medium"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 active:bg-red-700 font-medium"
                  >
                    Прервать
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}