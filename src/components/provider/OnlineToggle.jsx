import React from 'react';
import { View, Text, Switch } from 'react-native';
import { COLORS } from '../../constants/colors';

const OnlineToggle = ({ isOnline, onToggle }) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: COLORS.gray[900],
            marginBottom: 4,
          }}
        >
          {isOnline ? 'You are Online' : 'You are Offline'}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: COLORS.gray[600],
          }}
        >
          {isOnline
            ? 'You can receive job requests'
            : 'Turn on to receive job requests'}
        </Text>
      </View>

      <Switch
        value={isOnline}
        onValueChange={onToggle}
        trackColor={{ false: COLORS.gray[300], true: COLORS.primaryLight }}
        thumbColor={isOnline ? COLORS.primary : COLORS.gray[400]}
        ios_backgroundColor={COLORS.gray[300]}
      />
    </View>
  );
};

export default OnlineToggle;
