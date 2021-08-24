import React, { useContext } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import Applesvg from '../../assets/apple.svg';
import Googlesvg from '../../assets/google.svg';
import Logosvg from '../../assets/logo.svg';

import { SignInSocialButton } from '../../components/SignInSocialButton';
import { AuthContext } from '../../AuthContext';
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
  const data = useContext(AuthContext);
  console.log(data);
  

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
        <SignInSocialButton title="Entrar com Google" svg={Googlesvg}/>
        <SignInSocialButton title="Entrar com Apple" svg={Applesvg}/>

      </FooterWrapper>


    </Footer>

  </Container>
);

}

