import { useAtom } from "jotai";
import { difficultyOptions, exerciseListAtom, tagList } from "../../storage/exercise";
import { ChevronRight, Clock, Pin } from "lucide-react";
import { Workout } from "../../storage/workout";
import { DifficultyMeter } from "../shared";

interface Props {
    workout: Workout;
}
  
export const WorkoutCard: React.FC<Props> = ({ workout }) => {
    const firstExercise = workout.exercises[0];
    const remainingCount = workout.exercises.length - 1;
    const [exercises] = useAtom(exerciseListAtom)
    
    const exerciseInfo = exercises.find(ex => ex.id === firstExercise.exerciseId);
    if (!exerciseInfo) return null;
  
    return (
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md active:shadow-none transition-all duration-200 overflow-hidden">
        <div className="p-4">
          <div className="flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium dark:text-black line-clamp-1 flex-1">{workout.name}</h3>
                {workout.isPinned && (
                  <Pin size={16} className="text-blue-500 fill-current flex-shrink-0" />
                )}
              </div>
              {workout.description && (
                <p className="text-sm text-gray-600 mb-3">{workout.description}</p>
              )}
              <div className="flex flex-col gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Clock aria-label="Продолжительность" size={16} className="text-gray-400" />
                  <span>{workout.estimatedTime} мин</span>
                </div>
                <div className="flex items-center gap-2">
                  <DifficultyMeter difficulty={workout.difficulty} />
                  <span>{difficultyOptions[workout.difficulty]}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex gap-1">
                {workout.tags.map(tagId => {
                  const tag = tagList.find(t => t.id === tagId);
                  if (!tag) return null;
                  const Icon = tag.icon;
                  return (
                    <div
                      key={tag.id}
                      className={`w-8 h-8 ${tag.color}  rounded-lg flex items-center justify-center text-white`}
                      title={tag.name}
                    >
                      <Icon title={tag.name} size={16} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
  
          <div className="mt-4">
            <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg text-sm">
              <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={exerciseInfo.image}
                  alt={exerciseInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="dark:text-black font-medium line-clamp-1">{exerciseInfo.name}</div>
                <div className="flex items-center gap-2 mt-1 text-gray-600">
                  <span>{firstExercise.sets} × {firstExercise.time ? `${firstExercise.time}с` : `${firstExercise.reps}`}</span>
                  {firstExercise.weight && (
                    <>
                      <span className="text-gray-400">по </span>
                      <span>{firstExercise.weight}кг</span>
                    </>
                  )}
                </div>
              </div>
            </div>
  
            {remainingCount > 0 && (
              <div className="mt-2 flex items-center justify-between px-2 py-1.5 text-sm text-gray-600">
                <span>И еще {remainingCount} упражнени
                  {remainingCount % 10 === 1 && remainingCount % 100 !== 11
                   ? 'е' : 
                   (remainingCount % 10 >= 2 && remainingCount % 10 <= 4 
                    && (remainingCount % 100 < 12 || remainingCount % 100 > 14)
                    ? 'я' : 'й')}
                </span>                
                <ChevronRight aria-label="Еще" size={16} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
}