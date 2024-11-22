import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Colors } from '../assets/colors';

export default function NotificationToggle() {
	const [isEnabled, setIsEnabled] = useState(false);

	const toggleSwitch = () => setIsEnabled(previousState => !previousState);

	return (
		<View style={styles.container}>	
			<Text style={styles.title}>Settings</Text>
			<View style={styles.titleContainer}>	
				<Text style={styles.titleText}>GENERAL</Text>
			</View>
			<View style={styles.toggleContainer}>
				<Text style={styles.text}>Notifications</Text>
				<Switch
					trackColor={{ false: '#767577', true: Colors.green }} 
					thumbColor={isEnabled ? '#FFFFFF' : '#F4F3F4'}
					onValueChange={toggleSwitch}
					value={isEnabled}
				/>
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.text}>Delete Account</Text>
			</View>
			<View style={styles.titleContainer}>	
				<Text style={styles.titleText}>FEEDBACK</Text>
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.text}>Report a bug</Text>
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.text}>Contact</Text>
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.text}>Send feedback</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
		color: Colors.primaryBlue,
	},
	titleContainer: {
		width: '100%',
		marginBottom: 10,
		marginTop: 10,
	},
	titleText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: Colors.lightGrey,
		marginBottom: 10,
	},
	toggleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
		marginTop: 10,
		marginBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#D3D3D3',
		paddingBottom: 5,
	},
	textContainer: {
		flexDirection: 'row',
		alignItems: 'left',
		width: '100%',
		marginTop: 10,
		marginBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#D3D3D3',
		paddingBottom: 10,
	},
	text: {
		fontSize: 18,
		marginBottom: 10,
		color: Colors.primaryBlue,
	},
});