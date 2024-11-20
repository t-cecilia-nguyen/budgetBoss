import { FontAwesome } from 'react-native-vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Import screens
import MyAccount from './screens/my_account';
import Settings from './screens/settings';

// Import tabs
import TransactionsTab from './tabs/transactions';
import ReportsTab from './tabs/reports';
import BudgetsTab from './tabs/budgets';
import ExpensesTab from './tabs/expenses';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName='Transactions'
      screenOptions={{
        headerShown: false,
      }}>
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

function AppDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName='Dashboard'>
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
        component={MainTabs} 
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
      component={MainTabs}
      options={({ navigation }) => ({
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
            onPress={() => navigation.openDrawer()}
          />
        ),
      })}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AppDrawer />
    </NavigationContainer>
  );
}
