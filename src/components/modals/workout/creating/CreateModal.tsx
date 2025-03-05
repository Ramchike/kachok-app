import { X } from "lucide-react";
import { useState, useEffect } from "react";
import {  Exercise, exerciseListAtom} from "../../../../storage/exercise";
import { Workout, WorkoutExercise } from "../../../../storage/workout";
import { calculateRecommendedReps, calculateRecommendedWeight, calculateWorkoutDifficulty, checkWorkoutSafety } from "../../../../utils/workoutHelper";
import { useAtom } from "jotai";
import { userInfoAtom } from "../../../../storage/user";
import { WorkoutAddStageExercises} from "./AddExercisesStage";
import { WorkoutAddStageInfo } from "./InfoStage";
import { WorkoutActions } from "./Buttons";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSave: (workout: Omit<Workout, 'id' | 'createdAt' | 'timesUsed'>) => void;
    onSaveAndStart: (workout: Omit<Workout, 'id' | 'createdAt' | 'timesUsed'>) => void;
    onStart: (workout: Omit<Workout, 'id' | 'createdAt' | 'timesUsed'>) => void;
    workout?: Workout;
}
  
export const CreateWorkoutModal: React.FC<Props> = ({ 
    isOpen, 
    onClose,
    onSave,
    onSaveAndStart,
    onStart,
    workout
  }) => {
    const [allExercises] = useAtom(exerciseListAtom)
    const [user] = useAtom(userInfoAtom)
    const [step, setStep] = useState<'info' | 'exercises'>('info');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
    const [safetyWarnings, setSafetyWarnings] = useState<{ [key: string]: string }>({});
    const [, setIsAutoSelecting] = useState(false);
  
    useEffect(() => {
      if (isOpen && workout) {
        setName(workout.name);
        setDescription(workout.description || '');
        setSelectedTags(workout.tags);
        setExercises(workout.exercises);
      } else if (!isOpen) {
        setStep('info');
        setName('');
        setDescription('');
        setSelectedTags([]);
        setExercises([]);
        setSafetyWarnings({});
        setIsAutoSelecting(false);
      }
    }, [isOpen, workout]);
  
    const addExercise = (exercise: Exercise) => {
      const recommendedReps = calculateRecommendedReps(exercise);
      const recommendedWeight =  calculateRecommendedWeight(exercise, user)
  
      const newExercise: WorkoutExercise = {
        exerciseId: exercise.id,
        sets: 1,
        reps: recommendedReps,
        weight: recommendedWeight
      };
  
      setExercises(prev => [...prev, newExercise]);
    };
  
    const autoSelectExercises = () => {
      setIsAutoSelecting(true);
      setExercises([]);
      
      const matchingExercises = allExercises.filter(exercise =>
        exercise.tags.some(tag => selectedTags.includes(tag))
      );
  
      const selectedCount = Math.min(4, matchingExercises.length);
      const shuffled = [...matchingExercises].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, selectedCount);
  
      selected.forEach(exercise => {
        addExercise(exercise);
      });
  
      setIsAutoSelecting(false);
    };
  
    const updateExercise = (index: number, updates: Partial<WorkoutExercise>) => {
      const updatedExercises = [...exercises];
      updatedExercises[index] = { ...updatedExercises[index], ...updates };
  
      const exercise = allExercises.find(ex => ex.id === updatedExercises[index].exerciseId);
      if (exercise) {
        const safety = checkWorkoutSafety(updatedExercises[index], exercise);
        if (!safety.safe && safety.message) {
          setSafetyWarnings({ ...safetyWarnings, [index]: safety.message });
        } else {
          const newWarnings = { ...safetyWarnings };
          delete newWarnings[index];
          setSafetyWarnings(newWarnings);
        }
      }
  
      setExercises(updatedExercises);
    };
  
    const removeExercise = (index: number) => {
      setExercises(exercises.filter((_, i) => i !== index));
      const newWarnings = { ...safetyWarnings };
      delete newWarnings[index];
      setSafetyWarnings(newWarnings);
    };
  
    const calculateEstimatedTime = () => {
      return exercises.reduce((total, exercise) => {
        return total + exercise.sets;
      }, 0);
    };
  
    const handleSave = (action: 'save' | 'saveAndStart' | 'start') => {
      const exerciseInfos = exercises.map(ex => 
        allExercises.find(e => e.id === ex.exerciseId)
      ).filter((e): e is Exercise => e !== undefined);
  
      const difficulty = calculateWorkoutDifficulty(exercises, exerciseInfos);
  
      const workoutData = {
        name,
        description,
        exercises,
        tags: selectedTags,
        difficulty,
        estimatedTime: calculateEstimatedTime(),
        lastUsed: action === 'start' ? new Date().toISOString() : undefined,
        isPinned: workout?.isPinned || false
      };
  
      switch (action) {
        case 'save':
          onSave(workoutData);
          break;
        case 'saveAndStart':
          onSaveAndStart(workoutData);
          break;
        case 'start':
          onStart(workoutData);
          break;
      }
    };
  
    if (!isOpen) return null;
  
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
            <div className="flex-shrink-0 flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="dark:text-black text-lg font-bold">
                {workout ? 'Редактировать тренировку' : 'Новая тренировка'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 -mr-2 hover:bg-gray-100 active:bg-gray-200 rounded-full touch-manipulation"
              >
                <X className="dark:text-black" size={20} />
              </button>
            </div>
  
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {step === 'info' ? (
                  <motion.div
                    key="info"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <WorkoutAddStageInfo
                      name={name}
                      onNameChange={setName}
                      description={description}
                      onDescriptionChange={setDescription}
                      selectedTags={selectedTags}
                      onTagsChange={setSelectedTags}
                      onNext={() => setStep('exercises')}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="exercises"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <WorkoutAddStageExercises
                      exercises={exercises}
                      selectedTags={selectedTags}
                      safetyWarnings={safetyWarnings}
                      onUpdateExercise={updateExercise}
                      onRemoveExercise={removeExercise}
                      onAddExercise={addExercise}
                      onAutoSelect={autoSelectExercises}
                      onBack={() => setStep('info')}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
  
            {step === 'exercises' && exercises.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <WorkoutActions
                  onSave={() => handleSave('save')}
                  onSaveAndStart={() => handleSave('saveAndStart')}
                  onStart={() => handleSave('start')}
                  isEditing={!!workout}
                />
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
  );
}