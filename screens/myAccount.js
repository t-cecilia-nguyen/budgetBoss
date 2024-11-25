import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Testing purposes only

export default function MyAccount() {
		const [firstName, setFirstName] = useState('');
		const [lastName, setLastName] = useState('');
		const [email, setEmail] = useState('');
	
		useEffect(() => {
			const loadUserData = async () => {
				try {
					const storedFirstName = await AsyncStorage.getItem('userFirstName');
					const storedLastName = await AsyncStorage.getItem('userLastName');
					const storedEmail = await AsyncStorage.getItem('userEmail');

					if (storedFirstName) setFirstName(storedFirstName);
					if (storedLastName) setLastName(storedLastName);
					if (storedEmail) setEmail(storedEmail);
					
				} catch (error) {
					console.log('Error retrieving data:', error);
				} finally {
					setLoading(false);
				}
			};
			loadUserData();
		}, []);

	return (
		<View style={styles.container}>
		<View style={styles.card}>
			<Image
			source={require('../assets/profilepic.png')}
			style={styles.profileImage}
			/>
			<Text style={styles.name}>{firstName} {lastName}</Text>
			<Text style={styles.email}>{email}</Text> 
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
