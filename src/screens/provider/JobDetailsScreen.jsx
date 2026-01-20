import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { COLORS } from '../../constants/colors';

const JobDetailsScreen = ({ route }) => {
  const { job } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ padding: 24 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Job Details</Text>
        <Text style={{ fontSize: 16, marginTop: 16 }}>
          Job ID: {job?.id}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default JobDetailsScreen;
