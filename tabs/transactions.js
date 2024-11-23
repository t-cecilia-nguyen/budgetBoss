import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TransactionList from '../components/TransactionListComponent'; 


const TransactionsTab = () => {
  return (
    <TransactionList />
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

export default TransactionsTab;
