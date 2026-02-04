import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  PanResponder,
  Dimensions,
  Linking,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker, Polyline, Region } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { ProviderCard } from '../../components/ProviderCard';
import { Colors, Spacing, Typography } from '../../constants/Theme';
import { ServiceProvider } from '../../types';
import { useLocation } from '../../hooks/useLocation';
import LocationService from '../../services/LocationService';

const mockProviders: ServiceProvider[] = [
  {
    id: '1',
    name: 'Samuel Njoroge',
    profession: 'Mechanic',
    rating: 4.7,
    jobsCompleted: 189,
    hourlyRate: 900,
    eta: 20,
    location: { latitude: -1.2921, longitude: 36.8219 },
    profileImage: 'https://i.pravatar.cc/150?img=12',
    verified: true,
  },
  {
    id: '2',
    name: 'Joseph Kipchoge',
    profession: 'Mechanic',
    rating: 4.6,
    jobsCompleted: 156,
    hourlyRate: 850,
    eta: 25,
    location: { latitude: -1.2931, longitude: 36.8229 },
    profileImage: 'https://i.pravatar.cc/150?img=33',
    verified: true,
  },
  {
    id: '3',
    name: 'Peter Kamau',
    profession: 'Electrician',
    rating: 4.8,
    jobsCompleted: 203,
    hourlyRate: 950,
    eta: 15,
    location: { latitude: -1.2911, longitude: 36.8209 },
    profileImage: 'https://i.pravatar.cc/150?img=45',
    verified: true,
  },
  {
    id: '4',
    name: 'James Ochieng',
    profession: 'Plumber',
    rating: 4.5,
    jobsCompleted: 142,
    hourlyRate: 800,
    eta: 30,
    location: { latitude: -1.2941, longitude: 36.8239 },
    profileImage: 'https://i.pravatar.cc/150?img=51',
    verified: false,
  },
  {
    id: '5',
    name: 'David Mwangi',
    profession: 'Carpenter',
    rating: 4.9,
    jobsCompleted: 178,
    hourlyRate: 1000,
    eta: 18,
    location: { latitude: -1.2901, longitude: 36.8199 },
    profileImage: 'https://i.pravatar.cc/150?img=68',
    verified: true,
  },
];

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const SHEET_MIN_HEIGHT = 180;
const SHEET_MAX_HEIGHT = SCREEN_HEIGHT * 0.75;

const DEFAULT_LOCATION = {
  latitude: -1.2935,
  longitude: 36.8225,
};

const SEARCH_RADIUS_KM = 5;

const toRad = (value: number) => (value * Math.PI) / 180;

const calculateDistanceKm = (
  a: { latitude: number; longitude: number },
  b: { latitude: number; longitude: number }
) => {
  const R = 6371; // Radius of Earth in km
  const dLat = toRad(b.latitude - a.latitude);
  const dLon = toRad(b.longitude - a.longitude);
  const lat1 = toRad(a.latitude);
  const lat2 = toRad(b.latitude);

  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);

  const h =
    sinDLat * sinDLat +
    Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon;

  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  return R * c;
};

