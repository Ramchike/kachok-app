
import { useMemo, useState } from 'react';
import { useAtom } from 'jotai';
import { Search, Filter, Plus } from 'lucide-react';
import { Exercise, Difficulty, exerciseListAtom } from '../storage/exercise';
import { ExerciseCard } from '../components/cards';
import { FilterModal, AddExerciseModal, ExerciseModal } from '../components/modals';

export const ExerciseCatalogPage = () => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [exerciseList] = useAtom(exerciseListAtom)

  const filteredExercises = useMemo(() => {
    const filtered =  exerciseList.filter(exercise => {
      const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesEquipment = selectedEquipment.length === 0 || 
        exercise.equipment.some(eq => selectedEquipment.includes(eq));
      const matchesTags = selectedTags.length === 0 || 
        exercise.tags.some(tag => selectedTags.includes(tag));
      const matchesDifficulty = selectedDifficulty.length === 0 || 
        selectedDifficulty.includes(exercise.difficulty);
      
      return matchesSearch && matchesEquipment && matchesTags && matchesDifficulty;
    });
    return filtered.sort((a, b) => {
      if (a.is_pined === b.is_pined) return 0;
      return a.is_pined ? -1 : 1;
    })
  }, [exerciseList, searchQuery, selectedEquipment, selectedTags, selectedDifficulty]);

  const toggleDifficulty = (difficulty: Difficulty) => {
    if (selectedDifficulty.includes(difficulty)) {
      setSelectedDifficulty(selectedDifficulty.filter(d => d !== difficulty));
    } else {
      setSelectedDifficulty([...selectedDifficulty, difficulty]);
    }
  };

  const toggleEquipment = (equipment: string) => {
    if (selectedEquipment.includes(equipment)) {
      setSelectedEquipment(selectedEquipment.filter(e => e !== equipment));
    } else {
      setSelectedEquipment([...selectedEquipment, equipment]);
    }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const clearFilters = () => {
    setSelectedEquipment([]);
    setSelectedTags([]);
    setSelectedDifficulty([]);
  };

  const hasActiveFilters = selectedEquipment.length > 0 || selectedTags.length > 0 || selectedDifficulty.length > 0;

  return (
    <>
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-gray-900 dark:text-black">
                Каталог упражнений
              </h1>
            </div>
          </div>

          <div className="relative mt-3">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Поиск упражнений...'
              className="w-full pl-10 pr-4 py-2 text-black bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="cursor-pointer flex-1 py-2 px-4 bg-white border border-gray-200 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 active:bg-gray-100 touch-manipulation transition-colors"
            >
              <Filter size={18} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                Фильтры
                {hasActiveFilters && ` (${selectedEquipment.length + selectedTags.length + selectedDifficulty.length})`}
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-4 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredExercises.map((exercise: Exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onClick={() => setSelectedExercise(exercise)}
            />
          ))}
        </div>

        {filteredExercises.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              Упражнения не найдены
            </p>
          </div>
        )}
      </main>

      <button
        onClick={() => setIsAddModalOpen(true)}
        className="cursor-pointer fixed right-4 bottom-20 z-30 w-14 sm:flex sm:gap-2 sm:bottom-10 sm:right-10 sm:rounded-2xl sm:w-auto sm:px-3 h-14 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 active:bg-blue-700 touch-manipulation transition-colors duration-200 flex items-center justify-center"
        aria-label='Добавить упражнение'
      >
        <Plus size={24} />
        <span className='hidden sm:block'>Создать упражнение</span>
      </button>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        selectedDifficulty={selectedDifficulty}
        selectedEquipment={selectedEquipment}
        selectedTags={selectedTags}
        toggleDifficulty={toggleDifficulty}
        toggleEquipment={toggleEquipment}
        toggleTag={toggleTag}
        clearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      <AddExerciseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {selectedExercise && (
        <ExerciseModal
          exercise_id={selectedExercise.id}
          onClose={() => setSelectedExercise(null)}
        />
      )}
    </>
  );
}

