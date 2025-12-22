import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../../constants/Theme';
import { ServiceProvider, Job } from '../../types';
import { useJobs } from '../../context/JobContext';

const routeCoordinates = [
  { latitude: -1.2921, longitude: 36.8219 },
  { latitude: -1.2931, longitude: 36.8229 },
  { latitude: -1.2941, longitude: 36.8239 },
];

export default function TrackingScreen({ route, navigation }: any) {
  const { provider, job }: { provider: ServiceProvider; job?: Job } = route.params || {};
  const { updateJobStatus } = useJobs();

  const handleCancelService = () => {
    if (!job) {
      Alert.alert('Error', 'Job information not available.');
      return;
    }

    Alert.alert(
      'Cancel Service',
      'Are you sure you want to cancel this service request? The provider will be notified.',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => {
            updateJobStatus(job.id, 'cancelled');
            Alert.alert(
              'Service Cancelled',
              'Your service request has been cancelled. You will be redirected.',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    navigation.navigate('HomeMain');
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -1.2921,
            longitude: 36.8219,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={routeCoordinates[0]}
            title="Your Location"
          >
            <View style={styles.destinationMarker} />
          </Marker>
          <Marker
            coordinate={routeCoordinates[routeCoordinates.length - 1]}
            title={provider.name}
          >
            <View style={styles.providerMarker}>
              <Image
                source={{ uri: provider.profileImage || 'https://via.placeholder.com/40' }}
                style={styles.providerAvatar}
              />
              <View style={styles.etaBadge}>
                <Text style={styles.etaText}>7 min</Text>
              </View>
            </View>
          </Marker>
          <Polyline
            coordinates={routeCoordinates}
            strokeColor={Colors.primary}
            strokeWidth={4}
            lineDashPattern={[5, 5]}
          />
        </MapView>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.providerInfo}>
          <Image
            source={{ uri: provider.profileImage || 'https://via.placeholder.com/60' }}
            style={styles.avatar}
          />
          <View style={styles.providerDetails}>
            <Text style={styles.providerName}>{provider.name}</Text>
            <Text style={styles.providerProfession}>{provider.profession}</Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>En Route</Text>
          </View>
        </View>

        <View style={styles.etaCard}>
          <Ionicons name="airplane" size={24} color={Colors.primary} />
          <View style={styles.etaInfo}>
            <Text style={styles.etaLabel}>Estimated Arrival</Text>
            <Text style={styles.etaValue}>7 minutes</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Chat', { provider })}
          >
            <Ionicons name="chatbubble-outline" size={20} color={Colors.text} />
            <Text style={styles.actionText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.callButton]}>
            <Ionicons name="call" size={20} color={Colors.white} />
            <Text style={[styles.actionText, styles.callText]}>Call</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancelService}
        >
          <Ionicons name="close-circle" size={20} color={Colors.error} />
          <Text style={styles.cancelButtonText}>Cancel Service</Text>
        </TouchableOpacity>

        <View style={styles.rateInfo}>
          <Text style={styles.rateLabel}>Hourly Rate</Text>
          <Text style={styles.rateValue}>KSh {provider.hourlyRate}/hr</Text>
        </View>
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
    position: 'absolute',
    top: 60,
    left: Spacing.lg,
    zIndex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  destinationMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.secondary,
    borderWidth: 3,
    borderColor: Colors.white,
  },
  providerMarker: {
    alignItems: 'center',
  },
  providerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: Colors.white,
  },
  etaBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 12,
    marginTop: 4,
  },
  etaText: {
    ...Typography.small,
    color: Colors.white,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: Spacing.lg,
    maxHeight: '40%',
  },
  providerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: Spacing.md,
  },
  providerDetails: {
    flex: 1,
  },
  providerName: {
    ...Typography.h3,
  },
  providerProfession: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  statusBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 16,
  },
  statusText: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '600',
  },
  etaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: Spacing.md,
    borderRadius: 12,
    marginBottom: Spacing.md,
  },
  etaInfo: {
    marginLeft: Spacing.md,
  },
  etaLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  etaValue: {
    ...Typography.h2,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  callButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  actionText: {
    ...Typography.body,
    marginLeft: Spacing.xs,
  },
  callText: {
    color: Colors.white,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.error,
    gap: Spacing.xs,
  },
  cancelButtonText: {
    ...Typography.body,
    color: Colors.error,
    fontWeight: '600',
  },
  rateInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rateLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  rateValue: {
    ...Typography.body,
    fontWeight: '600',
  },
});

