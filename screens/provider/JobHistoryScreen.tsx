import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '../../constants/Theme';
import { Job } from '../../types';

const mockJobs: Job[] = [
  {
    id: '1',
    clientId: '1',
    providerId: '1',
    serviceType: 'Mechanic',
    status: 'completed',
    location: {
      address: 'Westlands, Nairobi',
      latitude: -1.2921,
      longitude: 36.8219,
    },
    estimatedEarnings: 1500,
  },
  {
    id: '2',
    clientId: '2',
    providerId: '1',
    serviceType: 'Electrician',
    status: 'completed',
    location: {
      address: 'Parklands, Nairobi',
      latitude: -1.2931,
      longitude: 36.8229,
    },
    estimatedEarnings: 2000,
  },
  {
    id: '3',
    clientId: '3',
    providerId: '1',
    serviceType: 'Plumber',
    status: 'completed',
    location: {
      address: 'Kilimani, Nairobi',
      latitude: -1.2941,
      longitude: 36.8239,
    },
    estimatedEarnings: 1200,
  },
];

export default function ProviderJobHistoryScreen({ navigation }: any) {
  const renderJobItem = ({ item }: { item: Job }) => (
    <TouchableOpacity style={styles.jobCard} activeOpacity={0.7}>
      <View style={styles.jobHeader}>
        <View style={styles.serviceInfo}>
          <View style={[styles.iconContainer, { backgroundColor: Colors.primarySoft }]}>
            <Ionicons name="briefcase" size={20} color={Colors.primary} />
          </View>
          <View style={styles.serviceTextContainer}>
            <Text style={styles.serviceType}>{item.serviceType}</Text>
            <Text style={styles.jobDate}>
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </Text>
          </View>
        </View>
        <View style={styles.completedBadge}>
          <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.jobDetails}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Ionicons name="location-outline" size={18} color={Colors.textSecondary} />
            <Text style={styles.locationText} numberOfLines={1}>{item.location.address}</Text>
          </View>
        </View>
        
        <View style={styles.earningsContainer}>
          <Text style={styles.earningsLabel}>Earnings</Text>
          <Text style={styles.earningsValue}>KES {item.estimatedEarnings?.toLocaleString()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const totalEarnings = mockJobs.reduce(
    (sum, job) => sum + (job.estimatedEarnings || 0),
    0
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Job History</Text>
        <Text style={styles.headerSubtitle}>Your completed jobs</Text>
      </View>

      <FlatList
        data={mockJobs}
        renderItem={renderJobItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.summaryCard}>
            <View style={styles.summaryIconContainer}>
              <Ionicons name="wallet-outline" size={32} color={Colors.primary} />
            </View>
            <Text style={styles.summaryLabel}>Total Earnings</Text>
            <Text style={styles.summaryValue}>KES {totalEarnings.toLocaleString()}</Text>
            <View style={styles.summaryBadge}>
              <Ionicons name="briefcase-outline" size={14} color={Colors.primary} />
              <Text style={styles.summarySubtext}>{mockJobs.length} completed jobs</Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: Spacing.lg,
    paddingTop: Spacing.sm,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  headerTitle: {
    ...Typography.h1,
    color: Colors.text,
    fontWeight: '700',
    marginBottom: Spacing.xxs,
  },
  headerSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  list: {
    padding: Spacing.lg,
    paddingBottom: Platform.OS === 'ios' ? 150 : 130,
  },
  summaryCard: {
    backgroundColor: Colors.white,
    marginBottom: Spacing.lg,
    padding: Spacing.xl,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  summaryIconContainer: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  summaryLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.xs,
  },
  summaryValue: {
    ...Typography.h1,
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 36,
    marginBottom: Spacing.sm,
  },
  summaryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primarySoft,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    gap: Spacing.xs,
  },
  summarySubtext: {
    ...Typography.small,
    color: Colors.primary,
    fontWeight: '600',
  },
  jobCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  serviceTextContainer: {
    flex: 1,
  },
  serviceType: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: '600',
    marginBottom: 2,
  },
  jobDate: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  completedBadge: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.successLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginBottom: Spacing.md,
  },
  jobDetails: {
    gap: Spacing.sm,
  },
  detailRow: {
    marginBottom: Spacing.xs,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  locationText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    flex: 1,
  },
  earningsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.primarySoft,
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.xs,
  },
  earningsLabel: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  earningsValue: {
    ...Typography.body,
    fontWeight: '700',
    color: Colors.primary,
    fontSize: 16,
  },
});

