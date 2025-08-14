import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import themeTokens from '../app/theme';

const THEME_KEY = 'APP_THEME';
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('light'); // 'light' or 'dark'

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem(THEME_KEY);
      if (stored) setMode(stored);
    })();
  }, []);

  const toggle = async () => {
    const next = mode === 'light' ? 'dark' : 'light';
    setMode(next);
    await AsyncStorage.setItem(THEME_KEY, next);
  };

  const tokens = mode === 'light' ? themeTokens.light : themeTokens.dark;

  return (
    <ThemeContext.Provider value={{ mode, tokens, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
