import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import IncomeExpensesFormComponent from '../components/IncomeExpensesFormComponent';

const ExpensesTab = () => {
	return (
		<View style={styles.container}>
		<Text style={styles.text}>Income and Expenses Form</Text>
		<IncomeExpensesFormComponent />
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
