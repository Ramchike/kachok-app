import { Gender } from "../character";

export interface User {
    is_tts: boolean
    is_dark_theme: boolean
    is_registered: boolean
    gender: Gender
    height: number
    weight: number
}