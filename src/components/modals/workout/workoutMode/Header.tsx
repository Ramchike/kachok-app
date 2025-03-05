import { X } from "lucide-react";

interface Props {
    title: string;
    currentExercise: number;
    totalExercises: number;
    onClose: () => void;
  }
  
export const WorkoutHeader: React.FC<Props> = ({ title, currentExercise, totalExercises, onClose }) => {
    return (
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="p-2 -ml-2 hover:bg-gray-100 active:bg-gray-200 rounded-full"
              >
                <X className="dark:text-black" size={24} />
              </button>
              <h1 className="dark:text-black font-bold text-xl">{title}</h1>
            </div>
            <div className="text-sm text-gray-600">
              {currentExercise} этап из {totalExercises}
            </div>
          </div>
        </div>
      </header>
    );
}