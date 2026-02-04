import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

/**
 * Custom hook to handle Android hardware back button
 * Navigates to previous screen instead of exiting the app
 */
export const useBackHandler = (navigation: any) => {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (navigation.canGoBack()) {
          navigation.goBack();
          return true; // Prevent default behavior
        }
        return false; // Allow default behavior if can't go back
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      
      return () => subscription.remove();
    }, [navigation])
  );
};
