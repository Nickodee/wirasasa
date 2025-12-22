import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../../constants/Theme';
import { Job } from '../../types';
import { useJobs } from '../../context/JobContext';

const mockCompletedJobs: Job[] = [
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
    clientId: '1',
    providerId: '2',
    serviceType: 'Electrician',
    status: 'completed',
    location: {
      address: 'Parklands, Nairobi',
      latitude: -1.2931,
      longitude: 36.8229,
    },
    estimatedEarnings: 2000,
  },
];

export default function JobHistoryScreen({ navigation }: any) {
  const { clientJobs } = useJobs();
  
  // Combine user's jobs with mock completed jobs
  const allJobs = [...clientJobs, ...mockCompletedJobs];
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return Colors.success;
      case 'in_progress':
        return Colors.warning;
      case 'pending':
        return Colors.secondary;
      default:
        return Colors.textSecondary;
    }
  };

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
        <View
          style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}
        >
          <Text
            style={[styles.statusText, { color: getStatusColor(item.status) }]}
          >
            {item.status.replace('_', ' ').toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.jobDetails}>
        <View style={styles.locationRow}>
          <Ionicons name="location" size={16} color={Colors.textSecondary} />
          <Text style={styles.locationText}>{item.location.address}</Text>
        </View>
        {item.estimatedEarnings && (
          <View style={styles.earningsRow}>
            <Text style={styles.earningsLabel}>Amount Paid:</Text>
            <Text style={styles.earningsValue}>
              KSh {item.estimatedEarnings}
            </Text>
          </View>
        )}
      </View>

      {item.status === 'completed' && (
        <TouchableOpacity
          style={styles.reviewButton}
          onPress={() => navigation.navigate('Review', { job: item })}
        >
          <Text style={styles.reviewButtonText}>Leave Review</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>My Requests</Text>
          <Text style={styles.headerSubtitle}>View your service requests</Text>
        </View>
      </View>
      <View style={styles.scrollContainer}>

        {allJobs.length > 0 ? (
          <FlatList
            data={allJobs}
            renderItem={renderJobItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={64} color={Colors.textSecondary} />
            <Text style={styles.emptyStateText}>No requests yet</Text>
            <Text style={styles.emptyStateSubtext}>
              Your service requests will appear here
            </Text>
          </View>
        )}
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
  list: {
    padding: Spacing.lg,
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
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    ...Typography.small,
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
  reviewButton: {
    marginTop: Spacing.md,
    padding: Spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: 'center',
  },
  reviewButtonText: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  emptyStateText: {
    ...Typography.h3,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  emptyStateSubtext: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});

