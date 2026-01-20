import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/colors';

const ServiceCard = ({ service, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(service)}
      style={{
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        alignItems: 'center',
      }}
      activeOpacity={0.7}
    >
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: COLORS.secondary,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <Icon name={service.icon} size={32} color={COLORS.primary} />
      </View>
      
      <Text
        style={{
          fontSize: 16,
          fontWeight: '600',
          color: COLORS.gray[900],
          marginBottom: 4,
        }}
      >
        {service.name}
      </Text>
      
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name="star" size={16} color="#f59e0b" />
        <Text
          style={{
            fontSize: 14,
            color: COLORS.gray[600],
            marginLeft: 4,
          }}
        >
          4.5
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ServiceCard;
