import { motion } from "framer-motion";
import { Achievement } from "../../storage/achievements";

interface Props {
    achievements: Achievement[];
    onOpenFullAchievements: () => void;
  }
  
export const AchievementsWidget: React.FC<Props> = ({ achievements, onOpenFullAchievements }) => {
    const inProgressAchievements = achievements.filter(a => !a.completed);
    const randomIndex = Math.floor(Math.random() * inProgressAchievements.length);
    const achievement = inProgressAchievements[randomIndex] || achievements[0];
    const remainingAchievements = achievements.length - achievements.filter(a => a.completed).length;

    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white lg:max-w-sm rounded-2xl p-4 shadow-sm cursor-pointer lg:hover:shadow-lg transition-shadow"
        onClick={onOpenFullAchievements}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="dark:text-black font-medium text-lg">Достижения</h3>
          </div>
          <div className="flex items-center gap gap-1 text-sm">
            <span className="font-medium text-green-600">
              {achievements.filter(a => a.completed).length}
            </span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{achievements.length}</span>
          </div>
        </div>
  
        <div 
          className={`
            flex items-center gap-3 p-3 rounded-xl transition-colors
            ${achievement.completed ? 'bg-green-50' : 'bg-gray-50'}
          `}
        >
          <div className={`w-12 h-12 ${achievement.color} rounded-xl flex items-center justify-center`}>
            <achievement.icon size={24}/>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <div className="dark:text-black font-medium truncate">{achievement.name}</div>
              {achievement.completed && (
                <div className="flex-shrink-0 text-xs text-green-600 font-medium px-2 py-0.5 bg-green-100 rounded-full">
                  Выполнено
                </div>
              )}
            </div>
            <div className="text-sm text-gray-600 mt-0.5 mb-2">{achievement.description}</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                  className={`h-full ${achievement.completed ? 'bg-green-500' : 'bg-blue-500'}`}
                />
              </div>
              <span className="text-xs font-medium text-gray-600">
                {achievement.progress}/{achievement.total}
              </span>
            </div>
          </div>
        </div>
        {remainingAchievements > 0 && (
        <div className="mt-3 text-sm text-gray-600 text-center">
          Еще {remainingAchievements} {
            remainingAchievements === 1 ? 'достижение' :
            remainingAchievements < 5 ? 'достижения' : 'достижений'
          } 
        </div>
      )}
      </motion.div>
    );
}