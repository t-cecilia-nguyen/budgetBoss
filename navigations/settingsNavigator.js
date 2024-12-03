import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import Settings from '../screens/settings';  
import Contact from '../screens/contact'; 
import HelpSupport from '../screens/helpSupport';

const Stack = createStackNavigator();

export function SettingsStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Settings">
        <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }}/>
        <Stack.Screen name="Help" component={HelpSupport} options={{ headerShown: false }}/>
        <Stack.Screen name="Contact" component={Contact} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
}
