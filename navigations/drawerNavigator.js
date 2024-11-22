import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Colors } from '../assets/colors';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Testing purposes only

// Import screens
import MyAccount from '../screens/myAccount';
import Settings from '../screens/settings';

// Import bottom tabs
import BottomTabs from './bottomTabs';

const Drawer = createDrawerNavigator();

// Placeholer for sign out
function SignOutComponent({ navigation }) {
	useEffect(() => {
        const handleSignOut = async () => {
            try {
                // await AsyncStorage.clear(); // Deletes AsyncStorage data - Use to reset if needed
                Alert.alert('You have been signed out');
				navigation.replace('Login');
            } catch (error) {
                console.log('Error during sign out:', error);
            }
        };
        handleSignOut();
    }, [navigation]);

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
			component={Settings}
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
