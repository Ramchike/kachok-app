import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { ActivityDay } from "../../storage/statistic";
import { IoIosArrowForward } from "react-icons/io";


interface Props {
    days: ActivityDay[];
    currentStreak: number;
    maxStreak: number;
    totalWorkouts: number;
    totalExercises: number;
    totalTime: number;
    onOpenFullCalendar: () => void;
}
  
export const ActivityCalendar: React.FC<Props> = ({ 
    days, 
    currentStreak,
    maxStreak,
    totalWorkouts,
    totalExercises,
    onOpenFullCalendar 
  }) => {
    const today = new Date();
    const uniqueWorkoutDays = days.filter(day => day.hasWorkout).length;
    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(date.getDate() - date.getDay() + i + 1); 
        return date.toLocaleDateString('ru-RU', { weekday: 'short' });
    });
  
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-4 shadow-sm lg:hover:shadow-lg transition-shadow cursor-pointer"
        onClick={onOpenFullCalendar}
      >

        <div className="flex  items-center gap-3 mb-4">
          <div className={`w-10 h-10 ${currentStreak > 0 ? 'bg-orange-500' : 'bg-gray-400'} rounded-xl flex items-center justify-center`}>
            <Flame className={`text-white ${currentStreak > 0 && 'fill-white'}`} size={20} />
          </div>
          <div>
          <div className="text-lg font-bold text-gray-900">
              {currentStreak} {
                (currentStreak % 10 === 1 && currentStreak % 100 !== 11) ? 'день' :
                (currentStreak % 10 >= 2 && currentStreak % 10 <= 4 && (currentStreak % 100 < 12 || currentStreak % 100 > 14)) ? 'дня' :
                'дней'
              } без перерыва
            </div>
            <div className="text-sm text-gray-600">
              Рекорд — {maxStreak} {
                (maxStreak % 10 === 1 && maxStreak % 100 !== 11) ? 'день' :
                (maxStreak % 10 >= 2 && maxStreak % 10 <= 4 && (maxStreak % 100 < 12 || maxStreak % 100 > 14)) ? 'дня' :
                'дней'
              }
            </div>
          </div>
        </div>
  

        <div className="dark:text-black flex items-center gap-4 mb-6">
          <div>
            <div className="text-2xl font-bold">{totalWorkouts}</div>
            <div className="text-sm text-gray-600">
              {totalWorkouts % 10 === 1 && totalWorkouts % 100 !== 11 ? 'тренировка' :
              totalWorkouts % 10 >= 2 && totalWorkouts % 10 <= 4 && (totalWorkouts % 100 < 12 || totalWorkouts % 100 > 14) ? 'тренировки' : 'тренировок'}
            </div>
          </div>
          <div className="w-px h-12 bg-gray-200" />
          <div>
            <div className="text-2xl font-bold">{totalExercises}</div>
            <div className="text-sm text-gray-600">
              {totalExercises % 10 === 1 && totalExercises % 100 !== 11 ? 'упражнение' :
              totalExercises % 10 >= 2 && totalExercises % 10 <= 4 && (totalExercises % 100 < 12 || totalExercises % 100 > 14) ? 'упражнения' : 'упражнений'}
            </div>
          </div>
          <div className="w-px h-12 bg-gray-200" />
          <div>
            <div className="text-2xl font-bold">{uniqueWorkoutDays}</div>
            <div className="text-sm text-gray-600">
              {uniqueWorkoutDays % 10 === 1 && uniqueWorkoutDays % 100 !== 11 ? 'день' :
              uniqueWorkoutDays % 10 >= 2 && uniqueWorkoutDays % 10 <= 4 && (uniqueWorkoutDays % 100 < 12 || uniqueWorkoutDays % 100 > 14) ? 'дня' : 'дней'}
            </div>
          </div>
          <IoIosArrowForward size={18} className="text-gray-400 relative left-14"/>
        </div>

  
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((dayName, index) => {
            const day = days[index];
            const isToday = index === today.getDay() - 1;
  
            return (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: index * 0.05 
                }}
                className={`
                  aspect-square rounded-lg flex items-center justify-center transition-colors relative
                  ${day?.hasWorkout 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }
                  ${isToday ? 'ring-2 ring-blue-500' : ''}
                `}
              >
                <span className="text-sm font-medium">{dayName}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );
}