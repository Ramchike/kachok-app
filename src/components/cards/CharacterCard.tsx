import { motion } from 'framer-motion';
import { characterAtom, CharacterAvatars, findItemById} from '../../storage/character';
import { useAtom } from 'jotai';
import { backgroundCharacter } from '../../assets';


export const CharacterCard = () => {

    const [character] = useAtom(characterAtom)
    const level = character.stats.level
    const baseCharacterImage = CharacterAvatars[character.stats.gender][character.stats.level];

    return (
        <div className="relative w-[280px] h-[420px] mx-auto rounded-3xl overflow-hidden">
            <div className="absolute inset-0">
            <img 
                src={backgroundCharacter}
                alt="Gym background"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
            <motion.img
                src={baseCharacterImage}
                alt="Character"
                className="absolute w-full h-full object-contain"
                loading='eager'
            />

            {Object.entries(character.equipped).map(([part, itemId]) => {
                if (!itemId) return null;
                
                const item = findItemById(itemId, character.stats.gender);
                if (!item) return null;

                return (
                <motion.img
                    key={part}
                    src={item.lvl_img[level]}
                    alt={item.name}
                    className="absolute w-full h-full object-contain"
                    loading='eager'
                />
                );
            })}
            </div>
        </div>
    );
}
