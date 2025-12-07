import React, { useEffect } from 'react';
import { ThemeProvider } from './src/context/ThemeContext';
import { NavigationContainer } from '@react-navigation/native';
import Layout from './src/screens/Layout';
import { NavigationProvider } from './src/context/NavigationContext';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import { initDB } from './src/database/init';

export default function App() {
  useEffect(() => {
    (async () => {
      try {
        const db = await initDB();
        console.log('DB initialized:', db);
      } catch (e) {
        console.error('Error loading lists:', e);
      }
    })();
  }, []);
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <NavigationProvider>
            <Layout />
          </NavigationProvider>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}
