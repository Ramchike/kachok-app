
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router";
import { BottomNav, SideNav } from "../components/shared";
import { Register, ExerciseCatalogPage, CharacterPage, WorkoutCatalogPage, SummaryPage, SettingsPage } from "../pages";
import { darkThemeAtom, userInfoAtom } from "../storage/user";
import { IconType } from "react-icons";
import { GiMuscleUp } from "react-icons/gi";
import {BiDumbbell} from 'react-icons/bi'
import { IoSettingsSharp, IoStatsChart, IoTimerSharp } from "react-icons/io5";

export type NavItem = {
    icon: IconType;
    label: string;
    path: string;
};

const navItems: NavItem[] = [
    { icon: IoStatsChart , label: 'Сводка', path: '/app' },
    { icon: BiDumbbell, label: 'Упражнения', path: '/app/exercise' },
    { icon: IoTimerSharp, label: 'Тренировки', path: '/app/workouts' },
    { icon: GiMuscleUp, label: 'Персонаж', path: '/app/character' },
]

const navItemsPC: NavItem[] = [
    { icon: IoStatsChart , label: 'Сводка', path: '/app' },
    { icon: BiDumbbell, label: 'Упражнения', path: '/app/exercise' },
    { icon: IoTimerSharp, label: 'Тренировки', path: '/app/workouts' },
    { icon: GiMuscleUp, label: 'Персонаж', path: '/app/character' },
    { icon: IoSettingsSharp, label: 'Настройки', path: '/app/settings' },
]

export const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Navigate to="/app" replace />} />
            <Route path="/app/*" element={<AppRoutes />} />
        </Routes>
    );
}

const AppRoutes = () => {
    const navigate = useNavigate();
    const [user] = useAtom(userInfoAtom);
    const isDarkMode = useAtomValue(darkThemeAtom)

    useEffect(() => {
        if (!user.is_registered) {
            navigate('/register');
        }
    }, [navigate, user]);

    useEffect(() => {
        if (typeof document !== 'undefined') {
          if (isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
          } else {
            document.documentElement.removeAttribute('data-theme');
          }
        }
    }, [isDarkMode]);

    if (!user.is_registered) return null; 
    
    return (
        <div className="min-h-screen bg-gray-50 pb-16 sm:pl-[72px]">
            <SideNav navItems={navItemsPC}/>
            <Routes>
                <Route index element={<SummaryPage/>}/>
                <Route path="exercise" element={<ExerciseCatalogPage />} />
                <Route path="character" element={<CharacterPage />} />
                <Route path="workouts" element={<WorkoutCatalogPage/>} />
                <Route path="settings" element={<SettingsPage/>} />
            </Routes>
            <BottomNav navItems={navItems}/>
        </div>
    );
}

export const App = () => {
    return (
        <BrowserRouter>
            <AllRoutes />
        </BrowserRouter>
    );
}