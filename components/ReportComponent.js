import React from 'react';
import { View, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const reportImages = [
	require('../assets/reports/RunningBudget.png'),
	require('../assets/reports/TransactionHistory.png'),
	require('../assets/reports/MonthlyReport.png'),
];

const ReportComponent = () => {

	return (
		<View style={styles.container}>

			<FlatList
			data={reportImages}
			keyExtractor={(item, index) => index.toString()} 
			renderItem={({ item }) => (
				<View style={styles.card}>
				<Image source={item} style={styles.image} />
				</View>
			)}
			contentContainerStyle={styles.scrollContainer}
			/>
		</View>
	);
};

export default ReportComponent;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	card: {
		alignItems: 'center', 
		paddingTop: 10
	},
	image: {
		width: 395, 
		height: 265, 
	},
	scrollContainer: {
		alignItems: 'center', 
	}
});



