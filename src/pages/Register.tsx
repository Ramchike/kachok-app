import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ValueSlider } from "../components/shared";
import { Character, characterAtom, Gender, getDefaultInventory, getRandomItems } from "../storage/character";
import { userInfoAtom } from "../storage/user";
import { useAtom } from "jotai";

interface RegisterFormData {
  gender: Gender
  height: number
  weight: number
}
  
export const Register = () => {
    const navigate = useNavigate();
    const [, setCharacter] = useAtom(characterAtom)
    const [user, setUser] = useAtom(userInfoAtom)
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<RegisterFormData>({
      gender: 'male',
      height: 182,
      weight: 80
    });

    const handleSubmit = () => {
        console.log(formData.gender)
        const newCharacter: Character = {
          stats: { gender: 'male', experience: 0, level: 1},
          coins: 0,
          inventory: [],
          equipped: {
              body: '',
              legs: '',
              head: '',
              arms: '',
              boots: ''
          }
      };
        newCharacter.stats.gender = formData.gender
        newCharacter.inventory = getDefaultInventory(formData.gender)
        newCharacter.equipped = getRandomItems(formData.gender) 
        setCharacter(newCharacter)
        setUser(prev => ({
            ...prev,
            is_registered: true,
            gender: formData.gender,
            weight: formData.weight,
            height: formData.height
        }))
        navigate('/');
    };

    useEffect(() => {
      if (user.is_registered) {
        navigate('/')
      }
    }, [navigate, user.is_registered])
  
    return (
      <div className="fixed inset-0 bg-white flex flex-col">
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: '50%' }}
            animate={{ width: step === 1 ? '50%' : '100%' }}
            transition={{ duration: 0.3 }}
          />
        </div>
  
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8"
            >
              {/* Logo space */}
              <div className="w-92 h-92 sm:w-84 sm:h-84 sm:mb-8">
                  <img className=" w-full h-full flex items-center justify-center" src="/logo.png"/>
              </div>
              
              <h1 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-gray-900">
                Добро пожаловать в Kachok
              </h1>
              
              <p className="text-m sm:text-l text-gray-600 text-center mb-8 sm:mb-12 max-w-md">
                Превратите свои тренировки в увлекательное приключение. Создайте своего персонажа, выполняйте упражнения и становитесь сильнее с каждым днем.
              </p>
  
              <button
                onClick={() => setStep(2)}
                className="w-full shadow-blue-600/50 cursor-pointer sm:w-72 px-6 py-3 sm:py-4 bg-blue-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-blue-600 active:bg-blue-700 transition-colors shadow-lg"
              >
                <span>Запустить</span>
                <ChevronRight size={20} />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col p-6 py-12 sm:p-8 overflow-y-auto justify-center"
            >
              <div className="max-w-lg mx-auto w-full flex flex-col justify-around">
                <div className="flex-1 flex justify-center flex-col gap-10">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-12 text-center text-gray-900">
                  Расскажите о себе
                </h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Пол
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setFormData(prev => ({ ...prev, gender: 'male' }))}
                        className={`p-3 cursor-pointer sm:p-4 rounded-xl flex items-center justify-center font-medium transition-colors ${
                          formData.gender === 'male'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Мужской
                      </button>
                      <button
                        onClick={() => setFormData(prev => ({ ...prev, gender: 'female' }))}
                        className={`p-3 cursor-pointer sm:p-4 rounded-xl flex items-center justify-center font-medium transition-colors ${
                          formData.gender === 'female'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Женский
                      </button>
                    </div>
                  </div>
  
                  <div>
                    <ValueSlider
                      value={formData.height}
                      onChange={(value) => setFormData(prev => ({ ...prev, height: value }))}
                      min={140}
                      max={220}
                      label="Рост"
                      unit="см"
                    />
                  </div>
  
                  {/* Weight selection */}
                  <div>
                    <ValueSlider
                      value={formData.weight}
                      onChange={(value) => setFormData(prev => ({ ...prev, weight: value }))}
                      min={40}
                      max={150}
                      step={0.5}
                      label="Вес"
                      unit="кг"
                    />
                  </div>
                </div>
  
                <div className="mt-8 w-full flex-col flex items-center gap-4">
                  <p className="text-gray-600 text-center mb-4">
                    Эти данные помогут нам подобрать оптимальные тренировки для вас
                  </p>
                  <motion.button
                    onClick={handleSubmit}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 sm:py-4 cursor-pointer bg-blue-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-blue-600 active:bg-blue-700 transition-colors shadow-lg"
                  >
                    <span>Начать</span>
                    <ArrowRight size={20} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }