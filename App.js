import { StyleSheet } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import components
import MyAccount from './components/my_account';
import Settings from './components/settings';

// Import tabs
import TransactionsTab from './tabs/transactions';
import ReportsTab from './tabs/reports';
import CategoriesTab from './tabs/categories';
import BudgetsTab from './tabs/budgets';
import OverviewsTab from './tabs/overview';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
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
        name="Overviews" 
        component={OverviewsTab}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="pie-chart" color={color} size={size} />
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
        name="Categories" 
        component={CategoriesTab}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="tags" color={color} size={size} />
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
    <Drawer.Navigator>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
