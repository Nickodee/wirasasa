import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { COLORS } from '../../constants/colors';

const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  error = '',
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
  editable = true,
  style = {},
}) => {
  const inputStyle = {
    borderWidth: 1,
    borderColor: error ? COLORS.error : COLORS.gray[300],
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: editable ? COLORS.white : COLORS.gray[100],
    color: COLORS.black,
    minHeight: multiline ? 100 : 48,
    textAlignVertical: multiline ? 'top' : 'center',
  };

  const focusedInputStyle = {
    borderColor: COLORS.primary,
  };

  return (
    <View style={[{ marginBottom: 16 }, style]}>
      {label && (
        <Text
          style={{
            fontSize: 14,
            fontWeight: '500',
            color: COLORS.gray[700],
            marginBottom: 8,
          }}
        >
          {label}
        </Text>
      )}
      <TextInput
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray[400]}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        numberOfLines={numberOfLines}
        editable={editable}
      />
      {error ? (
        <Text
          style={{
            fontSize: 12,
            color: COLORS.error,
            marginTop: 4,
          }}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
};

export default CustomInput;
