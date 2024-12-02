import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/login';
import SignUpScreen from './screens/signup';
import DrawerNavigator from './navigations/drawerNavigator';
import { UserProvider } from './context/userContext';

const Stack = createStackNavigator();

export default function App() {
	return (
		<UserProvider>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
					<Stack.Screen name="Login" component={LoginScreen} />
					<Stack.Screen name="Signup" component={SignUpScreen} />
					<Stack.Screen name="MainApp" component={DrawerNavigator} />      
				</Stack.Navigator>
			</NavigationContainer>
		</UserProvider>
	);
}
