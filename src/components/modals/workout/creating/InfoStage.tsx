import { tagList } from "../../../../storage/exercise";

interface Props {
    name: string;
    onNameChange: (value: string) => void;
    description: string;
    onDescriptionChange: (value: string) => void;
    selectedTags: string[];
    onTagsChange: (tags: string[]) => void;
    onNext: () => void;
}
  
export const WorkoutAddStageInfo: React.FC<Props> = ({
    name,
    onNameChange,
    description,
    onDescriptionChange,
    selectedTags,
    onTagsChange,
    onNext,
  }) => {
    return (
      <div className="p-4 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Название <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="dark:text-black w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Описание
          </label>
          <textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className="dark:text-black w-full resize-none px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
          />
        </div>
  
        <div>
          <label className="flex flex-col text-sm font-medium text-gray-700 mb-4">
            Область внимания
            <span className="text-gray-400 font-light">Поможет в автоподборе упражнений</span>
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {tagList.map((tag) => {
              const Icon = tag.icon;
              const isSelected = selectedTags.includes(tag.id);
              return (
                <button
                  key={tag.id}
                  onClick={() => {
                    onTagsChange(
                      isSelected
                        ? selectedTags.filter(id => id !== tag.id)
                        : [...selectedTags, tag.id]
                    );
                  }}
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
                </button>
              );
            })}
          </div>
        </div>
  
        <div className="pt-4">
          <button
            onClick={onNext}
            disabled={!name.trim()}
            className="w-full py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-300 touch-manipulation font-medium transition-colors duration-200"
          >
            Далее
          </button>
        </div>
      </div>
    );
}