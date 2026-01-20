import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PhoneLoginScreen from '../screens/auth/PhoneLoginScreen';
import OTPVerificationScreen from '../screens/auth/OTPVerificationScreen';
import RoleSelectionScreen from '../screens/auth/RoleSelectionScreen';
import ProviderOnboardingScreen from '../screens/auth/ProviderOnboardingScreen';
import { COLORS } from '../constants/colors';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="PhoneLogin"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.white,
        },
        headerTintColor: COLORS.gray[900],
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="PhoneLogin"
        component={PhoneLoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OTPVerification"
        component={OTPVerificationScreen}
        options={{ title: 'Verify OTP' }}
      />
      <Stack.Screen
        name="RoleSelection"
        component={RoleSelectionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProviderOnboarding"
        component={ProviderOnboardingScreen}
        options={{ title: 'Complete Profile' }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
