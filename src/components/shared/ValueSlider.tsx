import { Minus, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Props {
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step?: number;
    label: string
    unit: string
}

export const ValueSlider:React.FC<Props> = ({ 
    value, 
    onChange, 
    min, 
    max, 
    step = 1,
    label,
    unit }) => {


      const [localValue, setLocalValue] = useState(value);
      const [isSliding, setIsSliding] = useState(false);
    
      useEffect(() => {
        if (!isSliding) {
          setLocalValue(value);
        }
      }, [value, isSliding]);
    
      const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.target.value);
        setLocalValue(newValue);
      };

      const handleSliderStart = () => {
        setIsSliding(true);
      };
    
      const handleSliderEnd = () => {
        setIsSliding(false);
        onChange(localValue);
      };
    
      const handleButtonPress = (direction: 'increment' | 'decrement') => {
        const smallStep = step / 2; 
        const newValue = direction === 'increment' 
          ? Math.min(max, value + smallStep)
          : Math.max(min, value - smallStep);
        onChange(newValue);
      };
    
      return (
        <div>
          <label className="block dark:text-black text-lg font-medium">
            {label}
          </label>
          <div className="flex items-center gap-4">
            <button
              onMouseDown={() => {
                handleButtonPress('decrement');
                const interval = setInterval(() => handleButtonPress('decrement'), 100);
                const cleanup = () => clearInterval(interval);
                window.addEventListener('mouseup', cleanup, { once: true });
              }}
              onTouchStart={() => {
                handleButtonPress('decrement');
                const interval = setInterval(() => handleButtonPress('decrement'), 100);
                const cleanup = () => clearInterval(interval);
                window.addEventListener('touchend', cleanup, { once: true });
              }}
              className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 active:bg-gray-300 transition-colors touch-manipulation"
            >
              <Minus size={24} className="text-gray-600" />
            </button>
    
            <div className="flex-1 text-center">
              <div className="text-3xl dark:text-black font-bold">
                {isSliding ? localValue.toFixed(1) : value.toFixed(1)}
                <span className="text-xl text-gray-500 ml-1">{unit}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{min} {unit}</span>
                <span>{max} {unit}</span>
              </div>
              <input
                type="range"
                min={min}
                max={max}
                step={step / 10} 
                value={isSliding ? localValue : value}
                onChange={handleSliderChange}
                onMouseDown={handleSliderStart}
                onTouchStart={handleSliderStart}
                onMouseUp={handleSliderEnd}
                onTouchEnd={handleSliderEnd}
                className="w-full mt-2 h-1 bg-gray-200 rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 
                  [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full 
                  [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:shadow-md
                  [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-100
                  [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:active:scale-95
                  
                  [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 
                  [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500 
                  [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-md
                  [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:duration-100
                  [&::-moz-range-thumb]:hover:scale-110 [&::-moz-range-thumb]:active:scale-95"
              />
            </div>
    
            <button
              onMouseDown={() => {
                handleButtonPress('increment');
                const interval = setInterval(() => handleButtonPress('increment'), 100);
                const cleanup = () => clearInterval(interval);
                window.addEventListener('mouseup', cleanup, { once: true });
              }}
              onTouchStart={() => {
                handleButtonPress('increment');
                const interval = setInterval(() => handleButtonPress('increment'), 100);
                const cleanup = () => clearInterval(interval);
                window.addEventListener('touchend', cleanup, { once: true });
              }}
              className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 active:bg-gray-300 transition-colors touch-manipulation"
            >
              <Plus size={24} className="text-gray-600" />
            </button>
          </div>
        </div>
      );
    }