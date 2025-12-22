import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../../constants/Theme';
import { Job } from '../../types';
import { useJobs } from '../../context/JobContext';

const mockUpcomingJobs: Job[] = [
  {
    id: '1',
    clientId: '1',
    providerId: '1',
    serviceType: 'Mechanic',
    status: 'pending',
    location: {
      address: 'Westlands, Nairobi',
      latitude: -1.2921,
      longitude: 36.8219,
    },
    estimatedEarnings: 1500,
    distance: 2.5,
    estimatedTime: 15,
  },
  {
    id: '2',
    clientId: '1',
    providerId: '2',
    serviceType: 'Electrician',
    status: 'in_progress',
    location: {
      address: 'Parklands, Nairobi',
      latitude: -1.2931,
      longitude: 36.8229,
    },
    estimatedEarnings: 2000,
    distance: 3.2,
    estimatedTime: 20,
  },
];

export default function UpcomingJobsScreen({ navigation }: any) {
  const { clientJobs, updateJobStatus } = useJobs();
  const allJobs = [...clientJobs, ...mockUpcomingJobs];
  const [selectedJob, setSelectedJob] = useState<Job | null>(allJobs[0] || null);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const handleCancelService = (job: Job) => {
    Alert.alert(
      'Cancel Service',
      'Are you sure you want to cancel this service request?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => {
            updateJobStatus(job.id, 'cancelled');
            Alert.alert('Service Cancelled', 'Your service request has been cancelled.');
          },
        },
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return Colors.warning;
      case 'in_progress':
        return Colors.primary;
      default:
        return Colors.textSecondary;
    }
  };

  const renderJobCard = ({ item }: { item: Job }) => (
    <TouchableOpacity
      style={[
        styles.jobCard,
        selectedJob?.id === item.id && styles.selectedJobCard,
      ]}
      onPress={() => setSelectedJob(item)}
      activeOpacity={0.7}
    >
      <View style={styles.jobHeader}>
        <View style={styles.serviceIconContainer}>
          <Ionicons name="car" size={24} color={Colors.primary} />
        </View>
        <View style={styles.jobInfo}>
          <Text style={styles.serviceType}>{item.serviceType}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={14} color={Colors.textSecondary} />
            <Text style={styles.locationText}>{item.location.address}</Text>
          </View>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) + '15' },
          ]}
        >
          <Text
            style={[styles.statusText, { color: getStatusColor(item.status) }]}
          >
            {item.status.replace('_', ' ').toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.jobDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="time" size={16} color={Colors.textSecondary} />
          <Text style={styles.detailText}>
            {item.estimatedTime ? `${item.estimatedTime} min` : 'Pending'}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="cash" size={16} color={Colors.textSecondary} />
          <Text style={styles.detailText}>KES {item.estimatedEarnings}</Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        {item.status === 'in_progress' && (
          <TouchableOpacity
            style={styles.trackButton}
            onPress={() => navigation.navigate('Tracking', { job: item })}
          >
            <Ionicons name="navigate" size={16} color={Colors.white} />
            <Text style={styles.trackButtonText}>Track Provider</Text>
          </TouchableOpacity>
        )}
        {(item.status === 'pending' || item.status === 'in_progress') && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => handleCancelService(item)}
          >
            <Ionicons name="close-circle" size={16} color={Colors.error} />
            <Text style={styles.cancelButtonText}>Cancel Service</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upcoming Jobs</Text>
        <TouchableOpacity
          onPress={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
        >
          <Ionicons
            name={viewMode === 'list' ? 'map' : 'list'}
            size={24}
            color={Colors.primary}
          />
        </TouchableOpacity>
      </View>

      {viewMode === 'map' && selectedJob ? (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: selectedJob.location.latitude,
              longitude: selectedJob.location.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            <Marker
              coordinate={{
                latitude: selectedJob.location.latitude,
                longitude: selectedJob.location.longitude,
              }}
              title={selectedJob.serviceType}
              description={selectedJob.location.address}
            >
              <View style={styles.mapMarker}>
                <Ionicons name="location" size={24} color={Colors.white} />
              </View>
            </Marker>
          </MapView>
          <View style={styles.mapInfoCard}>
            <Text style={styles.mapInfoTitle}>{selectedJob.serviceType}</Text>
            <Text style={styles.mapInfoText}>{selectedJob.location.address}</Text>
            {selectedJob.status === 'in_progress' && (
              <TouchableOpacity
                style={styles.mapTrackButton}
                onPress={() => navigation.navigate('Tracking', { job: selectedJob })}
              >
                <Text style={styles.mapTrackButtonText}>Track Provider</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : (
        <>
          <FlatList
            data={allJobs.filter(job => job.status !== 'completed' && job.status !== 'cancelled')}
            renderItem={renderJobCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Ionicons name="document-text-outline" size={64} color={Colors.textSecondary} />
                <Text style={styles.emptyStateText}>No active requests</Text>
                <Text style={styles.emptyStateSubtext}>
                  You don't have any active service requests
                </Text>
              </View>
            }
          />
          <View style={styles.bottomActions}>
            <TouchableOpacity
              style={styles.requestAnotherButton}
              onPress={() => navigation.navigate('HomeMain')}
            >
              <Ionicons name="add-circle" size={20} color={Colors.white} />
              <Text style={styles.requestAnotherButtonText}>Request Another Service</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    paddingTop: 60,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    ...Typography.h2,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  mapMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.white,
  },
  mapInfoCard: {
    position: 'absolute',
    bottom: Spacing.lg,
    left: Spacing.lg,
    right: Spacing.lg,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.md,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  mapInfoTitle: {
    ...Typography.h3,
    marginBottom: Spacing.xs,
  },
  mapInfoText: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  mapTrackButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: Spacing.sm,
    alignItems: 'center',
  },
  mapTrackButtonText: {
    ...Typography.body,
    color: Colors.white,
    fontWeight: '600',
  },
  list: {
    padding: Spacing.lg,
  },
  jobCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedJobCard: {
    borderColor: Colors.primary,
  },
  jobHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  serviceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  jobInfo: {
    flex: 1,
  },
  serviceType: {
    ...Typography.h3,
    marginBottom: Spacing.xs,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginLeft: 4,
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
    flexDirection: 'row',
    marginBottom: Spacing.md,
    gap: Spacing.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: Spacing.sm,
    gap: Spacing.xs,
  },
  trackButtonText: {
    ...Typography.body,
    color: Colors.white,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  cancelButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.error,
    gap: Spacing.xs,
  },
  cancelButtonText: {
    ...Typography.body,
    color: Colors.error,
    fontWeight: '600',
  },
  bottomActions: {
    padding: Spacing.lg,
    paddingTop: Spacing.md,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  requestAnotherButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: Spacing.md,
    gap: Spacing.sm,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  requestAnotherButtonText: {
    ...Typography.h3,
    color: Colors.white,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
    minHeight: 300,
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

