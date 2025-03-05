import { levelExperience } from "."

export type CharacterLevel = keyof typeof levelExperience
export type BodyPart = 'body' | 'legs' | 'arms' | 'head' | 'boots'
export type Gender = 'male' | 'female'

export interface CharacterStats {
  level: CharacterLevel
  experience: number
  gender: Gender
}

export interface Character {
  stats: CharacterStats
  coins: number;
  inventory: string[];
  equipped: {
    body: string
    legs: string
    head?: string
    arms?: string
    boots?: string
  };
}

export interface Item {
  id: string
  name: string
  image: string
  body_part: BodyPart
  price: number
}

export interface ItemWithLevels {
  id: string;
  name: string;
  price: number;
  body_part: BodyPart;
  lvl_img: Record<CharacterLevel, string>;
}

