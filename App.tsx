import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from './context/AuthContext';
import { JobProvider } from './context/JobContext';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import RoleSelectionScreen from './screens/RoleSelectionScreen';
import ClientTabs from './navigation/ClientTabs';
import ProviderTabs from './navigation/ProviderTabs';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { user, role } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
        {user && role === 'client' && (
          <Stack.Screen name="ClientApp" component={ClientTabs} />
        )}
        {user && role === 'provider' && (
          <Stack.Screen name="ProviderApp" component={ProviderTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <JobProvider>
        <StatusBar style="auto" />
        <AppNavigator />
      </JobProvider>
    </AuthProvider>
  );
}

