import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import TransactionList from '../components/TransactionListComponent'; 
import { useTransactions } from '../navigations/bottomTabs';

const TransactionsTab = () => {

	const {
    incomeTransactions,
    expenseTransactions,
  } = useTransactions();  

	useEffect(() => {
    console.log('Income Transactions:', incomeTransactions);
    console.log('Expense Transactions:', expenseTransactions);
  }, [incomeTransactions, expenseTransactions]);



  return (
    <View>
      <TransactionList 
        incomeTransactions={incomeTransactions} 
        expenseTransactions={expenseTransactions} 
      />
    </View>
  );
};

export default TransactionsTab;