export default function ServiceSelectionScreen({ route, navigation }: any) {
  const { service } = route.params;
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [nearbyProviders, setNearbyProviders] = useState<ServiceProvider[]>([]);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number }>(DEFAULT_LOCATION);
  const [mapRegion, setMapRegion] = useState<Region>({
    latitude: DEFAULT_LOCATION.latitude,
    longitude: DEFAULT_LOCATION.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [loading, setLoading] = useState(true);

  const { location, getCurrentLocation, loading: locationLoading } = useLocation();

  const sheetHeight = useRef(new Animated.Value(SHEET_MIN_HEIGHT)).current;

  // Get user location and search for nearby providers
  useEffect(() => {
    loadUserLocationAndProviders();
  }, []);

  // Update user location when location changes
  useEffect(() => {
    if (location?.coordinates) {
      const coords = location.coordinates;
      setUserLocation(coords);
      
      // Update map region to center on user location
      setMapRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  }, [location]);

  const loadUserLocationAndProviders = async () => {
    try {
      setLoading(true);
      
      // Get user's current location directly from LocationService
      const currentLocationData = await LocationService.getCurrentLocation();
      
      if (currentLocationData?.coordinates) {
        const coords = currentLocationData.coordinates;
        setUserLocation(coords);
        setMapRegion({
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
        await searchNearbyProviders(coords);
      } else {
        // Fallback to default location and filter mock providers
        setUserLocation(DEFAULT_LOCATION);
        setMapRegion({
          latitude: DEFAULT_LOCATION.latitude,
          longitude: DEFAULT_LOCATION.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
        filterProvidersByDistance(DEFAULT_LOCATION);
      }
    } catch (error) {
      console.error('Error loading location and providers:', error);
      // Fallback to default location
      setUserLocation(DEFAULT_LOCATION);
      setMapRegion({
        latitude: DEFAULT_LOCATION.latitude,
        longitude: DEFAULT_LOCATION.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
      filterProvidersByDistance(DEFAULT_LOCATION);
    } finally {
      setLoading(false);
    }
  };

  const searchNearbyProviders = async (userCoords: { latitude: number; longitude: number }) => {
    try {
      // Try to fetch from API first
      const apiProviders = await LocationService.findNearbyProviders(
        userCoords,
        service,
        SEARCH_RADIUS_KM
      );

      if (apiProviders && apiProviders.length > 0) {
        // Transform API providers to match ServiceProvider type
        const transformedProviders: ServiceProvider[] = apiProviders.map((p: any) => ({
          id: p.id?.toString() || Math.random().toString(),
          name: p.name || 'Provider',
          profession: p.profession || service,
          rating: p.rating || 4.5,
          jobsCompleted: p.jobsCompleted || 0,
          hourlyRate: p.hourlyRate || 800,
          eta: p.eta || 20,
          location: p.location ? {
            latitude: p.location.latitude || p.latitude,
            longitude: p.location.longitude || p.longitude,
          } : undefined,
          profileImage: p.profileImage,
          verified: p.verified || false,
        }));
        setNearbyProviders(transformedProviders);
        return;
      }
    } catch (error) {
      // API not available or network error - this is expected in development
      // Silently fall back to mock providers
    }
    
    // Fallback to filtering mock providers by distance
    filterProvidersByDistance(userCoords);
  };

  const filterProvidersByDistance = (userCoords: { latitude: number; longitude: number }) => {
    // Filter mock providers to only show those within 5km
    // If no providers found within 5km, show all mock providers (for development)
    const filtered = mockProviders.filter((provider) => {
      if (!provider.location) return false;
      const distance = calculateDistanceKm(userCoords, provider.location);
      return distance <= SEARCH_RADIUS_KM;
    });
    
    // If no providers within 5km, show all mock providers (useful for development/testing)
    if (filtered.length === 0) {
      console.log('No providers within 5km, showing all mock providers for development');
      setNearbyProviders(mockProviders);
    } else {
      setNearbyProviders(filtered);
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > 5,
      onPanResponderMove: (_, gestureState) => {
        const newHeight = Math.max(
          SHEET_MIN_HEIGHT,
          Math.min(SHEET_MAX_HEIGHT, SHEET_MIN_HEIGHT - gestureState.dy),
        );
        sheetHeight.setValue(newHeight);
      },
      onPanResponderRelease: (_, gestureState) => {
        const shouldExpand = gestureState.dy < 0;
        Animated.timing(sheetHeight, {
          toValue: shouldExpand ? SHEET_MAX_HEIGHT : SHEET_MIN_HEIGHT,
          duration: 350,
          useNativeDriver: false,
        }).start();
        setIsExpanded(shouldExpand);
      },
    })
  ).current;

  const handleCall = () => {
    Linking.openURL('tel:+254700000000');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{service}s Near You</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.mapContainer}>
        {loading || locationLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loadingText}>Finding your location...</Text>
          </View>
        ) : (
          <MapView
            style={styles.map}
            region={mapRegion}
            onRegionChangeComplete={setMapRegion}
            showsUserLocation={true}
            showsMyLocationButton={true}
          >
            <Marker coordinate={userLocation} title="You">
              <View style={styles.userMarker}>
                <Ionicons name="person" size={18} color={Colors.white} />
              </View>
            </Marker>

            {selectedProvider ? (
              <>
                <Marker
                  key={selectedProvider.id}
                  coordinate={selectedProvider.location!}
                  title={selectedProvider.name}
                >
                  <View style={styles.markerContainer}>
                    <Image
                      source={{ uri: selectedProvider.profileImage || 'https://via.placeholder.com/50' }}
                      style={styles.markerAvatar}
                    />
                    <View style={styles.markerBadge}>
                      <Text style={styles.markerBadgeText}>{selectedProvider.rating}</Text>
                    </View>
                  </View>
                </Marker>
                <Polyline
                  coordinates={[userLocation, selectedProvider.location!]}
                  strokeColor={Colors.primary}
                  strokeWidth={4}
                />
              </>
            ) : (
              nearbyProviders.map((provider) => (
                <Marker
                  key={provider.id}
                  coordinate={provider.location!}
                  title={provider.name}
                  onPress={() => setSelectedProvider(provider)}
                >
                  <View style={styles.markerContainer}>
                    <Image
                      source={{ uri: provider.profileImage || 'https://via.placeholder.com/50' }}
                      style={styles.markerAvatar}
                    />
                    <View style={styles.markerBadge}>
                      <Text style={styles.markerBadgeText}>{provider.rating}</Text>
                    </View>
                  </View>
                </Marker>
              ))
            )}
          </MapView>
        )}
      </View>

      {selectedProvider && (
        <View style={styles.providerDetailsBottom}>
          <View style={styles.selectedHeaderRow}>
            <View style={styles.selectedInfo}>
              <Image
                source={{ uri: selectedProvider.profileImage || 'https://via.placeholder.com/50' }}
                style={styles.selectedAvatar}
              />
              <View style={styles.selectedTextBlock}>
                <Text style={styles.selectedName}>{selectedProvider.name}</Text>
                <Text style={styles.selectedProfession}>{selectedProvider.profession}</Text>
              </View>
            </View>
            <View style={styles.statusPill}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>En route</Text>
            </View>
          </View>

          <View style={styles.arrivalRow}>
            <View style={styles.arrivalLeft}>
              <Ionicons name="time" size={18} color={Colors.textSecondary} />
              <View style={styles.arrivalTextBlock}>
                <Text style={styles.arrivalLabel}>Estimated arrival</Text>
                <Text style={styles.arrivalValue}>
                  {selectedProvider.eta} min •{' '}
                  {selectedProvider.location
                    ? `${calculateDistanceKm(
                        userLocation,
                        selectedProvider.location
                      ).toFixed(1)} km away`
                    : ''}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.selectedActionsRow}>
            <TouchableOpacity
              style={styles.primaryActionButton}
              onPress={() => navigation.navigate('Chat', { provider: selectedProvider })}
            >
              <Ionicons name="chatbubble-ellipses" size={18} color={Colors.white} />
              <Text style={styles.primaryActionText}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryActionButton}
              onPress={handleCall}
            >
              <Ionicons name="call" size={18} color={Colors.primary} />
              <Text style={styles.secondaryActionText}>Call</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      {!selectedProvider && (
        <Animated.View
          style={[styles.providersSheet, { height: sheetHeight }]}
          {...panResponder.panHandlers}
        >
          <View style={styles.sheetHandle} />
          <Text style={styles.sheetTitle}>Available Professionals</Text>
          {isExpanded ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.providersListExpanded}
              contentContainerStyle={styles.providersListExpandedContent}
            >
              {mockProviders.map((provider) => (
                <View key={provider.id} style={styles.providerRow}>
                  <ProviderCard
                    provider={provider}
                    onPress={() => setSelectedProvider(provider)}
                  />
                </View>
              ))}
            </ScrollView>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.providersList}
              contentContainerStyle={styles.providersListContent}
            >
              {mockProviders.map((provider) => (
                <View key={provider.id} style={styles.providerCardCompact}>
                  <ProviderCard
                    provider={provider}
                    onPress={() => setSelectedProvider(provider)}
                  />
                </View>
              ))}
            </ScrollView>
          )}
        </Animated.View>
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
  },
  headerTitle: {
    ...Typography.h3,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  markerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: Colors.white,
  },
  markerBadge: {
    position: 'absolute',
    bottom: -4,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 30,
    alignItems: 'center',
  },
  markerBadgeText: {
    ...Typography.small,
    color: Colors.white,
    fontWeight: '600',
    fontSize: 10,
  },
  providersSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: Spacing.lg,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: Spacing.md,
  },
  sheetTitle: {
    ...Typography.h3,
    marginBottom: Spacing.md,
  },
  providersList: {
    flexDirection: 'row',
  },
  providersListContent: {
    paddingRight: Spacing.md,
  },
  providersListExpanded: {
    marginTop: Spacing.sm,
  },
  providerRow: {
    marginBottom: Spacing.sm,
    width: '100%',
  },
  providersListExpandedContent: {
    paddingBottom: 80,
  },
  providerCardCompact: {
    width: 220,
    marginRight: Spacing.md,
  },
  providerDetailsBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: SCREEN_HEIGHT * 0.4,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    flexDirection: 'column',
    alignItems: 'stretch',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  userMarker: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  selectedInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: Spacing.sm,
  },
  selectedHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  selectedTextBlock: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  selectedName: {
    ...Typography.body,
    fontWeight: '700',
  },
  selectedProfession: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: Colors.primary + '15',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginRight: Spacing.xs,
  },
  statusText: {
    ...Typography.small,
    color: Colors.primary,
    fontWeight: '600',
  },
  arrivalRow: {
    marginBottom: Spacing.lg,
  },
  arrivalLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrivalTextBlock: {
    marginLeft: Spacing.sm,
  },
  arrivalLabel: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  arrivalValue: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: '600',
    marginTop: 2,
  },
  selectedActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  primaryActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.sm,
    borderRadius: 999,
    gap: Spacing.xs,
  },
  primaryActionText: {
    ...Typography.body,
    color: Colors.white,
    fontWeight: '600',
  },
  secondaryActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    paddingVertical: Spacing.sm,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    gap: Spacing.xs,
  },
  secondaryActionText: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '600',
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  loadingText: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: Spacing.md,
  },
  noProvidersContainer: {
    padding: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noProvidersText: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});

