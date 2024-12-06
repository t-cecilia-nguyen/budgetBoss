import React from "react";
import { StyleSheet, View, Text } from "react-native";
import ReportComponent from "../components/ReportComponent";
import {  useTransactions } from '../navigations/bottomTabs';
import { useEffect, useContext } from 'react';

import { BudgetContext } from "../context/budgetContext";


const ReportsTab = ({ route }) => {
	const {
    incomeTransactions,
    expenseTransactions,
		setExpenseTransactions,
		setIncomeTransactions
  } = useTransactions();  

  const { budgets, setBudgetChanged } = useContext(BudgetContext);

	useEffect(() => {
    console.log('Income Transactions:', incomeTransactions);
    console.log('Expense Transactions:', expenseTransactions);
  }, [incomeTransactions, expenseTransactions]);


	return (
		<View style={styles.container}>
		<ReportComponent
			incomeTransactions={incomeTransactions} 
			expenseTransactions={expenseTransactions} 
			setExpenseTransactions={setExpenseTransactions}
			setIncomeTransactions={setIncomeTransactions}
			budgets={budgets}
			setBudgetChanged={setBudgetChanged}
		/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		textAlign: "center",
		fontSize: 24,
		fontStyle: "bold",
	},
});

export default ReportsTab;
