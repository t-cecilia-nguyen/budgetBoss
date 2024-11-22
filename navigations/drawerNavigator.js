import React from 'react';
import { FontAwesome } from 'react-native-vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Import screens
import MyAccount from '../screens/my_account';
import Settings from '../screens/settings';

// Import bottom tabs
import BottomTabs from './bottomTabs';

const Drawer = createDrawerNavigator();

// Placeholer for sign out
function SignOutComponent({ navigation }) {
	React.useEffect(() => {
		navigation.reset({
			index: 0,
			routes: [{ name: 'Login' }]
		});
		}, [navigation]);
		return null;
}

export default function DrawerNavigator() {
	return (
		<Drawer.Navigator
		initialRouteName="Dashboard"
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
