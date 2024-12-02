import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { UserContext } from '../context/userContext';

export default function MyAccount() {
	const { user } = useContext(UserContext);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	
	useEffect(() => {
		console.log(user);
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
        }
    }, [user]);

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
