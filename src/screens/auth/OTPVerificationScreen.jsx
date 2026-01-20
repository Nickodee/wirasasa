import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { COLORS } from '../../constants/colors';
import CustomButton from '../../components/common/CustomButton';
import { validateOTP } from '../../utils/validation';
import { verifyOTP, sendOTP } from '../../api/auth.api';
import useAuthStore from '../../store/useAuthStore';

const OTPVerificationScreen = ({ route, navigation }) => {
  const { phoneNumber } = route.params;
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(60);
  const inputRefs = useRef([]);
  const { login } = useAuthStore();

  useEffect(() => {
    // Start countdown timer
    const interval = setInterval(() => {
      setResendCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOTPChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits are entered
    if (index === 5 && value) {
      const otpString = newOtp.join('');
      if (validateOTP(otpString)) {
        handleVerifyOTP(otpString);
      }
    }
  };

  const handleKeyPress = (index, key) => {
    // Handle backspace
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async (otpString = otp.join('')) => {
    if (!validateOTP(otpString)) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);

    try {
      const response = await verifyOTP(phoneNumber, otpString);
      
      // Save auth data
      await login(response.token, response.user);

      // Navigate based on user status
      if (response.user.isNewUser) {
        navigation.replace('RoleSelection');
      } else {
        navigation.replace('App');
      }
    } catch (err) {
      Alert.alert('Error', err.message || 'Invalid OTP. Please try again.');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      await sendOTP(phoneNumber);
      setResendCountdown(60);
      Alert.alert('Success', 'OTP has been resent to your phone');
      
      // Restart countdown
      const interval = setInterval(() => {
        setResendCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      Alert.alert('Error', err.message || 'Failed to resend OTP');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, padding: 24, justifyContent: 'center' }}>
        {/* Title */}
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: COLORS.gray[900],
            marginBottom: 8,
          }}
        >
          Verify Phone Number
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: COLORS.gray[600],
            marginBottom: 32,
          }}
        >
          Enter the 6-digit code sent to {phoneNumber}
        </Text>

        {/* OTP Input Boxes */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 32,
          }}
        >
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={{
                width: 48,
                height: 56,
                borderWidth: 2,
                borderColor: digit ? COLORS.primary : COLORS.gray[300],
                borderRadius: 8,
                textAlign: 'center',
                fontSize: 24,
                fontWeight: 'bold',
                color: COLORS.gray[900],
              }}
              value={digit}
              onChangeText={(value) => handleOTPChange(index, value)}
              onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(index, key)}
              keyboardType="number-pad"
              maxLength={1}
              autoFocus={index === 0}
            />
          ))}
        </View>

        {/* Verify Button */}
        <CustomButton
          title="Verify"
          onPress={() => handleVerifyOTP()}
          loading={loading}
          disabled={loading || otp.some((digit) => !digit)}
        />

        {/* Resend OTP */}
        <View style={{ alignItems: 'center', marginTop: 24 }}>
          {resendCountdown > 0 ? (
            <Text style={{ fontSize: 14, color: COLORS.gray[600] }}>
              Resend OTP in {resendCountdown}s
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResendOTP}>
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.primary,
                  fontWeight: '600',
                }}
              >
                Resend OTP
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OTPVerificationScreen;
