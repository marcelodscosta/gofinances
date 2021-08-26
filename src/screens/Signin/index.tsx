import React, { useContext, useState } from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { useTheme } from 'styled-components'

import Applesvg from '../../assets/apple.svg';
import Googlesvg from '../../assets/google.svg';
import Logosvg from '../../assets/logo.svg';

import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,

} from './styles';

export function SignIn(){
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle, signInWithApple } = useAuth();
  const theme = useTheme();
  
  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Google');
      setIsLoading(false)
    } 
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      return await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Apple');
      setIsLoading(false)
    } 
  }

return(
  <Container>
    <Header>
      <TitleWrapper>
        <Logosvg
        width={RFValue(120)}
        height={RFValue(68)}
        />

        <Title>
          Controle suas{'\n'}
          finanças de forma{'\n'}
          muito Simples

        </Title>

      </TitleWrapper>

      <SignInTitle>
        Faça seu login com{'\n'}
        uma das contas abaixo
      </SignInTitle>

    </Header>

    <Footer>
      <FooterWrapper>
        <SignInSocialButton title="Entrar com Google" svg={Googlesvg} onPress={handleSignInWithGoogle}/>
        { Platform.OS === 'ios' && <SignInSocialButton title="Entrar com Apple" svg={Applesvg} onPress={handleSignInWithApple}/>}

      </FooterWrapper>


    </Footer>
    {isLoading && <ActivityIndicator
    color={theme.colors.shap}
    style={{marginTop:18}}
    />}

  </Container>
);

}

