import React from 'react';

import { 
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Amount,
  LastTransation,

} from '../style';

interface Props {
  type: 'up' | 'down' | 'total';
  title: string;
  amount: string;
  lastTransation:string;
}

const icon = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
  total: 'dollar-sign'
}

export function HighlightCard({
  type,
  title,
  amount,
  lastTransation
}: Props){
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <Icon name={icon[type]}  type={type}/>
      </Header>

      <Footer>
        <Amount>{amount}</Amount>
        <LastTransation>{lastTransation}</LastTransation>

      </Footer>

    </Container>
  );
}