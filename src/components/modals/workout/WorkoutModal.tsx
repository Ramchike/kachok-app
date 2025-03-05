import { Pin, Trash2, X, AlertTriangle, Edit2, Play } from "lucide-react";
import { useState } from "react";
import {difficultyOptions, tagList, exerciseListAtom } from "../../../storage/exercise";
import { Workout } from "../../../storage/workout";
import { DifficultyMeter } from "../../shared";
import { useAtom } from "jotai";
import { motion, AnimatePresence } from "framer-motion";


interface Props {
  workout: Workout;
  onClose: () => void;
  onPin: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onStart: () => void;
}
  
export const WorkoutModal: React.FC<Props> = ({ 
    workout, 
    onClose, 
    onPin, 
    onDelete, 
    onEdit,
    onStart 
    }) => {
    const [exercises] = useAtom(exerciseListAtom)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    
    const getExerciseById = (id: number) => {
      return exercises.find(ex => ex.id === id);
    };
  
    return (
      <motion.div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 touch-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
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
            className="h-full sm:h-auto sm:max-h-[90vh] w-full max-w-2xl mx-auto bg-white sm:rounded-2xl flex flex-col"
          >
            <div className="flex-shrink-0 flex items-center gap-3 p-4 border-b border-gray-200">
              <h2 className="dark:text-black text-xl font-bold line-clamp-1 flex-1">{workout.name}</h2>
              <button
                onClick={onPin}
                className={`p-2 rounded-lg transition-colors ${
                  workout.isPinned
                    ? 'text-blue-500 hover:bg-blue-50'
                    : 'text-gray-400 hover:bg-gray-100'
                }`}
                title={workout.isPinned ? 'Открепить' : 'Закрепить'}
              >
                <Pin size={20} className={workout.isPinned ? 'fill-current' : ''} />
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
  
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {workout.description && (
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-gray-600"
                >
                  {workout.description}
                </motion.p>
              )}
  
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex flex-col gap-4"
              >
                <section>
                  <p className="font-medium text-gray-700 mb-2 dark:text-black">Сложность:</p>
                  <div className="flex items-center gap-3">
                    <DifficultyMeter difficulty={workout.difficulty} />
                    <span className="text-sm text-gray-600">
                      {difficultyOptions[workout.difficulty]}
                    </span>
                  </div>
                </section>
                <div className="flex flex-wrap gap-1">
                  {workout.tags.map(tagId => {
                    const tag = tagList.find(t => t.id === tagId);
                    if (!tag) return null;
                    const Icon = tag.icon;
                    return (
                      <motion.div
                        key={tag.id}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`h-8 px-3 ${tag.color} rounded-lg flex items-center gap-1.5 text-white text-sm`}
                      >
                        <Icon size={16} />
                        <span>{tag.name}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
  
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <h3 className="font-medium text-gray-900 mb-3">Упражнения</h3>
                <div className="space-y-3">
                  {workout.exercises.map((exercise, index) => {
                    const ex = getExerciseById(exercise.exerciseId);
                    if (!ex) return null;
                    return (
                      <motion.div
                        key={`${workout.id}-${index}`}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex dark:text-black items-center gap-3 p-3 bg-gray-50 rounded-xl"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={ex.image}
                            alt={ex.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{ex.name}</div>
                          <div className="text-sm text-gray-600">
                            {exercise.sets} × {exercise.time ? `${exercise.time} сек` : `${exercise.reps} повт.`}
                            {exercise.weight && ` • ${exercise.weight} кг`}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
  
            <div className="flex-shrink-0 p-4 border-t border-gray-200">
              <AnimatePresence mode="wait">
                {showDeleteConfirm ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="bg-red-50 dark:bg-gray-50 dark:text-black p-4 rounded-xl"
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                      <div className="flex-1">
                        <h3 className="font-medium text-red-900">Удалить тренировку?</h3>
                        <p className="text-sm text-red-700 mt-1">
                          Это действие нельзя будет отменить.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowDeleteConfirm(false)}
                        className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 active:bg-gray-100 touch-manipulation font-medium"
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
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="flex gap-3"
                  >
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={onEdit}
                      className="flex-1 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 active:bg-gray-100 touch-manipulation font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <Edit2 size={20} className="text-gray-500" />
                      <span className="dark:text-black">Редактировать</span>
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={onStart}
                      className="flex-1 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 active:bg-blue-700 touch-manipulation font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <Play size={20} />
                      <span>Начать</span>
                    </motion.button>
                  </motion.div>
                  
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>
  );
}