import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Testing purposes only

export default function MyAccount() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');

	useEffect(() => {
        const loadFirstName = async () => {
            try {
                const storedFirstName = await AsyncStorage.getItem('userFirstName');
                if (storedFirstName) {
                    setFirstName(storedFirstName);
                }
            } catch (error) {
                console.log('Error retrieving userFirstName:', error);
            } finally {
                setLoading(false);
            }
        };

		const loadLastName = async () => {
			try {
				const storedLastName = await AsyncStorage.getItem('userLastName');
				if (storedLastName) {
					setLastName(storedLastName);
				}
			} catch (error) {
				console.log('Error retrieving userLastName:', error);
			} finally {
				setLoading(false);
			}
		};

		const loadEmail = async () => {
			try {
				const storedEmail = await AsyncStorage.getItem('userEmail');
				if (storedEmail) {
					setEmail(storedEmail);
				}
			} catch (error) {
				console.log('Error retrieving userEmail:', error);
			} finally {
				setLoading(false);
			}
		};
		loadFirstName();
		loadLastName();
		loadEmail();
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
