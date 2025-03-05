import { atomWithStorage } from "jotai/utils";
import { User } from "./type";
import { atom } from "jotai";

export const userInfoAtom = atomWithStorage<User> (
    'userInfo', 
    {is_registered: false, is_tts: true, is_dark_theme: false} as User, 
    undefined, 
    {getOnInit: true}
)

export const ttsAtom = atom(
    (get) => get(userInfoAtom).is_tts,
    (_get, set, newState: boolean) => {
        set(userInfoAtom, (prevState) => ({
            ...prevState,
            is_tts: newState
        }))
    }
)

export const darkThemeAtom = atom(
    (get) => get(userInfoAtom).is_dark_theme,
    (_get, set, newState: boolean) => {
      set(userInfoAtom, (prevState) => ({
        ...prevState,
        is_dark_theme: newState
      }));
    }
  )