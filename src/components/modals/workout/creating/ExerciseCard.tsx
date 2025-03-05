import { X, Repeat2, Weight, Timer, AlertTriangle } from "lucide-react";
import React from "react";
import { Exercise } from "../../../../storage/exercise";
import { ExerciseType, WorkoutExercise } from "../../../../storage/workout";
import { calculateRecommendedReps, calculateRecommendedWeight } from "../../../../utils/workoutHelper";
import { useAtom } from "jotai";
import { userInfoAtom } from "../../../../storage/user";

interface Props {
  exercise: Exercise;
  workoutExercise: WorkoutExercise;
  onUpdate: (updates: Partial<WorkoutExercise>) => void;
  onRemove: () => void;
  safetyWarning?: string;
}

export const WorkoutExerciseCard: React.FC<Props> = ({
  exercise,
  workoutExercise,
  onUpdate,
  onRemove,
  safetyWarning
}) => {
  const [user] = useAtom(userInfoAtom)
  const [exerciseType, setExerciseType] = React.useState<ExerciseType>(
    workoutExercise.weight !== undefined ? 'weight' : 
    workoutExercise.time !== undefined ? 'time' : 'reps'
  );

  const handleTypeChange = (type: ExerciseType) => {
    setExerciseType(type);
    
    const updates: Partial<WorkoutExercise> = {};
    
    if (type === 'reps') {
      updates.time = undefined;
      updates.weight = undefined;
      updates.reps = calculateRecommendedReps(exercise);
      updates.sets = 1
    } else if (type === 'weight') {
      updates.time = undefined;
      updates.weight = calculateRecommendedWeight(exercise, user);
      updates.sets = 1
      updates.reps = calculateRecommendedReps(exercise);
    } else if (type === 'time') {
      updates.reps = 1;
      updates.weight = undefined;
      updates.time = 30;
    }
    
    onUpdate(updates);
  };

  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={exercise.image}
            alt={exercise.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="dark:text-black font-medium line-clamp-1">{exercise.name}</h3>
            <button
              onClick={onRemove}
              className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          <div className="mt-3 space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleTypeChange('reps')}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  exerciseType === 'reps'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Repeat2 size={16} className="rotate-90" />
              </button>
              <button
                onClick={() => handleTypeChange('weight')}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  exerciseType === 'weight'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Weight size={16} />
              </button>
              <button
                onClick={() => handleTypeChange('time')}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  exerciseType === 'time'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Timer size={16} />
              </button>
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Подходы
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={workoutExercise.sets}
                  onChange={(e) => onUpdate({ sets: parseInt(e.target.value) })}
                  className="dark:text-black w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {exerciseType === 'reps' && (
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Повторения
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={workoutExercise.reps}
                    onChange={(e) => onUpdate({ reps: parseInt(e.target.value) })}
                    className="dark:text-black w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}

              {exerciseType === 'weight' && (
                <>
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Повторения
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={workoutExercise.reps}
                      onChange={(e) => onUpdate({ reps: parseInt(e.target.value) })}
                      className="dark:text-black w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Вес (кг)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      value={workoutExercise.weight}
                      onChange={(e) => onUpdate({ weight: parseFloat(e.target.value) })}
                      className="dark:text-black w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </>
              )}

              {exerciseType === 'time' && (
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Время (сек)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={workoutExercise.time}
                    onChange={(e) => onUpdate({ time: parseInt(e.target.value) })}
                    className="dark:text-black w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>

            {safetyWarning && (
              <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 dark:bg-gray-50 px-3 py-2 rounded-lg">
                <AlertTriangle size={16} className="flex-shrink-0" />
                <span>{safetyWarning}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}