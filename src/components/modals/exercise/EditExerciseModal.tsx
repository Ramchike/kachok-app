import React, { useState } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';
import { Exercise, Difficulty, difficultyOptions, equipmentList, tagList} from '../../../storage/exercise';
import { motion } from 'framer-motion';
import { uploadImage } from '../../../api';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  exercise: Exercise;
  setExercise: (e: Exercise) => void
}

export const EditExerciseModal: React.FC<Props> = ({ isOpen, onClose, exercise, setExercise }) => {

  const [name, setName] = useState(exercise.name);
  const [instruction, setInstruction] = useState(exercise.instruction);
  const [difficulty, setDifficulty] = useState<Difficulty>(exercise.difficulty);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>(exercise.equipment);
  const [selectedTags, setSelectedTags] = useState<string[]>(exercise.tags);
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [previewUrl, setPreviewUrl] = useState<string>(exercise.image || '');
  const [isImageChanged, setImageChanged] = useState(false)
  const isValid = name.trim().length > 0 && selectedTags.length > 0

  if (!isOpen) return null;

  const updateExercise = (imageLink?: string) => {
    const newExercise = {
      id: exercise.id,
      difficulty,
      equipment: selectedEquipment,
      instruction,
      name,
      tags: selectedTags,
      image: isImageChanged ? imageLink : exercise.image,
      is_pined: exercise.is_pined
    };
    setExercise(newExercise);
    onClose();
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageChanged(true)
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = () => {
    if (imageFile) {
      uploadImage(imageFile)
        .then(imageLink => updateExercise(imageLink))
        .catch(() => updateExercise());
    } else {
      updateExercise();
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 touch-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="fixed inset-0 sm:flex sm:items-center sm:justify-center sm:p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="h-full sm:h-[90vh] w-full max-w-2xl mx-auto bg-white sm:rounded-2xl flex flex-col"
        >
          <div className="flex-shrink-0 flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-lg dark:text-black font-bold">Редактировать упражнение</h2>
            <button
              onClick={onClose}
              className="p-2 -mr-2 hover:bg-gray-100 active:bg-gray-200 rounded-full touch-manipulation"
            >
              <X className='dark:text-black' size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-6">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Название <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="dark:text-black w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Инструкция
                </label>
                <textarea
                  value={instruction}
                  onChange={(e) => setInstruction(e.target.value)}
                  className="dark:text-black w-full resize-none px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                />
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">Сложность</label>
                <div className="flex h-12 rounded-lg overflow-hidden">
                  {[1, 2, 3].map((level) => {
                    const isSelected = difficulty === level;
                    return (
                      <motion.button
                        key={level}
                        type="button"
                        onClick={() => setDifficulty(level as Difficulty)}
                        whileTap={{ scale: 0.95 }}
                        className={`
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
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Оборудование
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                  {equipmentList.map((equipment) => {
                    const Icon = equipment.icon;
                    const isSelected = selectedEquipment.includes(equipment.id);
                    return (
                      <motion.button
                        key={equipment.id}
                        type="button"
                        onClick={() => {
                          setSelectedEquipment(prev =>
                            prev.includes(equipment.id)
                              ? prev.filter(id => id !== equipment.id)
                              : [...prev, equipment.id]
                          );
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="flex flex-col items-center gap-1 touch-manipulation"
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
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Область внимания <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                  {tagList.map((tag) => {
                    const Icon = tag.icon;
                    const isSelected = selectedTags.includes(tag.id);
                    return (
                      <motion.button
                        key={tag.id}
                        type="button"
                        onClick={() => {
                          setSelectedTags(prev =>
                            prev.includes(tag.id)
                              ? prev.filter(id => id !== tag.id)
                              : [...prev, tag.id]
                          );
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="flex flex-col items-center gap-1 touch-manipulation"
                      >
                        <div className={`
                          w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-200
                          ${isSelected ? tag.color : 'bg-gray-100'}
                          ${isSelected ? 'text-white' : 'text-gray-600'}
                        `}>
                          <Icon size={24} />
                        </div>
                        <span className={`
                          text-xs text-center transition-colors duration-200
                          ${isSelected ? 'text-gray-900 font-medium' : 'text-gray-600'}
                        `}>
                          {tag.name}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Изображение
                </label>
                <div className="space-y-2">
                  <label 
                    className="block w-full aspect-video relative rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors cursor-pointer overflow-hidden group touch-manipulation"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {previewUrl ? (
                      <img 
                        src={previewUrl} 
                        alt="Предпросмотр"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 group-hover:text-blue-500 transition-colors">
                        <ImageIcon size={32} className="mb-2" />
                        <span className="text-sm font-medium">Нажмите или перетащите файл</span>
                      </div>
                    )}
                  </label>
                  {imageFile && (
                    <p className="text-sm text-gray-500">
                      Выбран файл: {imageFile.name}
                    </p>
                  )}
                </div>
              </motion.div>
            </div>
          </form>

          <div className="flex-shrink-0 flex gap-3 p-4 border-t border-gray-200">
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={onClose}
              className="dark:text-black flex-1 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 active:bg-gray-100 touch-manipulation font-medium transition-colors duration-200"
            >
              Отмена
            </motion.button>
            <motion.button
              whileTap={isValid ? { scale: 0.95 } : undefined}
              onClick={handleSubmit}
              disabled={!isValid}
              className={`flex-1 py-3 rounded-xl font-medium transition-colors duration-200 ${
                isValid
                  ? 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              Сохранить
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}