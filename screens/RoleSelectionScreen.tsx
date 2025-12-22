import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { Colors, Spacing, Typography } from '../constants/Theme';

export default function RoleSelectionScreen({ route, navigation }: any) {
  const { email, password } = route.params;
  const { login, user, role } = useAuth();

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

  const handleRoleSelection = async (role: 'client' | 'provider') => {
    await login(email, password, role);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Select Your Role</Text>
        <Text style={styles.subtitle}>Choose how you want to use WiraSasa</Text>

        <TouchableOpacity
          style={[styles.roleCard, styles.clientCard]}
          onPress={() => handleRoleSelection('client')}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="people" size={48} color={Colors.primary} />
          </View>
          <Text style={styles.roleTitle}>Client</Text>
          <Text style={styles.roleDescription}>
            Find and hire skilled professionals
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.roleCard, styles.providerCard]}
          onPress={() => handleRoleSelection('provider')}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="briefcase" size={48} color={Colors.secondary} />
          </View>
          <Text style={styles.roleTitle}>Service Provider</Text>
          <Text style={styles.roleDescription}>
            Offer your services and earn money
          </Text>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  title: {
    ...Typography.h1,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.body,
    textAlign: 'center',
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
  },
  roleCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.xl,
    marginBottom: Spacing.md,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  clientCard: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  providerCard: {
    borderWidth: 2,
    borderColor: Colors.secondary,
  },
  iconContainer: {
    marginBottom: Spacing.md,
  },
  roleTitle: {
    ...Typography.h2,
    marginBottom: Spacing.xs,
  },
  roleDescription: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});

