import { motion } from "framer-motion";
import { tagList } from "../../storage/exercise";
import { TagStat } from "../../storage/statistic";

interface Props {
    tagStats: TagStat[];
  }
  
export const TagsProgress: React.FC<Props> = ({ tagStats }) =>{
    const sortedStats = [...tagStats].sort((a, b) => b.value - a.value);
  
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-4 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-6">
          <h3 className="dark:text-black font-medium text-lg">Сводка по типам тренировок</h3>
        </div>
        
        <div className="space-y-4">
          {sortedStats.map((stat, i) => {
            const tagInfo = tagList.find(t => t.id === stat.id);
            if (!tagInfo) return null;
            
            const Icon = tagInfo.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 ${tagInfo.color} rounded-lg flex items-center justify-center`}>
                      <Icon size={18} className="text-white" />
                    </div>
                    <span className="dark:text-gray-600 font-medium">{tagInfo.name}</span>
                  </div>
                  <span className="text-gray-600">
                    {stat.value} {
                      (stat.value % 10 === 1 && stat.value % 100 !== 11) ? 'раз' :
                      (stat.value % 10 >= 2 && stat.value % 10 <= 4 && (stat.value % 100 < 12 || stat.value % 100 > 14))
                       ? 'раза' :'раз'
                    }
                  </span>
                </div>
                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className={`absolute inset-y-0 left-0 ${tagInfo.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(stat.value / Math.max(...tagStats.map(s => s.value))) * 100}%` }}
                    transition={{ 
                      type: "spring",
                      stiffness: 50,
                      damping: 10,
                      delay: i * 0.1 
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );
}