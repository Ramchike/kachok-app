import { motion } from "framer-motion";
import { Play, SkipForward, Pause } from "lucide-react";
import { Exercise } from "../../../../storage/exercise";
import { WorkoutExercise } from "../../../../storage/workout";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { workoutAnnouncer } from "../../../../utils/tts";
import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { ttsAtom } from "../../../../storage/user";

interface Props {
  exercise: Exercise;
  workoutExercise: WorkoutExercise;
  currentSet: number;
  timer: number;
  isPaused: boolean;
  onTogglePause: () => void;
  onCompleteSet: () => void;
  onSkipExercise: () => void;
}
  
export const ExerciseStage: React.FC<Props> = ({
  exercise,
  workoutExercise,
  currentSet,
  timer,
  isPaused,
  onTogglePause,
  onCompleteSet,
  onSkipExercise
  }) => {
    const ttsEnabled = useAtomValue(ttsAtom);

    useEffect(() => {
      if (!ttsEnabled) return;
      workoutAnnouncer.announceExerciseStart(exercise);
    }, [exercise, ttsEnabled]);
  
    useEffect(() => {
      if (!ttsEnabled || isPaused) return;
      if (workoutExercise.time && timer > 0) {
        workoutAnnouncer.announceTimer(timer);
      }
    }, [timer, workoutExercise.time, isPaused, ttsEnabled]);
  
    useEffect(() => {
      return () => {
        workoutAnnouncer.stop();
      };
    }, []);
    
    return (
      <div className="flex flex-col items-center">
        <div className="w-full max-w-md sm:max-w-xl aspect-video rounded-2xl overflow-hidden mb-6">
          <img
            src={exercise.image}
            alt={exercise.name}
            className="w-full h-full object-cover"
          />
        </div>
  
        <div className="w-full max-w-2xl text-center mb-6">
          <h2 className="text-2xl font-bold mb-4 dark:text-black">{exercise.name}</h2>
          <p className="text-left text-gray-600">{exercise.instruction}</p>
        </div>
  
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-sm sm:max-w-lg text-center space-y-4 sm:space-y-6"
        >
          <div className="text-lg font-medium text-gray-900">
            Подход {currentSet} из {workoutExercise.sets}
          </div>
  
          {workoutExercise.time ? (
            <>
              <div className="text-7xl font-bold text-gray-900">
                {timer}
                <span className="text-4xl text-gray-500"> с</span>
              </div>
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onTogglePause}
                className={`w-full py-4 ${
                  isPaused 
                    ? 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700' 
                    : 'bg-amber-500 hover:bg-amber-600 active:bg-amber-700'
                } text-white rounded-xl flex items-center justify-center gap-2 font-medium shadow-lg`}
              >
                {isPaused ? (
                  <>
                    <Play size={24} />
                    <span>Продолжить</span>
                  </>
                ) : (
                  <>
                    <Pause size={24} />
                    <span>Пауза</span>
                  </>
                )}
              </motion.button>
            </>
          ) : (
            <>
              <div className="text-4xl sm:text-6xl font-bold w-full text-gray-900">
                {workoutExercise.reps}
                <span className="text-xl sm:text-4xl text-gray-500 ml-2">повторений {workoutExercise.weight && 'по'}</span>
                {workoutExercise.weight}
                {workoutExercise.weight && <span className="text-xl sm:text-4xl text-gray-500"> кг</span> }
              </div>
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onCompleteSet}
                className="w-full py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 active:bg-blue-700 flex items-center justify-center gap-2 font-medium shadow-lg"
              >
                <IoCheckmarkDoneOutline size={24} />
                <span>Завершить подход</span>
              </motion.button>
            </>
          )}
  
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={onSkipExercise}
            className="w-full py-4 text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-100 active:bg-gray-200 flex items-center justify-center gap-2 font-medium transition-colors"
          >
            <SkipForward size={24} />
            <span>Пропустить упражнение</span>
          </motion.button>
        </motion.div>
      </div>
    );
  }