import { useState, useMemo } from "react";
import { WorkoutCard } from "../components/cards";
import { WorkoutModal, WorkoutMode } from "../components/modals/workout";
import { CreateWorkoutModal } from "../components/modals/workout/creating/CreateModal";
import { Workout, workoutListAtom, WorkoutStats } from "../storage/workout";
import { useAtom } from "jotai";
import { Plus, Search } from "lucide-react";
import { tagList } from "../storage/exercise";
import { characterAtom, setExperienceCharacterAtom } from "../storage/character";
import { StatsStage } from "../components/modals/workout/workoutMode/StatsStage";
import { calculateRewards } from "../utils/workoutHelper";
import { addWorkoutToHistory, WorkoutInHistory } from "../storage/statistic";

export const WorkoutCatalogPage = () => {
    const [, addStats] = useAtom(addWorkoutToHistory)
    const [, setCharacter] = useAtom(characterAtom)
    const [, addExperience] = useAtom(setExperienceCharacterAtom)
    const [workouts, setWorkouts] = useAtom(workoutListAtom)
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
    const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);
    const [showStats, setShowStats] = useState(false);
    const [workoutStats, setWorkoutStats] = useState<WorkoutStats | null>(null);
    const [editingWorkout, setEditingWorkout] = useState<Workout | undefined>(undefined);

    const filteredWorkouts = useMemo(() => {
      const filtered = workouts.filter(workout => {
        const matchesSearch = workout.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTags = selectedTags.length === 0 || 
          workout.tags.some(tag => selectedTags.includes(tag));
        return matchesSearch && matchesTags;
      });
  
      // Сортируем: сначала закрепленные, потом по количеству использований
      return filtered.sort((a, b) => {
        if (a.isPinned !== b.isPinned) {
          return a.isPinned ? -1 : 1;
        }
        return b.timesUsed - a.timesUsed;
      });
    }, [searchQuery, selectedTags, workouts]);
  
    const toggleTag = (tagId: string) => {
      setSelectedTags(prev => 
        prev.includes(tagId)
          ? prev.filter(id => id !== tagId)
          : [...prev, tagId]
      );
    };
  
    const handleSave = (workout: Omit<Workout, 'id' | 'createdAt' | 'timesUsed'>) => {
      if (editingWorkout) {
        setWorkouts(prev => prev.map(w => 
          w.id === editingWorkout.id
            ? {
                ...w,
                ...workout,
                lastModified: new Date().toISOString()
              }
            : w
        ));
        setEditingWorkout(undefined);
      } else {
        const maxId = Math.max(...workouts.map(w => w.id), -1);
        const newWorkout: Workout = {
          ...workout,
          id: maxId + 1,
          createdAt: new Date().toISOString(),
          timesUsed: 0,
          isPinned: false
        };
        setWorkouts(prev => [...prev, newWorkout]);
      }
      setIsCreateModalOpen(false);
    };
  
    const handleSaveAndStart = (workout: Omit<Workout, 'id' | 'createdAt' | 'timesUsed'>) => {
      const maxId = Math.max(...workouts.map(w => w.id), -1);
      const newWorkout: Workout = {
        ...workout,
        id: maxId + 1,
        createdAt: new Date().toISOString(),
        timesUsed: 0,
        isPinned: false
      };
      setWorkouts(prev => [...prev, newWorkout]);
      setActiveWorkout(newWorkout);
      setIsCreateModalOpen(false);
    };
  
    const handleStart = (workout: Omit<Workout, 'id' | 'createdAt' | 'timesUsed'>) => {
      const maxId = Math.max(...workouts.map(w => w.id), -1);
      const newWorkout: Workout = {
        ...workout,
        id: maxId + 1,
        createdAt: new Date().toISOString(),
        timesUsed: 0,
        isPinned: false
      };
      setActiveWorkout(newWorkout);
      setIsCreateModalOpen(false);
    };
  
    const handleWorkoutComplete = (stats: WorkoutStats | null) => {
      if (stats && activeWorkout) {
        const { experience, coins } = calculateRewards(stats)
        addExperience(experience)
        setCharacter((prev) => ({
          ...prev,
          coins: prev.coins + coins
        }));
        const newStats: WorkoutInHistory = {
          date: new Date(),
          stats: stats,
          workoutId: activeWorkout.id
        }
        addStats(newStats)
        setWorkouts(prev => prev.map(w => 
          w.id === activeWorkout.id 
            ? { ...w, timesUsed: w.timesUsed + 1 }
            : w
        ));
      }
      setActiveWorkout(null);
      setWorkoutStats(stats);
      setShowStats(true);
    };
  
    const handlePinWorkout = (workout: Workout) => {
      setWorkouts(prev => prev.map(w => 
        w.id === workout.id 
          ? { ...w, isPinned: !w.isPinned }
          : w
      ));
      setSelectedWorkout(prev => 
        prev?.id === workout.id 
          ? { ...prev, isPinned: !prev.isPinned }
          : prev
      );
    };
  
    const handleDeleteWorkout = (workout: Workout) => {
      setWorkouts(prev => prev.filter(w => w.id !== workout.id));
      setSelectedWorkout(null);
    };
  
    const handleEditWorkout = (workout: Workout) => {
      setEditingWorkout(workout);
      setIsCreateModalOpen(true);
      setSelectedWorkout(null);
    };
  
    return (
      <main>
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3">
            <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900">Тренировки</h1>
            </div>

            <div className="relative mt-3">
            <Search aria-label="Поиск" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск тренировок..."
                className="w-full dark:text-black pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            </div>

            <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {tagList.map(tag => {
                const Icon = tag.icon;
                const isSelected = selectedTags.includes(tag.id);
                return (
                <button
                    key={tag.id}
                    onClick={() => toggleTag(tag.id)}
                    className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-lg whitespace-nowrap text-sm font-medium
                    transition-colors duration-200 touch-manipulation
                    ${isSelected 
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                    `}
                >
                    <Icon title={tag.name} size={16} />
                    <span>{tag.name}</span>
                </button>
                );
            })}
            </div>
        </div>
        </header>
  
        <section className="max-w-5xl mx-auto px-4 py-4">
          <div className="grid gap-4">
            {filteredWorkouts.map((workout) => (
              <div
                key={workout.id}
                onClick={() => setSelectedWorkout(workout)}
                className="cursor-pointer"
              >
                <WorkoutCard workout={workout} />
              </div>
            ))}
            {filteredWorkouts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Тренировки не найдены</p>
              </div>
            )}
          </div>
        </section>
  
        <button
          onClick={() => {
            setEditingWorkout(undefined);
            setIsCreateModalOpen(true);
          }}
          aria-label="Создать тренировку"
          className="cursor-pointer fixed right-4 bottom-20 z-30 w-14 sm:flex sm:gap-2 sm:bottom-10 sm:right-10 sm:rounded-2xl sm:w-auto sm:px-3 h-14 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 active:bg-blue-700 touch-manipulation transition-colors duration-200 flex items-center justify-center"
        >
          <Plus aria-label="Создать тренировку" size={24} />
          <span className="hidden sm:block">Создать тренировку</span>
        </button>
  
        <CreateWorkoutModal
          isOpen={isCreateModalOpen}
          onClose={() => {
            setIsCreateModalOpen(false);
            setEditingWorkout(undefined);
          }}
          onSave={handleSave}
          onSaveAndStart={handleSaveAndStart}
          onStart={handleStart}
          workout={editingWorkout}
        />
  
        {selectedWorkout && (
          <WorkoutModal
            workout={selectedWorkout}
            onClose={() => setSelectedWorkout(null)}
            onPin={() => handlePinWorkout(selectedWorkout)}
            onDelete={() => handleDeleteWorkout(selectedWorkout)}
            onEdit={() => handleEditWorkout(selectedWorkout)}
            onStart={() => {
              setActiveWorkout(selectedWorkout);
              setSelectedWorkout(null);
            }}
          />
        )}
  
        {activeWorkout && (
          <WorkoutMode
            workout={activeWorkout}
            onClose={() => setActiveWorkout(null)}
            onComplete={handleWorkoutComplete}
          />
        )}
  
        {showStats && workoutStats && (
          <StatsStage
            stats={workoutStats}
            onClose={() => {
              setShowStats(false);
              setWorkoutStats(null);
            }}
          />
        )}
      </main>
    );
  }