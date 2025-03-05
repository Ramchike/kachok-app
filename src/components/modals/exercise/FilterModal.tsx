
import { Filter } from 'lucide-react';
import { Difficulty, difficultyOptions, equipmentList, tagList } from '../../../storage/exercise';
import { motion } from 'framer-motion';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedDifficulty: Difficulty[];
  selectedEquipment: string[];
  selectedTags: string[];
  toggleDifficulty: (difficulty: Difficulty) => void;
  toggleEquipment: (equipment: string) => void;
  toggleTag: (tag: string) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

export const FilterModal: React.FC<Props> = ({
  isOpen,
  onClose,
  selectedDifficulty,
  selectedEquipment,
  selectedTags,
  toggleDifficulty,
  toggleEquipment,
  toggleTag,
  clearFilters,
  hasActiveFilters,
}) => {
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
      <div className="fixed inset-x-0 bottom-0 sm:static sm:flex sm:items-center sm:justify-center sm:min-h-screen"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[90vh] overflow-y-auto overscroll-contain touch-auto modal-scroll"
        >
          <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm rounded-t-3xl sm:rounded-t-2xl border-b border-gray-200">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-blue-500" />
                <h2 className="text-lg dark:text-black font-bold">Фильтры</h2>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">Сложность</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="cursor-pointer text-sm text-blue-500 hover:text-blue-600"
                  >
                    Сбросить все
                  </button>
                )}
              </div>
              <div className="flex h-12 rounded-lg overflow-hidden">
                {[1, 2, 3].map((level) => {
                  const isSelected = selectedDifficulty.includes(level as Difficulty);
                  return (
                    <button
                      key={level}
                      onClick={() => toggleDifficulty(level as Difficulty)}
                      className={`cursor-pointer
                        flex-1 flex items-center justify-center
                        text-sm font-medium transition-colors duration-200
                        ${isSelected 
                          ? level === 1 
                            ? 'bg-green-500 text-white' 
                            : level === 2 
                              ? 'bg-yellow-500 text-white'
                              : 'bg-red-500 text-white'
                          : level === 1
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : level === 2
                              ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                              : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }
                        ${level === 1 ? 'rounded-l-lg' : level === 3 ? 'rounded-r-lg' : ''}
                      `}
                    >
                      {difficultyOptions[level as Difficulty]}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">Оборудование</h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                {equipmentList.map((equipment) => {
                  const Icon = equipment.icon;
                  const isSelected = selectedEquipment.includes(equipment.id);
                  return (
                    <motion.button
                      key={equipment.id}
                      onClick={() => toggleEquipment(equipment.id)}
                      whileTap={{ scale: 0.95 }}
                      className="cursor-pointer flex flex-col items-center gap-1 touch-manipulation"
                    >
                      <div className={`
                        w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-200
                        ${isSelected ? equipment.color : 'bg-gray-100'}
                        ${isSelected ? 'text-white' : 'text-gray-600'}
                      `}>
                        <Icon size={24} />
                      </div>
                      <span className={`
                        text-xs text-center transition-colors duration-200
                        ${isSelected ? 'text-gray-900 font-medium' : 'text-gray-600'}
                      `}>
                        {equipment.name}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">Область внимания</h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                {tagList.map((tag) => {
                  const Icon = tag.icon;
                  const isSelected = selectedTags.includes(tag.id);
                  return (
                    <motion.button
                      key={tag.id}
                      onClick={() => toggleTag(tag.id)}
                      whileTap={{ scale: 0.95 }}
                      className="cursor-pointer flex flex-col items-center gap-1 touch-manipulation"
                    >
                      <div className={`
                        w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-200
                        ${isSelected ? tag.color : 'bg-gray-100'}
                        ${isSelected ? 'text-white' : 'text-gray-600'}
                      `}>
                        <Icon size={24} />
                      </div>
                      <span className={`cursor-pointer
                        text-xs text-center transition-colors duration-200
                        ${isSelected ? 'text-gray-900 font-medium' : 'text-gray-600'}
                      `}>
                        {tag.name}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <motion.button
                onClick={onClose}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer flex-1 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 active:bg-blue-700 touch-manipulation font-medium transition-colors duration-200"
              >
                Закрыть
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}