
import { DifficultyMeter } from '../../shared/DifficultyMeter';
import { X, Dumbbell, Pin, Trash2, AlertTriangle } from 'lucide-react';
import { EditExerciseModal } from './EditExerciseModal';
import { useCallback, useMemo, useState } from 'react';
import { difficultyOptions, equipmentList, Exercise, exerciseListAtom, tagList } from '../../../storage/exercise';
import { useAtom } from 'jotai';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  exercise_id: number;
  onClose: () => void;
}

export const ExerciseModal:React.FC<Props> = ({ exercise_id, onClose}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [exerciseList, setExerciseList] = useAtom(exerciseListAtom)

  const exercise = useMemo(() => {
    return exerciseList.find(e => e.id === exercise_id);
  }, [exerciseList, exercise_id]);

  const updateExercise = useCallback((updatedExercise: Exercise) => {
    setExerciseList(prevList => {
      return prevList.map(e =>
        e.id === exercise_id ? updatedExercise : e
      );
    });
  }, [setExerciseList, exercise_id]);

  const onDelete = () => {
    setExerciseList(prevList => {
      return prevList.filter(e => e.id !== exercise_id);
    });
    setShowDeleteConfirm(false)
    onClose()
  }

  const onPin = () => {
    setExerciseList(prevList => 
      prevList.map(e => 
        e.id === exercise_id
          ? { ...e, is_pined: !e.is_pined }
          : e
      )
    );
  }

  if (exercise) {
    const getEquipment = () => {
      return exercise.equipment
        .map(eqId => equipmentList.find(e => e.id === eqId))
        .filter(Boolean);
    };
  
    const getTags = () => {
      return exercise.tags
        .map(tagId => tagList.find(t => t.id === tagId))
        .filter(Boolean);
    };
  
    return (
      <>
        <motion.div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 touch-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div  className="fixed inset-0 sm:flex sm:items-center sm:justify-center sm:p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose();
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="h-full sm:max-h-[90vh] w-full max-w-2xl mx-auto bg-white sm:rounded-2xl flex flex-col"
            >
              <div className="flex-shrink-0 flex items-center gap-3 p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold dark:text-black line-clamp-1 flex-1">{exercise.name}</h2>
                <button
                  onClick={onPin}
                  className={`p-2 rounded-lg transition-colors ${
                    exercise.is_pined
                      ? 'text-blue-500 hover:bg-blue-50'
                      : 'text-gray-400 hover:bg-gray-100'
                  }`}
                  title={exercise.is_pined ? 'Открепить' : 'Закрепить'}
                >
                  <Pin size={20} className={exercise.is_pined ? 'fill-current' : ''} />
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Удалить"
                >
                  <Trash2 size={20} />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
  
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {exercise.equipment.length > 0 && exercise.equipment[0] !== 'none' && (
                  <div>
                    <div className="flex items-center gap-2 text-gray-700 mb-2">
                      <Dumbbell size={20} className="flex-shrink-0" />
                      <span className="font-medium">Оборудование</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {getEquipment().map(equipment => {
                        if (!equipment) return null;
                        const Icon = equipment.icon;
                        return (
                          <motion.div 
                            key={equipment.id}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex flex-col items-center"
                          >
                            <div className={`w-10 h-10 ${equipment.color} rounded-xl flex items-center justify-center text-white mb-1`}>
                              <Icon size={20} />
                            </div>
                            <span className="text-xs text-gray-600">
                              {equipment.name}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}
  
                <div>
                  <div className="flex items-center gap-2 text-gray-700 mb-2">
                    <span className="dark:text-black font-medium">Область внимания</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {getTags().map(tag => {
                      if (!tag) return null;
                      const Icon = tag.icon;
                      return (
                        <motion.div 
                          key={tag.id}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="flex flex-col items-center"
                        >
                          <div className={`w-10 h-10 ${tag.color} rounded-xl flex items-center justify-center text-white mb-1`}>
                            <Icon size={20} />
                          </div>
                          <span className="text-xs text-gray-600">
                            {tag.name}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
  
                <div>
                  <p className="font-medium text-gray-700 dark:text-black mb-2">Сложность</p>
                  <div className="flex items-center gap-3">
                    <DifficultyMeter difficulty={exercise.difficulty} />
                    <span className="text-sm text-gray-600">
                      {difficultyOptions[exercise.difficulty]}
                    </span>
                  </div>
                </div>
  
                {exercise.image && (
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="items-center aspect-video max-h-lg flex w-full overflow-hidden rounded-xl"
                  >
                    <img
                      src={exercise.image}
                      alt={exercise.name}
                      className="w-full max-h-lg object-cover rounded-xl"
                    />
                  </motion.div>
                )}
  
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                >
                  <h3 className="font-medium text-gray-700 dark:text-black mb-2">Описание:</h3>
                  <p className="text-gray-600 whitespace-pre-line">
                    {exercise.instruction}
                  </p>
                </motion.div>
              </div>
  
              <div className="flex-shrink-0 p-4 border-t border-gray-200">
                <AnimatePresence mode="wait">
                  {showDeleteConfirm ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="bg-red-50 dark:bg-gray-50 p-4 rounded-xl"
                    >
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                        <div className="flex-1">
                          <h3 className="font-medium text-red-900">Удалить упражнение?</h3>
                          <p className="text-sm text-red-700 mt-1">
                            Это действие нельзя будет отменить.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3 mt-4">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowDeleteConfirm(false)}
                          className="dark:text-black flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 active:bg-gray-100 touch-manipulation font-medium"
                        >
                          Отмена
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={onDelete}
                          className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 active:bg-red-700 touch-manipulation font-medium"
                        >
                          Удалить
                        </motion.button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.button 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsEditModalOpen(true)}
                      className="w-full py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 active:bg-blue-700 touch-manipulation font-medium"
                    >
                      Редактировать
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>
  
        <EditExerciseModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          exercise={exercise}
          setExercise={(e: Exercise) => updateExercise(e)}
        />
      </>
    );
  }
}