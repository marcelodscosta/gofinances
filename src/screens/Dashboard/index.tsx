import React, { useEffect, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect} from '@react-navigation/native';

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
  LoadContainer,
  
 } from './style';

export interface DataListProps extends TransactionCardProps {
   id: string;
 }

interface HighlightProps{
  amount: string;
}
  

 interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total:HighlightProps;
  }

export function Dashboard(){
  const [transactions, setTransactions] = useState <DataListProps[]>([]);
  const [isLoading, setIsloading] = useState(true);

  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);
  

  async function loadTransactions(){
    const dataKey = '@golfinance: transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;
    
    const transactionsFormatted: DataListProps[] = transactions
    .map((item: DataListProps)=>{

      if(item.type === 'positive'){
        entriesTotal += Number(item.amount);
      }else{
        expensiveTotal += Number(item.amount);
      }


      const amount = Number(item.amount)
      .toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });

        const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date(item.date));

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date,
      }

    });
    
    setTransactions(transactionsFormatted);

    const total = entriesTotal - expensiveTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      }
    });

        
    setIsloading(false);
    }

  useEffect(()=>{
    loadTransactions();
  },[])

  useFocusEffect(useCallback(()=>{
    loadTransactions();
  },[]));
//   const data : DataListProps [] = [
//     {
//     id: '1',
//     title: "Desenvolvimento de Site",
//     amount: "R$ 12.000,00",
//     category: {
//       name: 'Vendas',
//       icon: 'dollar-sign'
//     },
//     date: "13/04/2020",
//   },
//   {
//     id: '2',
//     title: "Aluguel do apartamento",
//     amount: "R$ 1.200,00",
//     category: {
//       name: 'Depesas Pessoais',
//       icon: 'dollar-sign'
//     },
//     date: "13/04/2020",
//   },
//   {
//     id: '3',
//     title: "Hamburgueria Pizzy",
//     amount: "R$ 59,00",
//     category: {
//       name: 'Alimentação',
//       icon: 'dollar-sign'
//     },
//     date: "13/04/2020",
//   }
// ]
  return (
    <Container>
      
      {
        isLoading ?
        <LoadContainer>
          <ActivityIndicator
          color="red"
          />
        </LoadContainer> :
      <>
      
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
          amount={highlightData.entries.amount}
          lastTransation="Última Entrada dia 13 de abril"/>

          <HighlightCard
          type="down"
          title="Saídas"
          amount={highlightData.expensives.amount}
          lastTransation="Última Saída dia 03 de abril"/>

          <HighlightCard
          type="total"
          title="Total"
          amount={highlightData.total.amount}
          lastTransation="01 a 16 de Abril"/>

        </HighlightCards>

        <Transactions>
        <Title>Listagem</Title>

        <TransactionList
        data={transactions}
        keyExtractor={item=>item.id}
        renderItem={({item})=> <TransactionCard data={item}/> }
        
        
        />
        

        </Transactions>
      </>
        }
    </Container>
    )
    
}