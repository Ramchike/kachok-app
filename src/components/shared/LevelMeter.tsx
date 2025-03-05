import React from 'react';
import { motion } from 'framer-motion';
import { CharacterStats, levelExperience } from '../../storage/character';

interface Props {
  stats: CharacterStats;
}

export const LevelMeter: React.FC<Props> = ({ stats }) => {
  const segments = 20; 
  const currentLevel = Number(stats.level);
  const nextLevel = currentLevel + 1;
  const currentLevelXP = levelExperience[currentLevel as keyof typeof levelExperience];
  const nextLevelXP = levelExperience[nextLevel as keyof typeof levelExperience] || currentLevelXP * 2;
  const progress = (stats.experience / nextLevelXP) * 100;

  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-l font-bold mb-1 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
      >
        Уровень {stats.level}
      </motion.div>
      
      <div className="flex gap-1 mb-2">
        {Array.from({ length: segments }).map((_, i) => {
          const segmentProgress = (progress - (i * (100 / segments))) / (100 / segments);
          const isActive = segmentProgress > 0;
          
          return (
            <div key={i} className="relative h-1.5 w-3">
              <div className="absolute inset-0 rounded-full bg-gray-200" />

              {isActive && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: Math.min(1, segmentProgress) }}
                  className="absolute inset-0 rounded-full origin-left"
                  style={{
                    background: 'linear-gradient(to right, #3B82F6, #8B5CF6)'
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
      
      <div className="text-xs text-gray-500">
        {stats.experience} / {nextLevelXP} XP
      </div>
    </div>
  );
}