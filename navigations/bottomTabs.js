import { FontAwesome } from 'react-native-vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../assets/colors';

// Import tabs
import TransactionsTab from '../tabs/transactions';
import ReportsTab from '../tabs/reports';
import BudgetsTab from '../tabs/budgets';
import ExpensesTab from '../tabs/expenses';

const Tab = createBottomTabNavigator();

export default function ButtomTabs() {
	return (
		<Tab.Navigator
		initialRouteName='Transactions'
		screenOptions={{
			headerShown: false,
			tabBarActiveTintColor: Colors.accentYellow,
        tabBarInactiveTintColor: Colors.lightGrey,
        tabBarStyle: {
			backgroundColor: Colors.primaryBlue,
		}}}
		>
		<Tab.Screen 
			name="Transactions" 
			component={TransactionsTab}
			options={{
			tabBarIcon: ({ color, size }) => (
				<FontAwesome name="clipboard" color={color} size={size} />
			),
			}} />
		<Tab.Screen 
			name="Expenses/Incomes" 
			component={ExpensesTab}
			options={{
			tabBarIcon: ({ color, size }) => (
				<FontAwesome name="dollar" color={color} size={size} />
			),
			}} />
		<Tab.Screen 
			name="Budgets" 
			component={BudgetsTab}
			options={{
			tabBarIcon: ({ color, size }) => (
				<FontAwesome name="calculator" color={color} size={size} />
			),
			}} />
		<Tab.Screen 
			name="Reports" 
			component={ReportsTab}
			options={{
			tabBarIcon: ({ color, size }) => (
				<FontAwesome name="line-chart" color={color} size={size} />
			),
			}} />
		</Tab.Navigator>
	);
}
