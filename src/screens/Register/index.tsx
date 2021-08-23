import React from 'react';

import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import AsyncStorage from '@react-native-async-storage/async-storage'

import { useForm } from 'react-hook-form';

import { CommonActions, useNavigation } from '@react-navigation/native'

import uuid from 'react-native-uuid';

import { Button } from '../../components/Forms/Button';

import { InputForm } from '../../components/Forms/InputForm';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';

import { useState, useEffect } from 'react';

import { CategorySelect } from '../CategorySelect'

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from './styles';

interface FormData {
  name: string;
  amount: string;
}

const dataKey = '@golfinance: transactions';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup.number().typeError('Inform um valor numérico').positive('O valor não pode ser negativo').required('O valor é obrigatório')

});

export function Register (){

  const [transactionType, setTransactionType] = useState('');
  const[categoryModalOpen, setCategoryModalOpen] = useState(false);


  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  });

  const navigation = useNavigation();
  
  
  const { 
    control,
    handleSubmit,
    reset,
    formState: { errors }

  } = useForm({
    resolver: yupResolver(schema)
  });

  function handleTransactionsTypeSelect(type: 'positive' | 'negative'){
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal(){
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal(){
    setCategoryModalOpen(false);
  }

async  function handleRegister(form: FormData){

    if(!transactionType)
    return Alert.alert('Selecione o tipo da Transação');

    if(category.key === 'category')
    return Alert.alert('Selecione uma categoria');

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
     }
     
    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [
        ...currentData,
        newTransaction
      ]

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria'
      });

      // navigation.navigate({key: 'Listagem'});

      navigation.dispatch(
        CommonActions.navigate({
          name: 'Listagem',
        })
      );
            
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível Salvar');
    }
  }
  
    //  useEffect(()=>{
    //   async function loadData(){
    //     const data = await AsyncStorage.getItem(dataKey);
    //     console.log(JSON.parse(data!)); 
    //   }

    //   loadData();
    //   async function removeAll(){
    //   await AsyncStorage.removeItem(dataKey);
    //   }
    //   removeAll();
    // },[]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <Title>Cadastro</Title>
          </Header>

        <Form>
          <Fields>
              <InputForm
              name = 'name'
              control = {control}
              placeholder= 'Nome'
              autoCapitalize='sentences'
              autoCorrect={false}
              error={errors.name && errors.name.message}
              />
              <InputForm
              name = 'amount'
              control = {control} 
              placeholder='Preço'
              keyboardType='numeric'
              error={errors.amount && errors.amount.message}
              
              />
              <TransactionsTypes>

                <TransactionTypeButton
                type='up'
                title='Income'
                onPress={ () => handleTransactionsTypeSelect('positive')}
                isActive= {transactionType === 'positive'}
                />
                

                <TransactionTypeButton
                type='down'
                title='Outcome'
                onPress={ () => handleTransactionsTypeSelect('negative')}
                isActive= {transactionType === 'negative'}
                />
              </TransactionsTypes>

              <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
              />
            </Fields>
          <Button
          title="Enviar"
          onPress={handleSubmit(handleRegister)}
          />
          
          <Modal visible={categoryModalOpen}>

              <CategorySelect
              
              category = {category}
              setCategory={setCategory}
              closeSelectCategory={handleCloseSelectCategoryModal}
                  
              />

        </Modal>
            
        </Form>



        </Container>
    </TouchableWithoutFeedback>
  );
}