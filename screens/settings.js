import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Colors } from '../assets/colors';
import { useNavigation } from '@react-navigation/native';

export default function Settings() {
	const [isEnabled, setIsEnabled] = useState(false);
	const navigation = useNavigation();
	const toggleSwitch = () => setIsEnabled(previousState => !previousState);
	
	const navigateToContact = () => {
		navigation.navigate('Contact'); // Navigate to contact screen
	};

	const navigateToHelp = () => {
		navigation.navigate('Help'); // Navigate to help screen
	}

	return (
		<View style={styles.container}>
		<Text style={styles.title}>Settings</Text>
		<View style={styles.sectionContainer}>
			<Text style={styles.titleText}>GENERAL</Text>
			<View style={styles.toggleContainer}>
			<Text style={styles.text}>Notifications</Text>
			<Switch
				trackColor={{ false: '#767577', true: Colors.green }} 
				thumbColor={isEnabled ? '#FFFFFF' : '#F4F3F4'}
				onValueChange={toggleSwitch}
				value={isEnabled}
			/>
			</View>
			<TouchableOpacity style={styles.textContainer} onPress={() => { /* Handle Send feedback action here */ }}>
			<Text style={styles.text}>Delete Account</Text>
			</TouchableOpacity>
		</View>

		{/* Settings Options */}
		<View style={styles.sectionContainer}>
			<Text style={[styles.titleText, {marginTop: 20}]}>FEEDBACK</Text>

			<TouchableOpacity style={styles.textContainer} onPress={navigateToHelp}>
			<Text style={styles.text}>Help and Support</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.textContainer} onPress={navigateToContact}>
			<Text style={styles.text}>Contact Us</Text>
			</TouchableOpacity>
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