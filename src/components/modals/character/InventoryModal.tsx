import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { BodyPart, bodyPartLabels, bodyPartIcons, characterAtom, Items, getShopItemsArray, ItemWithLevels} from '../../../storage/character';
import { useAtom } from 'jotai';
import { CharacterPreview } from '../../cards/CharacterPreview';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const InventoryModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [character, setCharacter] = useAtom(characterAtom)
  const equippedItems = character.equipped
  const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPart | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const items = useMemo(() => {
    return getShopItemsArray(character.stats.gender)
    .filter(item => character.inventory.includes(item.id));
  }, [character.inventory, character.stats.gender]);

  const onEquip = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;
  
    let bodyPart: BodyPart | undefined;
    for (const [part, categories] of Object.entries(Items[character.stats.gender])) {
      for (const category of Object.values(categories)) {
        if (category.id === itemId) {
          bodyPart = part as BodyPart;
          break;
        }
      }
      if (bodyPart) break;
    }
  
    if (bodyPart) {
      setCharacter(prev => {
        const newEquipped = { ...prev.equipped };
        
        if (bodyPart === "body" || bodyPart === "legs") {
          newEquipped[bodyPart] = itemId;
        } else {
          if (newEquipped[bodyPart] === itemId) {
            delete newEquipped[bodyPart];
          } else {
            newEquipped[bodyPart] = itemId;
          }
        }
  
        return {
          ...prev,
          equipped: newEquipped
        };
      });
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setSelectedBodyPart('all');
      setSearchQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const itemsByBodyPart = items.reduce((acc, item) => {
    const bodyPart = item.body_part as BodyPart;
    if (!acc[bodyPart]) {
      acc[bodyPart] = [];
    }
    acc[bodyPart].push(item);
    return acc;
  }, {} as Record<BodyPart, ItemWithLevels[]>);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBodyPart = selectedBodyPart === 'all' || item.body_part === selectedBodyPart;
    return matchesSearch && matchesBodyPart;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center sm:justify-center"
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full h-full sm:h-[85vh] bg-white sm:rounded-2xl sm:max-w-2xl flex flex-col overflow-hidden"
      >
        <div className="flex-shrink-0 p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="dark:text-black text-lg font-semibold">Инвентарь</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className='dark:text-black' size={20} />
            </button>
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск предметов..."
            className="w-full dark:text-black px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
          />

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedBodyPart('all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap ${
                selectedBodyPart === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <span>Все</span>
            </button>
            {Object.entries(itemsByBodyPart).map(([bodyPart]) => {
              const Icon = bodyPartIcons[bodyPart as BodyPart];
              return (
                <button
                  key={bodyPart}
                  onClick={() => setSelectedBodyPart(bodyPart as BodyPart)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap ${
                    selectedBodyPart === bodyPart
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <Icon size={16} />
                  <span>{bodyPartLabels[bodyPart as BodyPart]}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filteredItems.map(item => {
              const isEquipped = equippedItems[item.body_part] === item.id;
              const canUnequip = item.body_part !== 'body' && item.body_part !== 'legs';
              
              return (
                <div
                  key={item.id}
                  className="flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden sm:hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-square bg-gray-50">
                    <CharacterPreview previewItem={item}/>
                    <div className="absolute top-2 right-2 bg-gray-500 dark:bg-white dark:text-black text-white text-xs px-2 py-1 rounded-lg">
                      {bodyPartLabels[item.body_part as BodyPart]}
                    </div>
                  </div>
                  
                  <div className="p-3 flex h-full justify-between flex-col">
                    <h3 className="text-sm dark:text-black font-medium mb-auto line-clamp-2">{item.name}</h3>
                    <button
                      onClick={() => onEquip(item.id)}
                      disabled={isEquipped && !canUnequip}
                      className={`w-full mt-3 py-2 text-white text-sm rounded-lg transition-colors ${
                        isEquipped
                          ? canUnequip
                            ? 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'
                            : 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'
                      }`}
                    >
                      {isEquipped ? // Если надетая одежда это футболка или штаны то ее нельзя снять и вместо нее будет текст "Надеть" серого цвета
                      (item.body_part === 'body' || item.body_part === 'legs') 
                      ? 'Надеть' 
                      : 'Снять' : 'Надеть'} 
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}