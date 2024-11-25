import React from 'react';
import { View } from 'react-native';
import BudgetFormComponent from '../components/BudgetFormComponent';
import { useTransactions } from '../navigations/bottomTabs';
import { useEffect } from 'react';

const BudgetsTab = ({ route }) => {
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
		<View>
		<BudgetFormComponent
			incomeTransactions={incomeTransactions} 
			expenseTransactions={expenseTransactions} 
			setExpenseTransactions={setExpenseTransactions}
			setIncomeTransactions={setIncomeTransactions}
		/>
		</View>
	);
};

export default BudgetsTab;
