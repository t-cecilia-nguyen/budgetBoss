import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import IncomeExpensesFormComponent from '../components/IncomeExpensesFormComponent';
import { useTransactions } from '../navigations/bottomTabs';
import { useEffect } from 'react';

const ExpensesTab = ({ route }) => {
	const {
    incomeTransactions,
    expenseTransactions,
		setExpenseTransactions,
		setIncomeTransactions
	} = useTransactions(); 


	useEffect(() => {
    console.log('Income Transactions:', incomeTransactions);
    console.log('Expense Transactions:', expenseTransactions);
	}, [incomeTransactions, expenseTransactions]);


	return (
		<View >
		<IncomeExpensesFormComponent
			incomeTransactions={incomeTransactions} 
			expenseTransactions={expenseTransactions} 
			setExpenseTransactions={setExpenseTransactions}
			setIncomeTransactions={setIncomeTransactions}
		/>
		</View>
	);
};

export default ExpensesTab;
