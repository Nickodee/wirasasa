import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/colors';
import { formatCurrency } from '../../utils/formatters';

const EarningsCard = ({ title, amount, icon = 'cash', trend = null }) => {
  return (
    <View
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
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: COLORS.secondary,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 12,
          }}
        >
          <Icon name={icon} size={20} color={COLORS.primary} />
        </View>
        
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 14,
              color: COLORS.gray[600],
              marginBottom: 4,
            }}
          >
            {title}
          </Text>
          
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: COLORS.gray[900],
            }}
          >
            {formatCurrency(amount)}
          </Text>
        </View>

        {trend && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: trend > 0 ? '#dcfce7' : '#fee2e2',
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 6,
            }}
          >
            <Icon
              name={trend > 0 ? 'trending-up' : 'trending-down'}
              size={16}
              color={trend > 0 ? COLORS.success : COLORS.error}
            />
            <Text
              style={{
                fontSize: 12,
                fontWeight: '600',
                color: trend > 0 ? COLORS.success : COLORS.error,
                marginLeft: 4,
              }}
            >
              {Math.abs(trend)}%
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default EarningsCard;
