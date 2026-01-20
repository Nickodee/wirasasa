import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/colors';
import useAuthStore from '../../store/useAuthStore';
import useUserStore from '../../store/useUserStore';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuthStore();
  const { currentRole } = useUserStore();

  const menuItems = [
    {
      icon: 'person-outline',
      title: 'Edit Profile',
      onPress: () => {},
    },
    {
      icon: 'settings-outline',
      title: 'Settings',
      onPress: () => navigation.navigate('Settings'),
    },
    {
      icon: 'help-circle-outline',
      title: 'Support',
      onPress: () => navigation.navigate('Support'),
    },
    {
      icon: 'log-out-outline',
      title: 'Logout',
      onPress: logout,
      danger: true,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.gray[50] }}>
      <ScrollView>
        {/* Profile Header */}
        <View
          style={{
            backgroundColor: COLORS.primary,
            padding: 24,
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: COLORS.white,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <Icon name="person" size={48} color={COLORS.primary} />
          </View>

          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: COLORS.white,
              marginBottom: 4,
            }}
          >
            {user?.name || 'User Name'}
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: COLORS.white,
              opacity: 0.9,
            }}
          >
            {user?.phoneNumber || '+254 712 345 678'}
          </Text>

          <View
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              paddingHorizontal: 16,
              paddingVertical: 6,
              borderRadius: 20,
              marginTop: 12,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: COLORS.white,
                textTransform: 'capitalize',
              }}
            >
              {currentRole}
            </Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={{ padding: 16 }}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={item.onPress}
              style={{
                backgroundColor: COLORS.white,
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
                flexDirection: 'row',
                alignItems: 'center',
                shadowColor: COLORS.black,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: item.danger ? '#fee2e2' : COLORS.secondary,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 16,
                }}
              >
                <Icon
                  name={item.icon}
                  size={20}
                  color={item.danger ? COLORS.error : COLORS.primary}
                />
              </View>

              <Text
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: item.danger ? COLORS.error : COLORS.gray[900],
                  fontWeight: '500',
                }}
              >
                {item.title}
              </Text>

              <Icon
                name="chevron-forward"
                size={20}
                color={COLORS.gray[400]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
