import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { COLORS } from '../../constants/colors';

const LoadingSpinner = ({ size = 'large', color = COLORS.primary }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
      }}
    >
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default LoadingSpinner;
