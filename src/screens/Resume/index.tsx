import React, { useEffect, useState } from "react";
import { HistoryCar } from "../../components/HistoryCar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const data=[{ano:2011, ganhos: 13000}, {ano:2012, ganhos: 16500}, {ano:2013, ganhos: 14250}, {ano:2014, ganhos: 19000}];


import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
} from './styles';
import { categories } from "../../utils/categories";
import { View } from "react-native";
import { useAuth } from "../../hooks/auth";

interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
}

export function Resume(){
  const { user } = useAuth();
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  async function loadData(){
    const dataKey = `@golfinance: transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];
    
    const expensives = responseFormatted
    .filter((expensive: TransactionData) => expensive.type === 'negative');

    const expensivesTotal = expensives.reduce((acumullator: number, expensive: TransactionData)=>{ return acumullator + Number(expensive.amount)}, 0);

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category=>{
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if(expensive.category === category.key){
          categorySum += Number(expensive.amount);
        }      
      });

      if(categorySum > 0){
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });
      totalByCategory.push({
        key: category.key,
        name: category.name,
        color: category.color,
        total: categorySum, totalFormatted
      });
    }


    });
    setTotalByCategories(totalByCategory);
  }

  useEffect(()=>{
    loadData();
  },[])

    return (

    <Container>
      <Header>
        <Title>Resumo por Categoria</Title>
      </Header>
      <Content>
        <ChartContainer>
          {/* <VictoryPie data={totalByCategories} x="name" y="total" /> */}
        </ChartContainer>
        {
          totalByCategories.map(item=>(
            <HistoryCar
              key={item.key}
              title={item.name}
              amount={item.totalFormatted}
              color={item.color}
            />
          ))
        }
      </Content>
    </Container>

  );
}