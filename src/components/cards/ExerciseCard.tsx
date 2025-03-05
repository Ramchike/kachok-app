
import { Dumbbell, Pin, Target } from 'lucide-react';
import { equipmentList, Exercise, tagList } from '../../storage/exercise';

interface Props {
  exercise: Exercise
  onClick: () => void
}

export const ExerciseCard: React.FC<Props> = ({ exercise, onClick}) => {
  const getEquipmentNames = () => {
    return exercise.equipment
      .map(eq => equipmentList.find(e => e.id === eq)?.name)
      .filter(Boolean)
      .join(', ');
  };

  const getTagNames = () => {
    return exercise.tags
      .map(tag => tagList.find(t => t.id === tag)?.name)
      .filter(Boolean)
      .join(', ');
  };

  return (
    <div
      onClick={onClick}
      className="bg-white cursor-pointer rounded-xl shadow-sm hover:shadow-md active:shadow-none touch-manipulation transition-all duration-200 flex"
    >
      {exercise.image &&<div className="w-24 h-24 overflow-hidden rounded-l-xl">
        <img
          src={exercise.image}
          alt={exercise.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>}
      <div className="relative flex-1 space-y-1 p-3 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-black text-sm line-clamp-1 flex-1">{exercise.name}</h3>
            {exercise.is_pined && (
              <Pin size={14} className="text-blue-500 fill-current flex-shrink-0" />
            )}
          </div>
          {exercise.equipment.length > 0 && exercise.equipment[0] !== 'none' && (
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Dumbbell size={14} className="flex-shrink-0" />
              <span className="line-clamp-1">{getEquipmentNames()}</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Target size={14} className="flex-shrink-0" />
            <span className="line-clamp-1">{getTagNames()}</span>
          </div>
        </div> 
    </div>
  );
}