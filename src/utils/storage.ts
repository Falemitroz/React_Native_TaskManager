// storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = 'theme';
const SEARCHES_KEY = 'searches';

// ---- Theme ----
export const loadTheme = async (): Promise<'light' | 'dark' | null> => {
  const theme = await AsyncStorage.getItem(THEME_KEY);
  return theme === 'light' || theme === 'dark' ? theme : null;
};

export const saveTheme = async (theme: 'light' | 'dark') => {
  return await AsyncStorage.setItem(THEME_KEY, theme);
};

// --- Searches ---
export const loadSearches = async (): Promise<string[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(SEARCHES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Errore della lettura di " searches " \n', error);
  }
  return [];
};

export const saveSearches = async (searches: string[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(searches);
    await AsyncStorage.setItem(SEARCHES_KEY, jsonValue);
  } catch (error) {
    console.error('Errore nel salvataggio di " searches " \n', error);
  }
};
