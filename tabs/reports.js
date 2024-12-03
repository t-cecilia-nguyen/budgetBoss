import React from "react";
import { StyleSheet, View, Text } from "react-native";
import ReportComponent from "../components/ReportComponent";
import { useBudgets, useTransactions } from '../navigations/bottomTabs';
import { useEffect } from 'react';

const ReportsTab = ({ route }) => {
	const {
    incomeTransactions,
    expenseTransactions,
		setExpenseTransactions,
		setIncomeTransactions
  } = useTransactions();  

  const { budgetEntries, setBudgetEntries } = useBudgets();


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
			budgetEntries={budgetEntries}
			setBudgetEntries={setBudgetEntries}
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
