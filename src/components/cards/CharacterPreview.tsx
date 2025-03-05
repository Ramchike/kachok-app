import React from "react";
import { characterAtom, CharacterAvatars, findItemById, ItemWithLevels } from "../../storage/character";
import { useAtom } from "jotai";

interface Props {
  previewItem?: ItemWithLevels;
}

export const CharacterPreview: React.FC<Props> = ({previewItem}) => {
  const [character] = useAtom(characterAtom)
  const level = character.stats.level
  const previewCharacter = previewItem ? {
    ...character,
    equipped: {
      ...character.equipped,
      [previewItem.body_part]: previewItem.id
    }
  } : character;

  const equippedItems = Object.entries(previewCharacter.equipped)
    .filter(([, itemId]) => itemId)
    .map(([part, itemId]) => ({
      part,
      image: findItemById(itemId, character.stats.gender)?.lvl_img[level]
    }));

  return (
    <div className="relative w-full aspect-square">
      <img
        src={CharacterAvatars[character.stats.gender][character.stats.level]}
        alt="Character"
        className="absolute inset-0 w-full h-full object-contain"
      />
      {equippedItems.map(({ part, image }) => (
        <img
          key={part}
          src={image}
          alt={`${part} item`}
          className="absolute inset-0 w-full h-full object-contain"
        />
      ))}
    </div>
  );
}