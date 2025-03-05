import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Achievement } from "../../../storage/achievements";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    achievements: Achievement[];
}
  
export const FullAchievementsModal: React.FC<Props> = ({ isOpen, onClose, achievements }) => {
    if (!isOpen) return null;
  
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
                <h2 className="dark:text-black text-lg font-bold">Достижения</h2>
              </div>
              <button
                onClick={onClose}
                className="cursor-pointer p-2 -mr-2 hover:bg-gray-100 active:bg-gray-200 rounded-full touch-manipulation"
              >
                <X className="dark:text-black" size={20} />
              </button>
            </div>
  
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid gap-4">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`
                      p-4 rounded-xl border-2 transition-colors
                      ${achievement.completed 
                        ? 'border-green-500 dark:border-green-900 dark:bg-gray-50 bg-green-50' 
                        : 'border-gray-200 bg-gray-50'
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 ${achievement.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <achievement.icon size={32}/>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium dark:text-black mb-1">{achievement.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                              className={`h-full ${achievement.completed ? 'bg-green-500' : 'bg-blue-500'}`}
                            />
                          </div>
                          <span className="text-sm text-gray-600">
                            {achievement.progress}/{achievement.total}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }