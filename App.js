import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from 'react-native-vector-icons';
import TransactionsTab from './tabs/transactions';
import ReportsTab from './tabs/reports';
import CategoriesTab from './tabs/categories';
import BudgetsTab from './tabs/budgets';
import OverviewsTab from './tabs/overview';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: true,
          headerTitle: () => null,
        }}>
        <Tab.Screen 
          name="Transactions" 
          component={TransactionsTab}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="clipboard" color={color} size={size} />
            )
          }} />
          <Tab.Screen 
          name="Overviews" 
          component={OverviewsTab}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="pie-chart" color={color} size={size} />
            )
          }} />
          <Tab.Screen 
          name="Budgets" 
          component={BudgetsTab}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="calculator" color={color} size={size} />
            )
          }} />
          <Tab.Screen 
          name="Categories" 
          component={CategoriesTab}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="tags" color={color} size={size} />
            )
          }} />
        <Tab.Screen 
          name="Reports" 
          component={ReportsTab}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="line-chart" color={color} size={size} />
            )
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
