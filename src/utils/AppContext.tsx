// contexts/AppContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type AppContextType = {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    selectedModel: string;
    setSelectedModel: (model: string) => void;
    availableModels: string[];
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultModels = ['KayO (Gemini 2.0 Flash)', 'KayO (Deepseek R1)', 'KayO (LLaMA 4 Maverick)'];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => localStorage.getItem('theme') === 'dark');
    const [selectedModel, setSelectedModel] = useState<string>(defaultModels[0]);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => {
            const newMode = !prev;
            localStorage.setItem('theme', newMode ? 'dark' : 'light');
            return newMode;
        });
    };

    return (
        <AppContext.Provider value={{ isDarkMode, toggleDarkMode, selectedModel, setSelectedModel, availableModels: defaultModels }}>
            <div className={isDarkMode ? 'dark' : ''}>{children}</div>
        </AppContext.Provider>
    );
};

// Custom hook
export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
