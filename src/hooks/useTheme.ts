import { useContext } from 'react';
import { ThemeContextType, ThemeContext } from '../context/ThemeContext';

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error('useTheme deve essere usato dentro un ThemeProvider');
  return context;
};
