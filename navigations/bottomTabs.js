import { FontAwesome } from 'react-native-vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../assets/colors';
import { BudgetProvider } from '../context/budgetContext';

import { useState, createContext, useContext } from 'react';

// Import tabs
import TransactionsTab from '../tabs/transactions';
import ReportsTab from '../tabs/reports';
import ExpensesTab from '../tabs/expenses';

import { BudgetStackNavigator } from './budgetNavigator';

const Tab = createBottomTabNavigator();

export const TransactionsContext = createContext();

export const useTransactions = () => {
	return useContext(TransactionsContext);
};

export const TransactionsProvider = ({ children }) => {
	const [incomeTransactions, setIncomeTransactions] = useState([]);
	const [expenseTransactions, setExpenseTransactions] = useState([]);
  const [transactionsChanged, setTransactionsChanged] = useState(false); 

	return (
		<TransactionsContext.Provider
			value={{
				incomeTransactions,
				setIncomeTransactions,
				expenseTransactions,
				setExpenseTransactions,
        transactionsChanged,
        setTransactionsChanged,
			}}
			>
			{children}
		</TransactionsContext.Provider>
	);
};




export default function BottomTabs() {
  return (
    <BudgetProvider>
      <TransactionsProvider>
        <Tab.Navigator
          initialRouteName='Transactions'
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Colors.accentYellow,
            tabBarInactiveTintColor: Colors.lightGrey,
            tabBarStyle: {
              backgroundColor: Colors.primaryBlue,
            },
          }}
        >
          <Tab.Screen
            name="Transactions"
            component={TransactionsTab}
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="clipboard" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Inc/Exp"
            component={ExpensesTab}
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="dollar" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Budgets"
            component={BudgetStackNavigator}
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="calculator" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Reports"
            component={ReportsTab}
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="line-chart" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </TransactionsProvider>
    </BudgetProvider>
  );
}
