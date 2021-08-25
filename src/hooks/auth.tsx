import React, { 
  createContext,
  ReactNode,
  useContext
 } from 'react';

 import * as AuthSession from 'expo-auth-session';
import { Platform } from 'react-native';

interface AuthProviderProps{
  children: ReactNode;
}

interface User{
  id: string;
  name: string;
  email:string;
  photo?: string;
}

interface AuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps){
  const user = {
   id: '23141232',
   name: 'Marcelo Costa',
   email: 'marcelodscosta@yahoo.com.br'
  }

async function signInWithGoogle() {
  try {
    const CLIENT_ID = '334147493481-mu9ho6plsi0fdam9ma3157no6qfnp6l8.apps.googleusercontent.com';
    const REDIRECT_URI = 'https://auth.expo.io/@falecommmarcelo/gofinances';
    const RESPONSE_TYPE = 'token';
    const SCOPE = encodeURI('profile email');

    const useProxy = Platform.select({  web: false, default: true });
    const redirectUri = AuthSession.makeRedirectUri({ useProxy });

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

    const response = await AuthSession.startAsync({authUrl});
  } catch (error) {
    console.error(error)
    throw new Error(error);
  }
}

return (
<AuthContext.Provider value={{
  user,
  signInWithGoogle
}}>
  {children}
</AuthContext.Provider>

  )
}

function useAuth(){
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth }