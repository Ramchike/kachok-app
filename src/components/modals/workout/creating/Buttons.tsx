import { Play, PlayCircle, Save } from "lucide-react";

interface Props {
    onSave: () => void;
    onSaveAndStart: () => void;
    onStart: () => void;
    isEditing?: boolean;
}
  
export const WorkoutActions: React.FC<Props> = ({ onSave, onSaveAndStart, onStart, isEditing }) => {
    return (
      <div className="flex-shrink-0 p-4 border-t border-gray-300">
        <div className="grid gap-3">
        { isEditing && <button
            onClick={onSave}
            className="py-4 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 active:bg-gray-100 touch-manipulation font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Save size={20} className="text-gray-600" />
            <span>{'Сохранить изменения'}</span>
          </button>}
          {!isEditing && <button
            onClick={onStart}
            className="py-4 px-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 active:bg-blue-700 touch-manipulation font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Play size={20} />
            <span>Начать</span>
          </button> }
            <button
              onClick={onSaveAndStart}
              className="py-4 px-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 active:bg-blue-700 touch-manipulation font-medium transition-colors flex items-center justify-center gap-2"
            >
              <PlayCircle size={20} />
              <span>Сохранить и начать</span>
            </button>
          {isEditing && <button
            onClick={onStart}
            className="py-4 px-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 active:bg-blue-700 touch-manipulation font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Play size={20} />
            <span>Начать</span>
          </button> }
          {!isEditing && <button
            onClick={onSave}
            className="py-4 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 active:bg-gray-100 touch-manipulation font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Save size={20} className="text-gray-600" />
            <span className="dark:text-black">{'Сохранить'}</span>
          </button>}
        </div>
      </div>
    );
}