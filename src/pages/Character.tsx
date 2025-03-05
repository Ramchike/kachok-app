import { Settings } from "lucide-react";
import { useState } from "react";
import { ShopModal, InventoryModal, SettingsModal } from "../components/modals/character";
import { characterAtom,} from "../storage/character";
import { useAtom } from "jotai";
import { LevelMeter } from "../components/shared";
import { CharacterCard } from "../components/cards";
import { GiClothes } from "react-icons/gi"
import { BsFillBackpackFill } from "react-icons/bs";



export function CharacterPage() {
    const [character] = useAtom(characterAtom)
    const [isShopOpen, setIsShopOpen] = useState(false);
    const [isInventoryOpen, setIsInventoryOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return ( <>
      <main className="fixed inset-0 bg-gray-50 overflow-hidden">
      <button
        onClick={() => setIsSettingsOpen(true)}
        className="absolute top-2 right-2 sm:hidden z-10 flex items-center gap-2 px-3 py-2 rounded-4xl text-gray-700 hover:bg-gray-200 active:bg-gray-300 transition-colors"
      >
        <Settings className="text-gray-600" aria-label="Настройки" size={20} />
      </button>
        <div className="absolute inset-0 bottom-16 flex items-center justify-center">
          <div className="w-full max-w-lg px-4 flex flex-col items-center">

            <div role="contentinfo" className="text-center mb-2">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                {character.stats.gender === 'male' ? 'Василий' : 'Василиса'}
              </h1>
              <LevelMeter stats={character.stats} />
            </div>

            <div className="mb-8">
              <CharacterCard/>
            </div>

            <section className="grid grid-cols-2 gap-3 w-full">
              <button
                onClick={() => setIsInventoryOpen(true)}
                className="cursor-pointer py-3 px-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
              >
                <BsFillBackpackFill aria-label="Рюкзак" size={20} />
                <span>Инвентарь</span>
              </button>
              <button
                onClick={() => setIsShopOpen(true)}
                className="cursor-pointer py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 items-center text-white flex rounded-xl justify-center gap-2 font-medium shadow-lg hover:shadow-xl transition-shadow"
              >
                <GiClothes aria-label="Магазин одежды" size={20}/>
                <span>Магазин</span>
              </button>
            </section>
          </div>
        </div>
    </main>
  <ShopModal
    isOpen={isShopOpen}
    onClose={() => setIsShopOpen(false)}
  />

  <InventoryModal
    isOpen={isInventoryOpen}
    onClose={() => setIsInventoryOpen(false)}
  />

  <SettingsModal
    isOpen={isSettingsOpen}
    onClose={() => setIsSettingsOpen(false)}
  />
  </>
  );
}