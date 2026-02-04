import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { Colors, Spacing, Typography, BorderRadius } from '../constants/Theme';

export default function RoleSelectionScreen({ route, navigation }: any) {
  const { email, password } = route.params;
  const { login, user, role } = useAuth();
  const [hoveredRole, setHoveredRole] = useState<'client' | 'provider' | null>(null);

  useEffect(() => {
    if (user && role) {
      // Navigate after login completes
      if (role === 'client') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'ClientApp' }],
        });
      } else if (role === 'provider') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'ProviderApp' }],
        });
      }
    }
  }, [user, role, navigation]);

  // Handle Android back button
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.goBack();
        return true; // Prevent default behavior (exit app)
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [navigation])
  );

  const handleRoleSelection = async (selectedRole: 'client' | 'provider') => {
    await login(email, password, selectedRole);
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="arrow-back" size={24} color={Colors.text} />
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>
          Wira<Text style={styles.logoAccent}>Sasa</Text>
        </Text>
        <Text style={styles.title}>Select Your Role</Text>
        <Text style={styles.subtitle}>How would you like to continue?</Text>
      </View>

      {/* Role Cards */}
      <View style={styles.content}>
        {/* Client Card */}
        <TouchableOpacity
          style={styles.roleCard}
          onPress={() => handleRoleSelection('client')}
          activeOpacity={0.7}
        >
          <View style={styles.cardContent}>
            <View style={styles.iconCircle}>
              <Ionicons name="person-outline" size={36} color={Colors.primary} />
            </View>
            <View style={styles.textContent}>
              <Text style={styles.cardTitle}>I'm a Client</Text>
              <Text style={styles.cardSubtitle}>Looking for services</Text>
            </View>
          </View>
          <Ionicons name="arrow-forward" size={24} color={Colors.textSecondary} style={styles.arrow} />
        </TouchableOpacity>

        {/* Provider Card */}
        <TouchableOpacity
          style={styles.roleCard}
          onPress={() => handleRoleSelection('provider')}
          activeOpacity={0.7}
        >
          <View style={styles.cardContent}>
            <View style={styles.iconCircle}>
              <Ionicons name="briefcase-outline" size={36} color={Colors.secondary} />
            </View>
            <View style={styles.textContent}>
              <Text style={styles.cardTitle}>I'm a Provider</Text>
              <Text style={styles.cardSubtitle}>Offering services</Text>
            </View>
          </View>
          <Ionicons name="arrow-forward" size={24} color={Colors.textSecondary} style={styles.arrow} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  // Back Button
  backButton: {
    position: 'absolute',
    top: 50,
    left: Spacing.xl,
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  
  // Header
  header: {
    paddingTop: 100,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxxl,
    alignItems: 'center',
  },
  logo: {
    ...Typography.h1,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: Spacing.xl,
  },
  logoAccent: {
    color: Colors.primary,
  },
  title: {
    ...Typography.h1,
    fontSize: 32,
    textAlign: 'center',
    marginBottom: Spacing.xs,
    color: Colors.text,
  },
  subtitle: {
    ...Typography.body,
    textAlign: 'center',
    color: Colors.textSecondary,
    fontSize: 16,
  },
  
  // Content
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    gap: Spacing.base,
  },
  
  // Role Card
  roleCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 110,
  },
  
  // Card Content
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.base,
    flex: 1,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContent: {
    flex: 1,
  },
  cardTitle: {
    ...Typography.h2,
    color: Colors.text,
    fontSize: 20,
    marginBottom: 4,
  },
  cardSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    fontSize: 14,
  },
  arrow: {
    opacity: 0.6,
  },
});

