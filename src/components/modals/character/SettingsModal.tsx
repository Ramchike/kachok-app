import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { X, Wand2, Volume2} from "lucide-react";
import { AiOutlineUserDelete } from "react-icons/ai";
import { MdOutlineDarkMode } from "react-icons/md";


import { useState } from "react";
import { ValueSlider } from "../../shared";
import { darkThemeAtom, ttsAtom, userInfoAtom } from "../../../storage/user";
import { characterAtom, CharacterLevel, Gender, getDefaultInventory, getRandomItems } from "../../../storage/character";
import { useNavigate } from "react-router";
import { workoutsHistoryAtom } from "../../../storage/statistic";
import { workoutListAtom, workoutsToMockFavorite } from "../../../storage/workout";
import { generateRandomStats } from "../../../utils";

interface Props {
  isOpen: boolean,
  onClose: () => void
}

export const SettingsModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const nav = useNavigate()
    const [ttsEnabled, setTtsEnabled] = useAtom(ttsAtom);
    const [, setWorkoutHistory] = useAtom(workoutsHistoryAtom)
    const [, setWorkouts] = useAtom(workoutListAtom)
    const [darkEnabled, setDarkEnabled] = useAtom(darkThemeAtom)
    const [user, setUser] = useAtom(userInfoAtom)
    const [character, setCharacter] = useAtom(characterAtom)
    const [height, setHeight] = useState(user.height);
    const [weight, setWeight] = useState(user.weight);
    const [level, setLevel] = useState<CharacterLevel>(character.stats.level);
    const [coins, setCoins] = useState(character.coins);
    const [showAdminControls, setShowAdminControls] = useState(false);
  
    if (!isOpen) return null;

    const handleSave = () => {
      setUser(prev => ({
        ...prev,
        height,
        weight,
      }));
      
      setCharacter(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          experience: 0,
          level
        },
        coins
      }));
      
      onClose();
    };
  
    const handleGenderChange = (gender: Gender) => {
      setCharacter(prev => ({
        ...prev,
        inventory: getDefaultInventory(gender),
        equipped: getRandomItems(gender),
        stats: {
          ...prev.stats,
          gender
        }
      }));
    };
  
    const handleGenerateRandomStats = () => {
      setWorkouts(workoutsToMockFavorite)
      setWorkoutHistory(generateRandomStats())
    };

    const resetAll = () => {
      localStorage.clear()
      nav('/register')
    }
  
    const content = (
      <div className="flex flex-col h-full overflow-y-auto ">
        <div className="flex-1 p-4 space-y-8">
          <div>
            <button
              onClick={() => setTtsEnabled(!ttsEnabled)}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <span className="dark:text-black font-medium px-2 flex items-center gap-2 text-gray-700">
              <Volume2 className="text-blue-500" size={20}/>
                Голос в тренировках
              </span>
              <div className="relative">
                <div className={`
                  w-12 h-6 rounded-full transition-colors duration-200
                  ${ttsEnabled ? 'bg-blue-500' : 'bg-gray-300'}
                `} />
                <motion.div
                  initial={false}
                  animate={{
                    x: ttsEnabled ? 24 : 0,
                    backgroundColor: ttsEnabled ? '#ffffff' : '#ffffff'
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute left-0.5 top-0.5 w-5 h-5 rounded-full bg-white shadow-sm"
                />
              </div>
            </button>
          </div>
          <div>
            <button
              onClick={() => setDarkEnabled(!darkEnabled)}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <span className="dark:text-black font-medium px-2 flex items-center gap-2 text-gray-700">
              <MdOutlineDarkMode className="text-blue-500" size={20}/>
                Темная тема
              </span>
              <div className="relative">
                <div className={`
                  w-12 h-6 rounded-full transition-colors duration-200
                  ${darkEnabled ? 'bg-blue-500' : 'bg-gray-300'}
                `} />
                <motion.div
                  initial={false}
                  animate={{
                    x: darkEnabled ? 24 : 0,
                    backgroundColor: ttsEnabled ? '#ffffff' : '#ffffff'
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute left-0.5 top-0.5 w-5 h-5 rounded-full bg-white shadow-sm"
                />
              </div>
            </button>
          </div>
          <ValueSlider
            value={height}
            onChange={setHeight}
            min={140}
            max={220}
            label="Рост"
            unit="см"
          />
  
          <ValueSlider
            value={weight}
            onChange={setWeight}
            min={40}
            max={150}
            step={0.5}
            label="Вес"
            unit="кг"
          />
  
          <div className="pt-4">
            <button
              onClick={() => setShowAdminControls(!showAdminControls)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              {showAdminControls ? 'Скрыть админ-панель' : 'Показать админ-панель'}
            </button>
          </div>
  
          {showAdminControls && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-6 border-t pt-6 border-gray-300"
            >
              <div className="mb-2">
                  <label className="dark:text-black block text-sm font-medium text-gray-700 mb-2">
                    Уровень персонажа
                  </label>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[1, 2, 3].map((l) => (
                      <button
                        key={l}
                        onClick={() => setLevel(l as CharacterLevel)}
                        className={`
                          py-2 px-4 rounded-lg text-sm font-medium transition-colors
                          ${level === l
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }
                        `}
                      >
                        Уровень {l}
                      </button>
                    ))}
                  </div>
  
                <div className="mb-4">
                  <label className="dark:text-black block text-sm font-medium text-gray-700 mb-2 items-center gap-2">
                    <span>Монеты</span>
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="number"
                      value={coins}
                      onChange={(e) => setCoins(Math.max(0, parseInt(e.target.value) || 0))}
                      className="dark:text-black flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => setCoins(prev => prev + 100)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      +100
                    </button>
                  </div>
                </div>
  
                <div className="mb-6">
                  <label className="dark:text-black block text-sm font-medium text-gray-700 mb-2">
                    Пол персонажа
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleGenderChange('male')}
                      className={`
                        py-2 px-4 rounded-lg text-sm font-medium transition-colors
                        ${character.stats.gender === 'male'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }
                      `}
                    >
                      Мужской
                    </button>
                    <button
                      onClick={() => handleGenderChange('female')}
                      className={`
                        py-2 px-4 rounded-lg text-sm font-medium transition-colors
                        ${character.stats.gender === 'female'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }
                      `}
                    >
                      Женский
                    </button>
                  </div>
                </div>
  
                <button
                  onClick={handleGenerateRandomStats}
                  className="cursor-pointer w-full flex items-center justify-center gap-2 p-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors font-medium"
                >
                  <Wand2 size={20} />
                  <span>Сгенерировать случайную статистику</span>
                </button>
                <button
                  onClick={resetAll}
                  className="mt-2 cursor-pointer w-full flex items-center justify-center gap-2 p-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors font-medium"
                >
                  <AiOutlineUserDelete size={24}/>
                  <span>Сбросить все</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
  
        <div className="flex-shrink-0 p-4 border-t border-gray-300">
          <button
            onClick={handleSave}
            className="w-full py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 active:bg-blue-700 font-medium transition-colors"
          >
            Сохранить
          </button>
        </div>
      </div>
    );
  
    // Вид на телефоне
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      return (
        <motion.div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 touch-none sm:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div className="fixed inset-0 sm:flex sm:items-center sm:justify-center sm:p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="h-full w-full bg-white flex flex-col overflow-hidden"
            >
              <div className="flex-shrink-0 flex justify-between items-center p-4 border-b border-gray-300">
                <h2 className="dark:text-black text-xl font-bold">Настройки</h2>
                <button
                  onClick={onClose}
                  className="p-2 -mr-2 hover:bg-gray-100 active:bg-gray-200 rounded-full touch-manipulation"
                >
                  <X className="dark:text-black" size={20} />
                </button>
              </div>
              {content}
            </motion.div>
          </div>
        </motion.div>
      );
    }
  
    // Вид на пк
    return (
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl dark:text-black font-bold mb-6">Настройки</h1>
        {content}
      </div>
    );
  }