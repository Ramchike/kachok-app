import { motion } from "framer-motion";
import React from "react";
import { motivationalQuotes, WorkoutStats } from "../../../../storage/workout";
import { calculateRewards } from "../../../../utils/workoutHelper";
import { IoMdTime } from "react-icons/io";
import { GrMoney } from "react-icons/gr";
import { LuBicepsFlexed } from "react-icons/lu";
import { FaCheckDouble } from "react-icons/fa6";
import { BsFillAwardFill } from "react-icons/bs";

interface Props {
  stats: WorkoutStats
  onClose: () => void;
}

export const StatsStage: React.FC<Props> = ({ stats, onClose }) => {
    const {coins, experience} = calculateRewards(stats)
    const randomQuote = React.useMemo(() => {
      const index = Math.floor(Math.random() * motivationalQuotes.length);
      return motivationalQuotes[index];
    }, []);
  
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-500 to-purple-600 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-xl">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-6 text-center"
          >
            <div className="w-20 h-20 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <BsFillAwardFill size={40} className="text-white" />
            </div>
  
            <h2 className="text-2xl dark:text-black font-bold mb-2">Тренировка завершена!</h2>
            <p className="text-gray-600 mb-8">{randomQuote}</p>
  
            <div className="grid grid-cols-2 gap-4 mb-8">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-50 rounded-xl p-4"
              >
                <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <GrMoney size={24} className="text-white" />
                </div>
                <div className="text-sm text-gray-600 mb-1">Получено монет</div>
                <div className="text-2xl dark:text-black font-bold">{coins} </div>
              </motion.div>
  
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gray-50 rounded-xl p-4"
              >
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <LuBicepsFlexed size={24} className="text-white" />
                </div>
                <div className="text-sm text-gray-600 mb-1">Получено опыта</div>
                <div className="text-2xl dark:text-black font-bold">{experience}</div>
              </motion.div>
  
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-50 rounded-xl p-4"
              >
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <FaCheckDouble size={24} className="text-white" />
                </div>
                <div className="text-sm text-gray-600 mb-1">Выполнено упражнений</div>
                <div className="text-2xl dark:text-black font-bold">
                  {stats.completedExercises} из {stats.completedExercises + stats.skippedExercises}
                </div>
              </motion.div>
  
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-gray-50 rounded-xl p-4"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <IoMdTime size={24} className="text-white" />
                </div>
                <div className="text-sm text-gray-600 mb-1">Тренировка длилась</div>
                <div className="text-2xl dark:text-black font-bold">{stats.totalTime} мин</div>
              </motion.div>
            </div>
  
            <button
              onClick={onClose}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 active:from-blue-700 active:to-blue-800 font-medium transition-all duration-200"
            >
              Завершить
            </button>
          </motion.div>
        </div>
      </div>
    );
}