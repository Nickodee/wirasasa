import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { COLORS } from '../../constants/colors';

const SupportScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ padding: 24 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Support</Text>
        <Text style={{ fontSize: 16, marginTop: 16, color: COLORS.gray[600] }}>
          Support screen coming soon...
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SupportScreen;
