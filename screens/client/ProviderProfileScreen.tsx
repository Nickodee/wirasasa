import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../../constants/Theme';
import { ServiceProvider } from '../../types';

export default function ProviderProfileScreen({ route, navigation }: any) {
  const { provider }: { provider: ServiceProvider } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.backButton}>
            <Ionicons name="arrow-back" size={20} color={Colors.text} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.messageButton}>
            <Ionicons name="chatbubble-outline" size={20} color={Colors.text} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: provider.profileImage || 'https://via.placeholder.com/120' }}
              style={styles.avatar}
            />
            {provider.verified && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="shield-checkmark" size={20} color={Colors.white} />
              </View>
            )}
          </View>
          <Text style={styles.name}>{provider.name}</Text>
          <Text style={styles.profession}>{provider.profession}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={20} color="#FFD700" />
            <Text style={styles.rating}>
              {provider.rating} ({provider.jobsCompleted} jobs)
            </Text>
          </View>
        </View>

        <View style={styles.detailsGrid}>
          <View style={[styles.detailCard, { backgroundColor: '#E8F5E9' }]}>
            <Ionicons name="cash" size={24} color={Colors.primary} />
            <Text style={styles.detailLabel}>Hourly Rate</Text>
            <Text style={[styles.detailValue, { color: Colors.primary }]}>
              KSh {provider.hourlyRate}
            </Text>
          </View>
          <View style={[styles.detailCard, { backgroundColor: '#E3F2FD' }]}>
            <Ionicons name="time" size={24} color={Colors.secondary} />
            <Text style={styles.detailLabel}>ETA</Text>
            <Text style={[styles.detailValue, { color: Colors.secondary }]}>
              {provider.eta} min
            </Text>
          </View>
        </View>

        <View style={styles.aboutSection}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>
            {provider.about ||
              'Experienced auto mechanic. Quick diagnosis and repair for all vehicle makes.'}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.requestButton}
          onPress={() => navigation.navigate('ServiceRequest', { provider })}
        >
          <Text style={styles.requestButtonText}>Request Service</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    paddingTop: 60,
    backgroundColor: Colors.primary,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: Spacing.lg,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: -60,
    marginBottom: Spacing.lg,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: Colors.white,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.white,
  },
  name: {
    ...Typography.h1,
    marginBottom: Spacing.xs,
  },
  profession: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    ...Typography.body,
    marginLeft: Spacing.xs,
    fontWeight: '600',
  },
  detailsGrid: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
    gap: Spacing.md,
  },
  detailCard: {
    flex: 1,
    borderRadius: 12,
    padding: Spacing.md,
    alignItems: 'center',
  },
  detailLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  detailValue: {
    ...Typography.h2,
    fontWeight: 'bold',
  },
  aboutSection: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.h3,
    marginBottom: Spacing.sm,
  },
  aboutText: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  requestButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: Spacing.md,
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  requestButtonText: {
    ...Typography.h3,
    color: Colors.white,
  },
});

