import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { COLORS } from '../../constants/colors';

const CustomButton = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  icon = null,
  style = {},
}) => {
  const isPrimary = variant === 'primary';
  
  const buttonStyle = {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isPrimary ? COLORS.primary : COLORS.white,
    borderWidth: isPrimary ? 0 : 2,
    borderColor: COLORS.primary,
    opacity: disabled || loading ? 0.6 : 1,
  };

  const textStyle = {
    fontSize: 16,
    fontWeight: '600',
    color: isPrimary ? COLORS.white : COLORS.primary,
    marginLeft: icon ? 8 : 0,
  };

  return (
    <TouchableOpacity
      style={[buttonStyle, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? COLORS.white : COLORS.primary} />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {icon}
          <Text style={textStyle}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
