import { Minus, Plus, SkipForward } from "lucide-react";
import { CircularTimer } from "../../../shared";
import { motion } from "framer-motion";
import { workoutAnnouncer } from "../../../../utils/tts";
import { ttsAtom } from "../../../../storage/user";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

interface Props {
  restTime: number;
  onRestTimeChange: (time: number) => void;
  onSkipRest: () => void;
}

export const RestStage: React.FC<Props> = ({ restTime, onRestTimeChange, onSkipRest }) => {
  const ttsEnabled = useAtomValue(ttsAtom);
  const [hasAnnouncedRest, setHasAnnouncedRest] = useState(false);

  useEffect(() => {
    if (!ttsEnabled) return;
    if (restTime === 60 && !hasAnnouncedRest) {
      workoutAnnouncer.announceRest(restTime, true);
      setHasAnnouncedRest(true);
    } else {
      workoutAnnouncer.announceRest(restTime, false);
    }
  }, [restTime, ttsEnabled, hasAnnouncedRest]);

  useEffect(() => {
    return () => {
      workoutAnnouncer.stop();
    };
  }, []);
 
  return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold dark:text-black mb-8">Отдых</h2>
            
            <div className="flex justify-center mb-8">
              <CircularTimer
                duration={60}
                currentTime={restTime}
              />
            </div>
    
            <div className="flex items-center justify-center gap-6 mb-8">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => onRestTimeChange(Math.max(0, restTime - 10))}
                className="w-14 h-14 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
              >
                <Minus size={24} className="text-gray-700" />
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => onRestTimeChange(restTime + 10)}
                className="w-14 h-14 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
              >
                <Plus size={24} className="text-gray-700" />
              </motion.button>
            </div>
    
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onSkipRest}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 active:bg-blue-700 font-medium transition-colors"
            >
              <SkipForward size={20} />
              <span>Пропустить отдых</span>
            </motion.button>
          </motion.div>
        </div>
    );
}