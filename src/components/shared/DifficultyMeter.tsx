import React from "react";
import { Difficulty } from "../../storage/exercise";



interface Props {
  difficulty: Difficulty;
}

export const DifficultyMeter: React.FC<Props> = ({ difficulty }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3].map((level) => (
        <div
          key={level}
          className={`h-2 w-8 rounded ${
            level <= difficulty
              ? 'bg-blue-500'
              : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  );
}