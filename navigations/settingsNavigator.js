import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from '../screens/settings';  // Settings screen
import Contact from '../screens/contact';  // Contact screen

const Stack = createStackNavigator();

export function SettingsStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Settings">
        <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }}/>
        <Stack.Screen name="Contact" component={Contact} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
}
