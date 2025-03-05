

import { IconType } from "react-icons";
import { equipmentList, tagList } from ".";

export type Difficulty = 1 | 2 | 3
export type TagKey = typeof tagList[number]['id']
export type EquipmentKey = typeof equipmentList[number]['id']

export interface EquipmentItem {
    id: string
    name: string
    icon: IconType
    color: string
}

export interface TagItem {
    id: string
    name: string
    icon: IconType
    color: string
}

export interface Exercise {
    id: number;
    name: string; 
    instruction: string; 
    image?: string; 
    difficulty: Difficulty; 
    equipment: EquipmentKey[]; 
    tags: TagKey[]; 
    is_pined: boolean
}

