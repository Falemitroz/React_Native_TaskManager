import { useContext } from 'react';
import { NavigationContext } from '../context/NavigationContext';

export const useAppNavigation = () => {
  const ctx = useContext(NavigationContext);
  if (!ctx)
    throw new Error(
      'useNavigationContext must be used inside NavigationProvider',
    );
  return ctx;
};
