import React, { 
  createContext,
  ReactNode,
  useContext,
  useState
 } from 'react';

//  const { CLIENT_ID } = process.env;
//  const { REDIRECT_URI } = process.env;

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

interface AuthorizationResponse{
  params:{
    access_token: string;
  };
  type: string;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps){
  const [user, setUser] = useState<User>({} as User);

async function signInWithGoogle() {
  try {
    const CLIENT_ID = '334147493481-mu9ho6plsi0fdam9ma3157no6qfnp6l8.apps.googleusercontent.com';
    const REDIRECT_URI = 'https://auth.expo.io/@falecommmarcelo/gofinances';
    const RESPONSE_TYPE = 'token';
    const SCOPE = encodeURI('profile email');

    const useProxy = Platform.select({  web: false, default: true });
    const redirectUri = AuthSession.makeRedirectUri({ useProxy });

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

    const { type, params} = await AuthSession
    .startAsync({authUrl}) as AuthorizationResponse;

    if(type === 'success'){
      const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
      const userInfo = await response.json();
      setUser({
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.given_name,
        photo: userInfo.picture
      });
    }

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