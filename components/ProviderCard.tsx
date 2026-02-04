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
      <View style={styles.infoRow}>
        <View style={styles.infoMain}>
          <Text style={styles.name}>{provider.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>
              {provider.rating} ({provider.jobsCompleted})
            </Text>
          </View>
        </View>
        <View style={styles.infoMeta}>
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
    borderRadius: 10,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.borderLight,
    width: '100%',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: Spacing.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1.5,
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
  infoRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  infoMain: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  infoMeta: {
    alignItems: 'flex-end',
  },
  name: {
    ...Typography.body,
    fontWeight: '600',
    marginBottom: Spacing.xxs,
    textAlign: 'left',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    ...Typography.caption,
    marginLeft: Spacing.xs,
    color: Colors.textSecondary,
  },
  details: {
    flexDirection: 'row',
  },
  rate: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '600',
  },
  eta: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});

