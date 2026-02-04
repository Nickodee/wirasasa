import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../../constants/Theme';
import { Job } from '../../types';

export default function JobDetailsScreen({ route, navigation }: any) {
  const { job }: { job?: Job } = route.params || {};

  if (!job) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Job Details</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Job not found</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Job Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.jobHeader}>
            <View style={styles.serviceIconContainer}>
              <Ionicons name="car" size={32} color={Colors.primary} />
            </View>
            <View style={styles.jobInfo}>
              <Text style={styles.serviceType}>{job?.serviceType || 'Service'}</Text>
              <Text style={styles.jobId}>#{job?.id || 'N/A'}</Text>
            </View>
          </View>

        <View style={styles.clientSection}>
          <Text style={styles.sectionLabel}>Client Information</Text>
          <View style={styles.clientInfo}>
            <View style={styles.clientAvatar}>
              <Image
                source={{ uri: `https://i.pravatar.cc/150?img=${job?.clientId || '1'}` }}
                style={styles.clientAvatarImage}
              />
            </View>
            <View style={styles.clientDetails}>
              <Text style={styles.clientName}>Alice Mwangi</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.rating}>4.8</Text>
              </View>
            </View>
          </View>
        </View>

          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: job?.location?.latitude || -1.2921,
                longitude: job?.location?.longitude || 36.8219,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{
                  latitude: job?.location?.latitude || -1.2921,
                  longitude: job?.location?.longitude || 36.8219,
                }}
                title={job?.location?.address || 'Location'}
              >
                <View style={styles.mapMarker}>
                  <Ionicons name="location" size={24} color={Colors.white} />
                </View>
              </Marker>
            </MapView>
          </View>

          <View style={styles.locationCard}>
            <Ionicons name="location" size={20} color={Colors.primary} />
            <View style={styles.locationInfo}>
              <Text style={styles.locationText}>{job?.location?.address || 'Address not available'}</Text>
              {job?.distance && (
                <Text style={styles.locationDetails}>
                  {job.distance} km away • {job?.estimatedTime || 0} min
                </Text>
              )}
            </View>
          </View>

          {job?.estimatedEarnings && (
            <View style={styles.earningsCard}>
              <View style={styles.earningsInfo}>
                <Text style={styles.earningsLabel}>Estimated Earnings</Text>
                <Text style={styles.earningsValue}>KES {job.estimatedEarnings}</Text>
              </View>
            </View>
          )}

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                // Open navigation app
                Alert.alert('Navigation', 'Opening navigation app...');
              }}
            >
              <Ionicons name="navigate" size={20} color={Colors.white} />
              <Text style={styles.actionButtonText}>Navigate</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.messageButton]}
              onPress={() => {
                if (job && navigation) {
                  try {
                    // Create a mock client/provider object for chat
                    const chatPartner = {
                      id: job.clientId || '1',
                      name: 'Alice Mwangi',
                      email: 'client@example.com',
                      profileImage: `https://i.pravatar.cc/150?img=${job.clientId || '1'}`,
                    };
                    navigation.navigate('Chat', { 
                      provider: chatPartner,
                      jobId: job.id,
                      userType: 'provider' 
                    });
                  } catch (error) {
                    console.error('Navigation error:', error);
                    Alert.alert('Error', 'Unable to open chat. Please try again.');
                  }
                }
              }}
            >
              <Ionicons name="chatbubble" size={20} color={Colors.white} />
              <Text style={styles.actionButtonText}>Message</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => {
              if (job) {
                navigation.navigate('JobInProgress', { job });
              }
            }}
          >
            <Text style={styles.acceptButtonText}>Accept Job</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  headerTitle: {
    ...Typography.h2,
  },
  scrollContent: {
    flex: 1,
    marginTop: 100,
  },
  content: {
    padding: Spacing.lg,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  errorText: {
    ...Typography.h3,
    color: Colors.textSecondary,
  },
  jobHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  serviceIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  jobInfo: {
    flex: 1,
  },
  serviceType: {
    ...Typography.h2,
    marginBottom: Spacing.xs,
  },
  jobId: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  clientSection: {
    marginBottom: Spacing.lg,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  sectionLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
    fontWeight: '600',
  },
  clientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clientAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: Colors.primary + '20',
  },
  clientAvatarImage: {
    width: '100%',
    height: '100%',
  },
  clientDetails: {
    flex: 1,
  },
  clientName: {
    ...Typography.h3,
    marginBottom: Spacing.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    ...Typography.caption,
    marginLeft: 4,
  },
  mapContainer: {
    height: 250,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.borderLight,
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
  locationCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  locationInfo: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  locationText: {
    ...Typography.body,
    marginBottom: Spacing.xs,
  },
  locationDetails: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  earningsCard: {
    backgroundColor: Colors.primary + '10',
    borderRadius: 16,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  earningsInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  earningsLabel: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  earningsValue: {
    ...Typography.h2,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: 12,
    gap: Spacing.xs,
  },
  messageButton: {
    backgroundColor: Colors.secondary,
  },
  actionButtonText: {
    ...Typography.body,
    color: Colors.white,
    fontWeight: '600',
  },
  acceptButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: Spacing.md,
    alignItems: 'center',
  },
  acceptButtonText: {
    ...Typography.h3,
    color: Colors.white,
  },
});

