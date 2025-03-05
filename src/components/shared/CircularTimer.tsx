import { motion } from "framer-motion";

interface Props {
    duration: number;
    currentTime: number;
    size?: number;
    strokeWidth?: number;
    isPreparation?: boolean;
}
  
export const CircularTimer: React.FC<Props> = ({ 
    duration, 
    currentTime, 
    size = 240,
    strokeWidth = 12,
    isPreparation = false
  }) => {
    const center = size / 2;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = currentTime / duration;
    const dashOffset = circumference * (1 - progress);
  
    const ticks = Array.from({ length: 12 }, (_, i) => i * 30);
  
    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
        >
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
          />
          
          {ticks.map((angle) => {
            const x1 = center + (radius - 20) * Math.cos((angle * Math.PI) / 180);
            const y1 = center + (radius - 20) * Math.sin((angle * Math.PI) / 180);
            const x2 = center + radius * Math.cos((angle * Math.PI) / 180);
            const y2 = center + radius * Math.sin((angle * Math.PI) / 180);
            
            return (
              <line
                key={angle}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#cbd5e1 "
                strokeWidth={2}
              />
            );
          })}
  
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={isPreparation ? "#3b82f6" : "#10b981"}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 0.5, ease: "linear" }}
          />
        </svg>
  
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            key={currentTime}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl font-bold"
          >
            <span className="dark:text-black">{currentTime}</span>
          </motion.div>
          <div className="text-gray-500 dark:text-black font-medium">
            {isPreparation ? "Начнем через" : "Секунд "}
          </div>
        </div>
      </div>
    );
}