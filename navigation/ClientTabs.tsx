import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Theme';
import HomeScreen from '../screens/client/HomeScreen';
import ServiceSelectionScreen from '../screens/client/ServiceSelectionScreen';
import ProviderProfileScreen from '../screens/client/ProviderProfileScreen';
import ChatScreen from '../screens/client/ChatScreen';
import TrackingScreen from '../screens/client/TrackingScreen';
import JobHistoryScreen from '../screens/client/JobHistoryScreen';
import ReviewScreen from '../screens/client/ReviewScreen';
import ProfileScreen from '../screens/client/ProfileScreen';
import PaymentMethodsScreen from '../screens/client/PaymentMethodsScreen';
import NotificationsScreen from '../screens/client/NotificationsScreen';
import ServiceRequestScreen from '../screens/client/ServiceRequestScreen';
import HelpSupportScreen from '../screens/HelpSupportScreen';
import UpcomingJobsScreen from '../screens/client/UpcomingJobsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="ServiceSelection" component={ServiceSelectionScreen} />
      <Stack.Screen name="ProviderProfile" component={ProviderProfileScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Tracking" component={TrackingScreen} />
      <Stack.Screen name="ServiceRequest" component={ServiceRequestScreen} />
    </Stack.Navigator>
  );
}

function RequestsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RequestsMain" component={JobHistoryScreen} />
      <Stack.Screen name="Review" component={ReviewScreen} />
      <Stack.Screen name="Tracking" component={TrackingScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
      <Stack.Screen name="UpcomingJobs" component={UpcomingJobsScreen} />
    </Stack.Navigator>
  );
}

export default function ClientTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: Colors.white,
          elevation: 8,
          shadowColor: Colors.black,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MyRequests"
        component={RequestsStack}
        options={{
          tabBarLabel: 'My Requests',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

