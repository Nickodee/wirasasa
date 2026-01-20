import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { COLORS } from '../../constants/colors';
import CustomButton from '../../components/common/CustomButton';
import CustomInput from '../../components/common/CustomInput';
import { validatePhone } from '../../utils/validation';
import { sendOTP } from '../../api/auth.api';

const PhoneLoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOTP = async () => {
    setError('');
    
    // Validate phone number
    if (!validatePhone(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    
    try {
      // Format phone number with country code
      const formattedPhone = phoneNumber.startsWith('254')
        ? phoneNumber
        : `254${phoneNumber.replace(/^0/, '')}`;
      
      await sendOTP(formattedPhone);
      
      // Navigate to OTP verification screen
      navigation.navigate('OTPVerification', {
        phoneNumber: formattedPhone,
      });
    } catch (err) {
      Alert.alert('Error', err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1, padding: 24, justifyContent: 'center' }}>
          {/* Logo */}
          <View style={{ alignItems: 'center', marginBottom: 48 }}>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: COLORS.primary,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 16,
              }}
            >
              <Text style={{ fontSize: 48, color: COLORS.white }}>W</Text>
            </View>
            <Text
              style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: COLORS.gray[900],
                marginBottom: 8,
              }}
            >
              WiraSasa
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.gray[600],
                textAlign: 'center',
              }}
            >
              Your trusted service marketplace
            </Text>
          </View>

          {/* Title */}
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: COLORS.gray[900],
              marginBottom: 8,
            }}
          >
            Welcome Back
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: COLORS.gray[600],
              marginBottom: 32,
            }}
          >
            Enter your phone number to continue
          </Text>

          {/* Phone Input */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
            <View
              style={{
                backgroundColor: COLORS.gray[100],
                paddingHorizontal: 12,
                paddingVertical: 14,
                borderRadius: 8,
                marginRight: 8,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: '600' }}>+254</Text>
            </View>
            <View style={{ flex: 1 }}>
              <CustomInput
                value={phoneNumber}
                onChangeText={(text) => {
                  setPhoneNumber(text);
                  setError('');
                }}
                placeholder="712345678"
                keyboardType="phone-pad"
                error={error}
                style={{ marginBottom: 0 }}
              />
            </View>
          </View>

          {/* Send OTP Button */}
          <CustomButton
            title="Send OTP"
            onPress={handleSendOTP}
            loading={loading}
            disabled={loading}
          />

          {/* Terms and Conditions */}
          <Text
            style={{
              fontSize: 12,
              color: COLORS.gray[500],
              textAlign: 'center',
              marginTop: 24,
            }}
          >
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PhoneLoginScreen;
