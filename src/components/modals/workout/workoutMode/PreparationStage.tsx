import { motion } from "framer-motion";
import { Exercise } from "../../../../storage/exercise";
import { CircularTimer } from "../../../shared";
import { workoutAnnouncer } from "../../../../utils/tts";
import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { ttsAtom } from "../../../../storage/user";

interface Props {
    preparationTime: number;
    firstExercise: Exercise;
}
  
export const PreparationStage: React.FC<Props> = ({ preparationTime, firstExercise }) => {
  const ttsEnabled = useAtomValue(ttsAtom);
  
  useEffect(() => {
    if (!ttsEnabled) return;
    workoutAnnouncer.announcePreparation(preparationTime, firstExercise);
  }, [preparationTime, firstExercise, ttsEnabled]);

  useEffect(() => {
    return () => {
      workoutAnnouncer.stop();
    };
  }, []);
    return (
      <div className="fixed inset-0 bg-gray-100 z-50 flex items-center justify-center">

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
        <h2 className="text-2xl dark:text-black font-bold">{firstExercise.name}</h2>
        <p className="text-gray-600">
          Первое упражнение
        </p>
          <div className="flex justify-center mt-8">
            <CircularTimer
              duration={5}
              currentTime={preparationTime}
              isPreparation
            />
          </div>
        </motion.div>
      </div>
    );
}