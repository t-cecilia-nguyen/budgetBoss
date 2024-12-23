import React, { useContext, useEffect, useState } from 'react';
import { Alert, View, Text, Image, StyleSheet } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Colors } from '../assets/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../context/userContext';
import { SettingsStackNavigator } from './settingsNavigator';

// Import screens
import MyAccount from '../screens/myAccount';

// Import bottom tabs
import BottomTabs from './bottomTabs';

const Drawer = createDrawerNavigator();

function DrawerContent(props) {
	const { user } = useContext(UserContext);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const profilePicture = require('../assets/profilepic.png');

	useEffect(() => {
		console.log(user);
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
        }
    }, [user]);

	return (
		<View style={styles.drawerContainer}>
		<View style={styles.profileImageContainer}>
        <Image
			source={profilePicture}
			style={styles.profileImage}
        />
		</View>
		<View style={styles.profileInfoContainer}>
			<Text style={styles.profileName}>{firstName} {lastName}</Text>
			<Text style={styles.profileEmail}>{email}</Text>
		</View>
		<DrawerItemList {...props} />
    </View>
	);
}

// Placeholder for sign out
function SignOutComponent({ navigation }) {
	const { setUser } = useContext(UserContext);

	useEffect(() => {
        const handleSignOut = async () => {
            try {
				// Remove token and clear data from context
                await AsyncStorage.removeItem('token');
				setUser(null);

                Alert.alert('You have been signed out');
				navigation.replace('Login');
            } catch (error) {
                console.log('Error during sign out:', error);
            }
        };
        handleSignOut();
    }, [navigation, setUser]);
		return null;
}

export default function DrawerNavigator() {
	return (
		<Drawer.Navigator
		initialRouteName="Dashboard"
		screenOptions={{
			headerStyle: {
			backgroundColor: Colors.primaryBlue,
			},
			drawerActiveTintColor: Colors.primaryBlue,
		}}
		drawerContent={(props) => <DrawerContent {...props} />}
		>
		<Drawer.Screen 
			name="My Account" 
			component={MyAccount} 
			options={({ navigation }) => ({
			drawerIcon: ({ color, size }) => (
				<FontAwesome name="user" color={color} size={size} />
			),
			headerShown: true,
			headerTitle: () => null,
			headerLeft: () => (
				<FontAwesome
				name="navicon"
				size={24}
				style={{ marginLeft: 20 }}
				onPress={() => navigation.openDrawer()}
				/>
			),
			})} 
		/>
		<Drawer.Screen 
			name="Dashboard" 
			component={BottomTabs} 
			options={({ navigation }) => ({
			drawerIcon: ({ color, size }) => (
				<FontAwesome name="clipboard" color={color} size={size} />
			),
			headerShown: true,
			headerTitle: () => null,
			headerLeft: () => (
				<FontAwesome
				name="navicon"
				size={24}
				style={{ marginLeft: 20 }}
				onPress={() => navigation.openDrawer()}
				/>
			),
			})} 
		/>
		<Drawer.Screen
			name="Settings"
			component={SettingsStackNavigator}
			options={({ navigation }) => ({
			drawerIcon: ({ color, size }) => (
				<FontAwesome name="cog" color={color} size={size} />
			),
			headerShown: true,
			headerTitle: () => null,
			headerLeft: () => (
				<FontAwesome
				name="navicon"
				size={24}
				style={{ marginLeft: 20 }}
				onPress={() => navigation.openDrawer()}
				/>
			),
			})}
		/>
		<Drawer.Screen
		name="Sign Out"
		component={SignOutComponent}
		options={({ }) => ({
			drawerIcon: ({ color, size }) => (
			<FontAwesome name="sign-out" color={color} size={size} />
			),
			headerShown: true,
			headerTitle: () => null,
			headerLeft: () => (
			<FontAwesome
				name="navicon"
				size={24}
				style={{ marginLeft: 20 }}
			/>
			),
		})}
		/>
		</Drawer.Navigator>
	);
}

const styles = StyleSheet.create({
	drawerContainer: {
	flex: 1,
	paddingTop: 20,
	marginTop: 30,
	margin: 20
	},
	profileImageContainer: {
	alignItems: 'left',
	marginBottom: 10,
	},
	profileImage: {
	width: 120,
	height: 120,
	borderRadius: 50,
	},
	profileInfoContainer: {
	paddingLeft: 20,
	marginBottom: 30,
	},
	profileName: {
	fontSize: 18,
	fontWeight: 'bold',
	},
	profileEmail: {
	fontSize: 14,
	color: '#777',
	},
});