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
		<View style={styles.container}>
		<Text style={styles.text}>Income and Expenses Form</Text>
		<IncomeExpensesFormComponent
				        incomeTransactions={incomeTransactions} 
								expenseTransactions={expenseTransactions} 
								setExpenseTransactions={setExpenseTransactions}
								setIncomeTransactions={setIncomeTransactions}
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
	},
	text: {
		textAlign: 'center',
	}
});

export default ExpensesTab;
