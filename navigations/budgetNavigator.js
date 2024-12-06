import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import BudgetFormTab from '../components/BudgetFormComponent';
import BudgetSummary from '../components/BudgetSummaryComponent'; 

const Stack = createStackNavigator();

export function BudgetStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="BudgetForm">
        <Stack.Screen name="BudgetForm" component={BudgetFormTab} options={{ headerShown: false }}/>
        <Stack.Screen name="BudgetSummary" component={BudgetSummary} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
}
