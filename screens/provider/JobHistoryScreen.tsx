import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../../constants/Theme';
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
    <TouchableOpacity style={styles.jobCard}>
      <View style={styles.jobHeader}>
        <View style={styles.serviceInfo}>
          <Ionicons
            name="car"
            size={24}
            color={Colors.primary}
            style={styles.serviceIcon}
          />
          <View>
            <Text style={styles.serviceType}>{item.serviceType}</Text>
            <Text style={styles.jobDate}>
              {new Date().toLocaleDateString()}
            </Text>
          </View>
        </View>
        <View style={styles.completedBadge}>
          <Text style={styles.completedText}>COMPLETED</Text>
        </View>
      </View>

      <View style={styles.jobDetails}>
        <View style={styles.locationRow}>
          <Ionicons name="location" size={16} color={Colors.textSecondary} />
          <Text style={styles.locationText}>{item.location.address}</Text>
        </View>
        <View style={styles.earningsRow}>
          <Text style={styles.earningsLabel}>Earnings:</Text>
          <Text style={styles.earningsValue}>
            KES {item.estimatedEarnings}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const totalEarnings = mockJobs.reduce(
    (sum, job) => sum + (job.estimatedEarnings || 0),
    0
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Job History</Text>
          <Text style={styles.headerSubtitle}>View your completed jobs</Text>
        </View>
      </View>
      <View style={styles.scrollContainer}>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Total Earnings</Text>
        <Text style={styles.summaryValue}>KES {totalEarnings.toLocaleString()}</Text>
        <Text style={styles.summarySubtext}>
          {mockJobs.length} completed jobs
        </Text>
      </View>

        <FlatList
          data={mockJobs}
          renderItem={renderJobItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: Spacing.lg,
    paddingTop: 60,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  scrollContainer: {
    flex: 1,
    marginTop: 140,
  },
  headerTitle: {
    ...Typography.h1,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  summaryCard: {
    backgroundColor: Colors.primary,
    margin: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: 16,
    alignItems: 'center',
  },
  summaryLabel: {
    ...Typography.body,
    color: Colors.white,
    opacity: 0.9,
  },
  summaryValue: {
    ...Typography.h1,
    color: Colors.white,
    marginTop: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  summarySubtext: {
    ...Typography.caption,
    color: Colors.white,
    opacity: 0.8,
  },
  list: {
    padding: Spacing.lg,
    paddingTop: 0,
  },
  jobCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  serviceIcon: {
    marginRight: Spacing.md,
  },
  serviceType: {
    ...Typography.h3,
    marginBottom: Spacing.xs,
  },
  jobDate: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  completedBadge: {
    backgroundColor: Colors.success + '20',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 8,
  },
  completedText: {
    ...Typography.small,
    color: Colors.success,
    fontWeight: '600',
  },
  jobDetails: {
    marginTop: Spacing.sm,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  locationText: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginLeft: Spacing.xs,
  },
  earningsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
  earningsLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  earningsValue: {
    ...Typography.body,
    fontWeight: '600',
    color: Colors.primary,
  },
});

