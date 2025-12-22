import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../constants/Theme';
import { ServiceProvider } from '../types';

interface ProviderCardProps {
  provider: ServiceProvider;
  onPress: () => void;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({ provider, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: provider.profileImage || 'https://via.placeholder.com/80' }}
          style={styles.avatar}
        />
        {provider.verified && (
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark" size={12} color={Colors.white} />
          </View>
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{provider.name}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>
            {provider.rating} ({provider.jobsCompleted})
          </Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.rate}>KSh {provider.hourlyRate}</Text>
          <Text style={styles.eta}>{provider.eta} min</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.md,
    marginRight: Spacing.md,
    width: 200,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Spacing.sm,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: Colors.primary + '30',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  info: {
    alignItems: 'center',
    width: '100%',
  },
  name: {
    ...Typography.h3,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  rating: {
    ...Typography.caption,
    marginLeft: Spacing.xs,
    color: Colors.textSecondary,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: Spacing.xs,
  },
  rate: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '600',
  },
  eta: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
});

