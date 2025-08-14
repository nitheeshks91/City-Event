import React from 'react';
import { StatusBar } from 'react-native';
import './src/app/i18n'; // initialize i18n
import { AuthProvider } from './src/contexts/AuthContext';
import { LocaleProvider } from './src/contexts/LocaleContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <LocaleProvider>
      <ThemeProvider>
        <AuthProvider>
          <StatusBar />
          <AppNavigator />
        </AuthProvider>
      </ThemeProvider>
    </LocaleProvider>
  );
};


export default App;