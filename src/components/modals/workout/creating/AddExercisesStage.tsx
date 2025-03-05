import { ArrowLeft, Dumbbell, Plus, X, Search } from "lucide-react";
import React from "react";
import { Exercise, exerciseListAtom } from "../../../../storage/exercise";
import { WorkoutExercise } from "../../../../storage/workout";
import { WorkoutExerciseCard } from "./ExerciseCard";
import { DifficultyMeter } from "../../../shared";
import { useAtom } from "jotai";

interface Props {
    exercises: WorkoutExercise[];
    selectedTags: string[];
    safetyWarnings: { [key: string]: string };
    onUpdateExercise: (index: number, updates: Partial<WorkoutExercise>) => void;
    onRemoveExercise: (index: number) => void;
    onAddExercise: (exercise: Exercise) => void;
    onAutoSelect: () => void;
    onBack: () => void;
}
  
export const WorkoutAddStageExercises: React.FC<Props> = ({
    exercises,
    selectedTags,
    safetyWarnings,
    onUpdateExercise,
    onRemoveExercise,
    onAddExercise,
    onAutoSelect,
    onBack,
  }) => {
    const [allExercises] = useAtom(exerciseListAtom)
    const [showExerciseSelector, setShowExerciseSelector] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
  
    const filteredExercises = React.useMemo(() => {
      return allExercises.filter(exercise => {
        const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTags = selectedTags.length === 0 || 
          exercise.tags.some(tag => selectedTags.includes(tag));
        return matchesSearch && matchesTags;
      });
    }, [allExercises, searchQuery, selectedTags]);
  
    return (
      <div className="p-4 space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={onBack}
            className="cursor-pointer p-2 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors"
          >
            <ArrowLeft className="dark:text-black" size={20} />
          </button>
          <h3 className="text-lg dark:text-black font-medium">Упражнения</h3>
        </div>
  
        {selectedTags.length > 0 && exercises.length === 0 && (
          <button
            onClick={onAutoSelect}
            className="cursor-pointer w-full py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 active:bg-blue-700 touch-manipulation font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Dumbbell size={20} />
            <span>Автоподбор упражнений</span>
          </button>
        )}
  
        <div className="space-y-4">
          {exercises.map((workoutExercise, index) => {
            const exerciseInfo = allExercises.find(ex => ex.id === workoutExercise.exerciseId);
            if (!exerciseInfo) return null;
  
            return (
              <WorkoutExerciseCard
                key={index}
                exercise={exerciseInfo}
                workoutExercise={workoutExercise}
                onUpdate={(updates) => onUpdateExercise(index, updates)}
                onRemove={() => onRemoveExercise(index)}
                safetyWarning={safetyWarnings[index]}
              />
            );
          })}
        </div>
  
        <button
          onClick={() => setShowExerciseSelector(true)}
          className="cursor-pointer w-full py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 active:bg-blue-100 touch-manipulation font-medium transition-colors duration-200 flex items-center justify-center gap-2 text-gray-600 hover:text-blue-500"
        >
          <Plus size={20} />
          <span>Добавить упражнение</span>
        </button>
  
        {showExerciseSelector && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
            <div className="fixed inset-x-0 bottom-0 sm:static sm:flex sm:items-center sm:justify-center sm:min-h-screen">
              <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[90vh] overflow-y-auto overscroll-contain touch-auto modal-scroll animate-slide-up">
                <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm rounded-t-3xl sm:rounded-t-2xl border-b border-gray-300">
                  <div className="flex justify-between items-center p-4">
                    <h3 className="dark:text-black text-lg font-bold">Выберите упражнение</h3>
                    <button
                      onClick={() => setShowExerciseSelector(false)}
                      className="cursor-pointer p-2 -mr-2 hover:bg-gray-100 active:bg-gray-200 rounded-full touch-manipulation"
                    >
                      <X className="dark:text-black" size={20} />
                    </button>
                  </div>
  
                  <div className="px-4 pb-4">
                    <div className="relative">
                      <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Поиск упражнений..."
                        className="dark:text-black cursor-pointer w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
  
                <div className="p-4">
                  <div className="grid gap-3">
                    {filteredExercises.map((exercise) => (
                      <button
                        key={exercise.id}
                        onClick={() => {
                          onAddExercise(exercise);
                          setShowExerciseSelector(false);
                        }}
                        className="cursor-pointer flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-colors text-left touch-manipulation"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={exercise.image}
                            alt={exercise.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-col min-w-0">
                            <h4 className="dark:text-black font-medium mb-2 line-clamp-1">{exercise.name}</h4>
                            <DifficultyMeter difficulty={exercise.difficulty}/>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }