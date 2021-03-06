import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

// import { NavigationContainer } from '@react-navigation/native';
import { Routes } from './src/routes';

import React from 'react';
import { ThemeProvider } from 'styled-components';
import AppLoading from 'expo-app-loading';

import { SignIn } from './src/screens/Signin';

import { AuthProvider, useAuth } from './src/hooks/auth';



import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold

} from '@expo-google-fonts/poppins'

import theme from './src/global/styles/theme';
import { AppRoutes } from './src/routes/app.routes';


export default function App() {
  const [fontLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  const { userStorageLoading } = useAuth();

  if(!fontLoaded || userStorageLoading){
    return <AppLoading />
  }
  return (
    <ThemeProvider theme={theme}>
        
        <AuthProvider>
          <Routes/>
        {/* <AppRoutes/> */}
        </AuthProvider>
      
    </ThemeProvider>
  );
}

