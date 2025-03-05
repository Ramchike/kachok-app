import { Items, levelExperience } from "./constants";
import { atomWithStorage } from "jotai/utils";
import { Character, CharacterLevel, Gender, ItemWithLevels } from "./type";
import { atom } from "jotai";

export const findItemById = (itemId: string, gender: Gender): ItemWithLevels | undefined => {
  for (const items of Object.values(Items[gender])) {
    for (const item of items) {
      if (item.id === itemId) {
        return item;
      }
    }
  }
  return undefined;
};

export const getShopItemsArray = (gender: Gender): ItemWithLevels[] => {
  return Object.values(Items[gender]).flatMap(items => items);
};

export const getDefaultInventory = (gender: Gender): string[] => {
  const defaultItems: string[] = [];

  for (const items of Object.values(Items[gender])) {
    for (const item of items) {
      if (item.price === 0) {
        defaultItems.push(item.id);
      }
    }
  }

  return defaultItems;
};
  
export const getRandomItems = (gender: Gender) => {
    const inventory = getDefaultInventory(gender)
    const items = getShopItemsArray(gender)
    const bodyItems = items.filter(item => item.body_part === 'body' && inventory.includes(item.id));
    const legsItems = items.filter(item => item.body_part === 'legs' && inventory.includes(item.id));
  
    const randomBody = bodyItems[Math.floor(Math.random() * bodyItems.length)];
    const randomLegs = legsItems[Math.floor(Math.random() * legsItems.length)];
  
    return {
      body: randomBody?.id,
      legs: randomLegs?.id
    };
}

export const characterAtom = atomWithStorage<Character>('character', {} as Character, undefined, {getOnInit: true})

export const setExperienceCharacterAtom = atom(
  null,
  (get, set, experienceToAdd: number) => {
    const currentCharacter = get(characterAtom)
    let newExperience = currentCharacter.stats.experience + experienceToAdd
    let nowLevel = currentCharacter.stats.level
    while (levelExperience[nowLevel] && newExperience >= levelExperience[nowLevel] && levelExperience[nowLevel + 1 as CharacterLevel] !== undefined) {
      newExperience -= levelExperience[nowLevel]
      nowLevel = (nowLevel + 1) as CharacterLevel
    }
    const updatedCharacter: Character = {
      ...currentCharacter,
      stats: {
        ...currentCharacter.stats,
        level: nowLevel,
        experience: newExperience
      }
    }
    set(characterAtom, updatedCharacter)
  }
)