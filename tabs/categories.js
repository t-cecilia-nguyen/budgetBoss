import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTransactions } from '../navigations/bottomTabs';

const CategoriesTab = ({ route }) => {
	return (
		<View style={styles.container}>
		<Text style={styles.text}>Categories</Text>
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

export default CategoriesTab;
