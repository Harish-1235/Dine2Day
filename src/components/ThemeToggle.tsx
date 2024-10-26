import React from 'react';
import { Sun, Moon, Palette } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { mode, colorTheme, toggleMode, setColorTheme } = useTheme();

  const themes = [
    { id: 'default', name: 'Default' },
    { id: 'swiggy', name: 'Swiggy' },
    { id: 'zomato', name: 'Zomato' },
    { id: 'ubereats', name: 'Uber Eats' },
    { id: 'youtube', name: 'YouTube' },
  ];

  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <button
          className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-opacity-0 hover:bg-theme-primary hover:bg-opacity-10 theme-transition"
          onClick={() => {
            const themeSelect = document.getElementById('themeSelect');
            if (themeSelect) {
              themeSelect.click();
            }
          }}
        >
          <Palette className="h-5 w-5 text-theme" />
          <span className="text-sm text-theme">Theme</span>
        </button>
        <select
          id="themeSelect"
          value={colorTheme}
          onChange={(e) => setColorTheme(e.target.value as any)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        >
          {themes.map((theme) => (
            <option key={theme.id} value={theme.id}>
              {theme.name}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={toggleMode}
        className="p-2 rounded-lg bg-opacity-0 hover:bg-theme-primary hover:bg-opacity-10 theme-transition"
        aria-label="Toggle mode"
      >
        {mode === 'light' ? (
          <Moon className="h-5 w-5 text-theme" />
        ) : (
          <Sun className="h-5 w-5 text-theme" />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;