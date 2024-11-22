import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

function MyAccount() {
	return (
		<View style={styles.container}>
		<View style={styles.card}>
			<Image
			source={require('../assets/profilepic.png')}
			style={styles.profileImage}
			/>
			<Text style={styles.name}>Mary Jane</Text>
			<Text style={styles.email}>maryjane@example.com</Text> 
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		marginTop: 100,
	},
	profileImage: {
		width: 200,
		height: 200,
		borderRadius: 50,
		marginBottom: 20,
	},
	name: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 5,
		textAlign: 'center',
	},
	email: {
		fontSize: 14,
		color: '#555',
		textAlign: 'center',
	},
});

export default MyAccount;
