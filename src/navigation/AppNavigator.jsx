import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import useAuthStore from '../store/useAuthStore';
import useUserStore from '../store/useUserStore';
import LoadingSpinner from '../components/common/LoadingSpinner';

// Navigation Stacks
import AuthStack from './AuthStack';
import ClientStack from './ClientStack';
import ProviderStack from './ProviderStack';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated, restoreAuth } = useAuthStore();
  const { currentRole, restoreUserState } = useUserStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      await restoreAuth();
      await restoreUserState();
      setIsReady(true);
    };

    initializeApp();
  }, []);

  if (!isReady) {
    return <LoadingSpinner />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : (
          <>
            {currentRole === 'client' ? (
              <Stack.Screen name="App" component={ClientStack} />
            ) : (
              <Stack.Screen name="App" component={ProviderStack} />
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
