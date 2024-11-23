import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BudgetFormComponent from '../components/BudgetFormComponent';

const BudgetsTab = () => {
	return (
		<View style={styles.container}>
		<Text style={styles.text}>Budgets</Text>
		<BudgetFormComponent />
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

export default BudgetsTab;
