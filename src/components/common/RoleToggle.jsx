import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/colors';
import useUserStore from '../../store/useUserStore';

const RoleToggle = () => {
  const { currentRole, toggleRole, isProvider } = useUserStore();

  if (!isProvider) {
    return null; // Only show toggle if user is a provider
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: COLORS.gray[200],
        borderRadius: 8,
        padding: 2,
        alignItems: 'center',
      }}
    >
      <TouchableOpacity
        onPress={() => currentRole !== 'client' && toggleRole()}
        style={{
          paddingVertical: 6,
          paddingHorizontal: 12,
          borderRadius: 6,
          backgroundColor: currentRole === 'client' ? COLORS.primary : 'transparent',
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: currentRole === 'client' ? COLORS.white : COLORS.gray[700],
          }}
        >
          Client
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => currentRole !== 'provider' && toggleRole()}
        style={{
          paddingVertical: 6,
          paddingHorizontal: 12,
          borderRadius: 6,
          backgroundColor: currentRole === 'provider' ? COLORS.primary : 'transparent',
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: currentRole === 'provider' ? COLORS.white : COLORS.gray[700],
          }}
        >
          Provider
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RoleToggle;
