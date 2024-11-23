import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
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
    <View style={styles.container}>
      <TransactionList 
        incomeTransactions={incomeTransactions} 
        expenseTransactions={expenseTransactions} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

export default TransactionsTab;
