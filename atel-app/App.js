import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import MarketplaceScreen from './src/screens/MarketplaceScreen';
import OrdersScreen from './src/screens/OrdersScreen';
import WalletScreen from './src/screens/WalletScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import AgentDetailsScreen from './src/screens/AgentDetailsScreen';
import OfferDetailsScreen from './src/screens/OfferDetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Marketplace Stack Navigator
function MarketplaceStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MarketplaceMain" 
        component={MarketplaceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="OfferDetails" 
        component={OfferDetailsScreen}
        options={{ title: 'Offer Details' }}
      />
      <Stack.Screen 
        name="AgentDetails" 
        component={AgentDetailsScreen}
        options={{ title: 'Agent Details' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#8E8E93',
          headerStyle: {
            backgroundColor: '#F8F8F8',
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            title: 'Home',
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen 
          name="Marketplace" 
          component={MarketplaceStack}
          options={{
            title: 'Marketplace',
            tabBarLabel: 'Market',
            headerShown: false,
          }}
        />
        <Tab.Screen 
          name="Orders" 
          component={OrdersScreen}
          options={{
            title: 'My Orders',
            tabBarLabel: 'Orders',
          }}
        />
        <Tab.Screen 
          name="Wallet" 
          component={WalletScreen}
          options={{
            title: 'Wallet',
            tabBarLabel: 'Wallet',
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{
            title: 'Profile',
            tabBarLabel: 'Me',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
