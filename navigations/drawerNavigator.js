import React, { useEffect } from 'react';
import { Alert, View, Text, Image, StyleSheet } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Colors } from '../assets/colors';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Testing purposes only

// Import screens
import MyAccount from '../screens/myAccount';
import Settings from '../screens/settings';

// Import bottom tabs
import BottomTabs from './bottomTabs';

const Drawer = createDrawerNavigator();

function DrawerContent(props) {
	const user = {
		profilePicture: require('../assets/profilepic.png'),
		name: 'Test User',
		email: 'test@gmail.com',
	}

	return (
		<View style={styles.drawerContainer}>
		<View style={styles.profileImageContainer}>
        <Image
			source={user.profilePicture}
			style={styles.profileImage}
        />
		</View>
		<View style={styles.profileInfoContainer}>
			<Text style={styles.profileName}>{user.name}</Text>
			<Text style={styles.profileEmail}>{user.email}</Text>
		</View>
		<DrawerItemList {...props} />
    </View>
	);
}

// Placeholder for sign out
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