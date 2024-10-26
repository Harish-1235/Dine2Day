import React, { createContext, useContext, useState, useEffect } from 'react';

type ColorTheme = 'default' | 'swiggy' | 'zomato' | 'ubereats' | 'youtube';
type Mode = 'light' | 'dark';

interface ThemeContextType {
  mode: Mode;
  colorTheme: ColorTheme;
  toggleMode: () => void;
  setColorTheme: (theme: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<Mode>(() => {
    const savedMode = localStorage.getItem('mode');
    return (savedMode as Mode) || 'light';
  });

  const [colorTheme, setColorTheme] = useState<ColorTheme>(() => {
    const savedTheme = localStorage.getItem('colorTheme');
    return (savedTheme as ColorTheme) || 'default';
  });

  useEffect(() => {
    localStorage.setItem('mode', mode);
    localStorage.setItem('colorTheme', colorTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(mode);
    document.documentElement.setAttribute('data-theme', colorTheme);
  }, [mode, colorTheme]);

  const toggleMode = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ mode, colorTheme, toggleMode, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};