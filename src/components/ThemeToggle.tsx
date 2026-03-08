import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import CustomButton from './CustomButton';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <CustomButton
            onClick={toggleTheme}
            variant={theme === 'light' ? 'default' : 'dark'}
            className="fixed bottom-8 left-8 z-99"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <Moon className="w-6 h-6" />
            ) : (
                <Sun className="w-6 h-6" />
            )}
        </CustomButton>
    );
};

export default ThemeToggle;
