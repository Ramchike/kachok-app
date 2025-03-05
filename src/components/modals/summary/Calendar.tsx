import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useMemo, useState } from "react";

interface WorkoutHistory {
    date: string;
    name: string;
    duration: number;
    exercises: number;
}  

interface Props {
    isOpen: boolean;
    onClose: () => void;
    workoutHistory: WorkoutHistory[];
}
  
export const FullCalendarModal: React.FC<Props> = ({ isOpen, onClose, workoutHistory }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const calendarData = useMemo(() => {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay() || 7;

    return Array.from({ length: 42 }, (_, i) => {
      const dayNumber = i - (startingDay - 2);
      if (dayNumber < 0 || dayNumber >= daysInMonth) return null;
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber + 1);
      const hasWorkout = workoutHistory.some(w => {
        const workoutDate = new Date(w.date);
        return workoutDate.toDateString() === date.toDateString();
      });
      return { date, hasWorkout };
    });
  }, [currentDate, workoutHistory]);

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  if (!isOpen) return null;

  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  
    const workoutsByDate = workoutHistory.reduce((acc, workout) => {
      const date = new Date(workout.date).toLocaleDateString('ru-RU');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(workout);
      return acc;
    }, {} as Record<string, WorkoutHistory[]>);
  
    return (
      <motion.div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 touch-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="fixed inset-0 sm:flex sm:items-center sm:justify-center sm:p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="h-full sm:h-[90vh] w-full max-w-2xl mx-auto bg-white sm:rounded-2xl flex flex-col"
          >
            <div className="flex-shrink-0 flex justify-between items-center p-4 border-b border-gray-300">
              <div className="flex items-center gap-2">
                <h2  className="dark:text-black text-lg font-bold">История тренировок</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 -mr-2 hover:bg-gray-100 active:bg-gray-200 rounded-full touch-manipulation"
              >
                <X className="dark:text-black" size={20} />
              </button>
            </div>
  
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 border-b border-gray-300">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className='p-2 rounded-lg transition-colors hover:bg-gray-100 text-gray-700'

            
                  >
                    <ChevronLeft className="dark:text-black" size={20} />
                  </button>
                  <div className="text-xl dark:text-black font-bold">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </div>
                  <button
                    onClick={() => navigateMonth('next')}
                    className='p-2 rounded-lg transition-colors hover:bg-gray-100 text-gray-700'
            
                  >
                    <ChevronRight className="dark:text-black" size={20} />
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {weekDays.map(day => (
                    <div key={day} className="text-center text-sm text-gray-500 py-1">
                      {day}
                    </div>
                  ))}
                  {calendarData.map((day, i) => {
                    const isToday = day?.date.toDateString() === new Date().toDateString();
                    return (
                      <div
                        key={i}
                        className={`
                          aspect-square sm:aspect-video flex items-center justify-center rounded-lg text-sm
                          ${!day ? 'invisible' : ''}
                          ${day?.hasWorkout 
                            ? 'bg-green-500 text-white' 
                            : day ? 'bg-gray-100 text-gray-600' : ''
                          }
                          ${isToday ? 'ring-2 ring-blue-500' : ''}
                        `}
                      >
                        {day?.date.getDate()}
                      </div>
                    );
                  })}
                </div>
              </div>
  
              <div className="p-4">
                <h3 className="font-bold text-lg dark:text-black mb-4">Все тренировки</h3>
                <div className="space-y-4">
                  {Object.entries(workoutsByDate).map(([date, workouts]) => (
                    <div key={date}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <h4 className="dark:text-black font-medium">{date}</h4>
                      </div>
                      <div className="space-y-2 pl-4">
                        {workouts.map((workout, index) => (
                          <motion.div
                            key={index}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-50 rounded-xl p-3"
                          >
                            <div className="font-medium dark:text-black mb-1">{workout.name}</div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span>{workout.duration} мин</span>
                              <span>x</span>
                              <span>{workout.exercises} упражнений</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }