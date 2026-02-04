import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../../constants/Theme';
import { Job } from '../../types';
import { useAuth } from '../../context/AuthContext';

const mockAvailableJobs: Job[] = [
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
    clientId: '2',
    providerId: '1',
    serviceType: 'Electrician',
    status: 'pending',
    location: {
      address: 'Parklands, Nairobi',
      latitude: -1.2931,
      longitude: 36.8229,
    },
    estimatedEarnings: 2000,
    distance: 3.2,
    estimatedTime: 20,
  },
  {
    id: '3',
    clientId: '3',
    providerId: '1',
    serviceType: 'Plumber',
    status: 'pending',
    location: {
      address: 'Kilimani, Nairobi',
      latitude: -1.2941,
      longitude: 36.8239,
    },
    estimatedEarnings: 1200,
    distance: 1.8,
    estimatedTime: 10,
  },
];

export default function AvailableJobsScreen({ navigation }: any) {
  const { user } = useAuth();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  
  // Generate profile image URI
  const profileImageUri = user?.profileImage || `https://i.pravatar.cc/150?img=${user?.id || '1'}`;

  const handleAcceptJob = (job: Job) => {
    // Navigate to job details first
    navigation.navigate('JobDetails', { job });
  };

  const renderJobCard = ({ item }: { item: Job }) => (
    <TouchableOpacity
      style={styles.jobCard}
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
        <View style={styles.earningsBadge}>
          <Text style={styles.earningsText}>KES {item.estimatedEarnings}</Text>
        </View>
      </View>

      <View style={styles.jobDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="time" size={16} color={Colors.textSecondary} />
          <Text style={styles.detailText}>{item.estimatedTime} min away</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="navigate" size={16} color={Colors.textSecondary} />
          <Text style={styles.detailText}>{item.distance} km</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.acceptButton}
        onPress={() => handleAcceptJob(item)}
      >
        <Text style={styles.acceptButtonText}>Accept Job</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <View style={styles.providerInfo}>
            <Image
              source={{ uri: profileImageUri }}
              style={styles.providerAvatar}
            />
            <View>
              <Text style={styles.headerTitle}>Available Jobs</Text>
              <Text style={styles.headerSubtitle}>{user?.name || 'Provider'}</Text>
            </View>
          </View>
        </View>
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

      {viewMode === 'map' ? (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: -1.2921,
              longitude: 36.8219,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            {mockAvailableJobs.map((job) => (
              <Marker
                key={job.id}
                coordinate={{
                  latitude: job.location.latitude,
                  longitude: job.location.longitude,
                }}
                title={job.serviceType}
                description={job.location.address}
              >
                <View style={styles.mapMarker}>
                  <Ionicons name="briefcase" size={20} color={Colors.white} />
                </View>
              </Marker>
            ))}
          </MapView>
          <View style={styles.mapOverlay}>
            <Text style={styles.mapOverlayText}>
              {mockAvailableJobs.length} jobs available
            </Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={mockAvailableJobs}
          renderItem={renderJobCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
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
  headerCenter: {
    flex: 1,
    marginHorizontal: Spacing.md,
  },
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  providerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: Spacing.sm,
    borderWidth: 2,
    borderColor: Colors.primary + '30',
  },
  headerTitle: {
    ...Typography.h3,
    marginBottom: 2,
  },
  headerSubtitle: {
    ...Typography.small,
    color: Colors.textSecondary,
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
  mapOverlay: {
    position: 'absolute',
    top: Spacing.lg,
    left: Spacing.lg,
    right: Spacing.lg,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  mapOverlayText: {
    ...Typography.body,
    fontWeight: '600',
    textAlign: 'center',
  },
  list: {
    padding: Spacing.lg,
  },
  jobCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
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
  earningsBadge: {
    backgroundColor: Colors.primary + '15',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 12,
  },
  earningsText: {
    ...Typography.body,
    color: Colors.primary,
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
  acceptButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: Spacing.md,
    alignItems: 'center',
  },
  acceptButtonText: {
    ...Typography.body,
    color: Colors.white,
    fontWeight: '600',
  },
});

