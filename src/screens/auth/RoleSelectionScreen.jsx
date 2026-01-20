import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/colors';
import CustomButton from '../../components/common/CustomButton';
import { register } from '../../api/auth.api';
import useUserStore from '../../store/useUserStore';
import useAuthStore from '../../store/useAuthStore';

const RoleSelectionScreen = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setPrimaryRole } = useUserStore();
  const { user, updateUser } = useAuthStore();

  const roles = [
    {
      id: 'client',
      title: 'I Need a Service',
      subtitle: 'Find and hire service providers',
      icon: 'person',
      color: COLORS.primary,
    },
    {
      id: 'provider',
      title: 'I Provide Services',
      subtitle: 'Offer your skills and earn money',
      icon: 'construct',
      color: COLORS.accent,
    },
  ];

  const handleContinue = async () => {
    if (!selectedRole) {
      Alert.alert('Error', 'Please select a role to continue');
      return;
    }

    setLoading(true);

    try {
      // Update user role
      const response = await register({
        phoneNumber: user.phoneNumber,
        primaryRole: selectedRole,
      });

      await updateUser({ ...response.user, primaryRole: selectedRole });
      await setPrimaryRole(selectedRole);

      // Navigate based on role
      if (selectedRole === 'provider') {
        navigation.replace('ProviderOnboarding');
      } else {
        navigation.replace('App');
      }
    } catch (err) {
      Alert.alert('Error', err.message || 'Failed to save role. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, padding: 24, justifyContent: 'center' }}>
        {/* Title */}
        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: COLORS.gray[900],
            marginBottom: 8,
            textAlign: 'center',
          }}
        >
          Choose Your Role
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: COLORS.gray[600],
            marginBottom: 48,
            textAlign: 'center',
          }}
        >
          How would you like to use WiraSasa?
        </Text>

        {/* Role Cards */}
        <View style={{ marginBottom: 48 }}>
          {roles.map((role) => (
            <TouchableOpacity
              key={role.id}
              onPress={() => setSelectedRole(role.id)}
              style={{
                backgroundColor:
                  selectedRole === role.id ? COLORS.secondary : COLORS.white,
                borderWidth: 2,
                borderColor:
                  selectedRole === role.id ? COLORS.primary : COLORS.gray[300],
                borderRadius: 16,
                padding: 24,
                marginBottom: 16,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              activeOpacity={0.7}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: role.color,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 16,
                }}
              >
                <Icon name={role.icon} size={32} color={COLORS.white} />
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: COLORS.gray[900],
                    marginBottom: 4,
                  }}
                >
                  {role.title}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: COLORS.gray[600],
                  }}
                >
                  {role.subtitle}
                </Text>
              </View>

              {selectedRole === role.id && (
                <Icon name="checkmark-circle" size={28} color={COLORS.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Continue Button */}
        <CustomButton
          title="Continue"
          onPress={handleContinue}
          loading={loading}
          disabled={!selectedRole || loading}
        />
      </View>
    </SafeAreaView>
  );
};

export default RoleSelectionScreen;
