import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import { 
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
  
 } from './style';

export interface DataListProps extends TransactionCardProps {
   id: string;
 }

export function Dashboard(){
  const data : DataListProps [] = [
    {
    id: '1',
    title: "Desenvolvimento de Site",
    amount: "R$ 12.000,00",
    category: {
      name: 'Vendas',
      icon: 'dollar-sign'
    },
    date: "13/04/2020",
  },
  {
    id: '2',
    title: "Aluguel do apartamento",
    amount: "R$ 1.200,00",
    category: {
      name: 'Depesas Pessoais',
      icon: 'dollar-sign'
    },
    date: "13/04/2020",
  },
  {
    id: '3',
    title: "Hamburgueria Pizzy",
    amount: "R$ 59,00",
    category: {
      name: 'Alimentação',
      icon: 'dollar-sign'
    },
    date: "13/04/2020",
  }
]
  return (
    <Container>
      <Header>
       <UserWrapper>
          <UserInfo>
            <Photo source={{uri:'https://avatars.githubusercontent.com/u/81534727?v=4'}}/>

            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Marcelo Costa</UserName>
              
            </User>

          </UserInfo>
          <LogoutButton onPress={()=>{}}>
            <Icon name="power"/>
          </LogoutButton>

      </UserWrapper>
      </Header>
        <HighlightCards>
          
          <HighlightCard
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransation="Última Entrada dia 13 de abril"/>

          <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransation="Última Saída dia 03 de abril"/>

          <HighlightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransation="01 a 16 de Abril"/>

        </HighlightCards>

        <Transactions>
        <Title>Listagem</Title>

        <TransactionList
        data={data}
        keyExtractor={item=>item.id}
        renderItem={({item})=> <TransactionCard data={item}/> }
        
        
        />
        

        </Transactions>
    
    
    </Container>
    )
    
}