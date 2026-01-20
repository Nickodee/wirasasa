import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/colors';
import { formatCurrency, formatDistance } from '../../utils/formatters';

const ProviderCard = ({ provider, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(provider)}
      style={{
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
      }}
      activeOpacity={0.7}
    >
      {/* Profile Photo with Badges */}
      <View style={{ position: 'relative', marginRight: 12 }}>
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: COLORS.gray[300],
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon name="person" size={32} color={COLORS.gray[600]} />
        </View>
        
        {/* Verification Badges */}
        {provider.hasCertificates && (
          <View
            style={{
              position: 'absolute',
              right: -4,
              top: -4,
              backgroundColor: COLORS.accentBlue,
              borderRadius: 10,
              width: 20,
              height: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon name="checkmark" size={12} color={COLORS.white} />
          </View>
        )}
        
        {provider.hasGoodConduct && (
          <View
            style={{
              position: 'absolute',
              right: -4,
              bottom: -4,
              backgroundColor: COLORS.accent,
              borderRadius: 10,
              width: 20,
              height: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon name="checkmark" size={12} color={COLORS.white} />
          </View>
        )}
      </View>

      {/* Provider Info */}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: COLORS.gray[900],
            marginBottom: 4,
          }}
        >
          {provider.name}
        </Text>
        
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
          <Icon name="star" size={14} color="#f59e0b" />
          <Text
            style={{
              fontSize: 14,
              color: COLORS.gray[600],
              marginLeft: 4,
              marginRight: 12,
            }}
          >
            {provider.rating} ({provider.reviewCount})
          </Text>
          
          <Icon name="location" size={14} color={COLORS.gray[500]} />
          <Text
            style={{
              fontSize: 14,
              color: COLORS.gray[600],
              marginLeft: 4,
            }}
          >
            {formatDistance(provider.distance * 1000)}
          </Text>
        </View>
        
        <Text
          style={{
            fontSize: 14,
            color: COLORS.gray[600],
            marginBottom: 4,
          }}
        >
          {provider.experience} years exp.
        </Text>
        
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: COLORS.primary,
            }}
          >
            {formatCurrency(provider.hourlyRate)}/hr
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: COLORS.gray[500],
              marginLeft: 8,
            }}
          >
            {formatCurrency(provider.dailyRate)}/day
          </Text>
        </View>
      </View>

      {/* Request Button */}
      <TouchableOpacity
        onPress={() => onPress(provider)}
        style={{
          backgroundColor: COLORS.primary,
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: COLORS.white,
          }}
        >
          Request
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ProviderCard;
