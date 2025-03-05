import { motion } from "framer-motion";
import { FavoriteWorkout } from "../../storage/statistic";
import { GiHeartWings, GiHearts } from "react-icons/gi";

interface Props {
    workouts: FavoriteWorkout[];
}
  
export const FavoriteWorkouts: React.FC<Props> = ({ workouts }) => {
    const sortedWorkouts = [...workouts].sort((a, b) => b.usageCount - a.usageCount);
    const maxCount = Math.max(...workouts.map(w => w.usageCount));
  
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-4 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-6">
          <h3 className="dark:text-black font-medium text-lg">Любимые тренировки</h3>
        </div>
  
        <div className="space-y-4">
          {sortedWorkouts.map((workout, i) => (
            <motion.div
              key={workout.name}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="relative flex items-center">
                <div className="w-10 h-10 bg-amber-100 dark:bg-gray-100 rounded-xl flex items-center justify-center">
                  {i === 0 ? <GiHeartWings className="text-amber-500" size={32}/> : <GiHearts className="text-amber-500" size={18}/>}
                </div>
              </div>
  
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="dark:text-gray-600 font-medium truncate">{workout.name}</h4>
                  <span className="text-sm text-gray-600 flex-shrink-0">
                    {workout.usageCount} раз
                  </span>
                </div>
                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-amber-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(workout.usageCount / maxCount) * 100}%` }}
                    transition={{ 
                      type: "spring",
                      stiffness: 50,
                      damping: 10,
                      delay: i * 0.1 
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }