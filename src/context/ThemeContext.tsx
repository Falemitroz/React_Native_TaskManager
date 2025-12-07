import React, { createContext, useEffect, useState, useMemo } from 'react';
import { Appearance } from 'react-native';
import {
  colors as themeColors,
  typography as baseTypography,
  ThemeMode,
} from '../theme/theme';
import { loadTheme, saveTheme } from '../utils/storage';

export type Theme = ThemeMode; // "light" | "dark"

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: Record<string, any>; // Risolti in stringhe
  typography: typeof baseTypography;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

// Helper generico per salvare stato + AsyncStorage
const persistState = async <T,>(
  setter: React.Dispatch<React.SetStateAction<T>>,
  saver: (v: T) => Promise<void>,
  value: T,
) => {
  setter(value);
  await saver(value);
};

// Funzione per risolvere colori in base al tema
const resolveColors = (mode: Theme) => {
  const resolve = (value: any) =>
    typeof value === 'string' ? value : value[mode];

  // base
  const base = Object.fromEntries(
    Object.entries(themeColors.base).map(([key, value]) => [
      key,
      resolve(value),
    ]),
  );

  // components
  const components = Object.fromEntries(
    Object.entries(themeColors.components).map(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        return [
          key,
          Object.fromEntries(
            Object.entries(value).map(([k, v]) => [k, resolve(v)]),
          ),
        ];
      }
      return [key, resolve(value)];
    }),
  );

  return { base, components };
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemTheme = Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
  const [theme, setThemeState] = useState<Theme>(systemTheme);

  // Carica tema e fontScale da AsyncStorage
  useEffect(() => {
    (async () => {
      try {
        const [savedTheme] = await Promise.all([loadTheme()]);
        if (savedTheme) setThemeState(savedTheme);
      } catch (e) {
        console.warn('Errore nel caricamento del tema/fontScale:', e);
      }
    })();
  }, []);

  // Listener tema di sistema
  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setThemeState(colorScheme === 'dark' ? 'dark' : 'light');
    });
    return () => listener.remove();
  }, []);

  // Stato persistente
  const toggleTheme = () =>
    persistState(
      setThemeState,
      saveTheme,
      theme === 'light' ? 'dark' : 'light',
    );

  // Colori risolti in base al tema attivo
  const colors = useMemo(() => resolveColors(theme), [theme]);

  // Tipografia scalata
  const typography = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(baseTypography).map(([key, style]) => [
          key,
          {
            ...style,
            fontSize: style.fontSize,
            lineHeight: style.lineHeight,
          },
        ]),
      ) as typeof baseTypography,
    [],
  );

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        colors,
        typography,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
