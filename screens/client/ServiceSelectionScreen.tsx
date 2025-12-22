import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { ProviderCard } from '../../components/ProviderCard';
import { Colors, Spacing, Typography } from '../../constants/Theme';
import { ServiceProvider } from '../../types';

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

export default function ServiceSelectionScreen({ route, navigation }: any) {
  const { service } = route.params;

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
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -1.2921,
            longitude: 36.8219,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {mockProviders.map((provider) => (
            <Marker
              key={provider.id}
              coordinate={provider.location!}
              title={provider.name}
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
          ))}
        </MapView>
      </View>

      <View style={styles.providersSheet}>
        <View style={styles.sheetHandle} />
        <Text style={styles.sheetTitle}>Available Professionals</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.providersList}
        >
          {mockProviders.map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              onPress={() =>
                navigation.navigate('ProviderProfile', { provider })
              }
            />
          ))}
        </ScrollView>
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
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: Spacing.lg,
    maxHeight: '40%',
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
});

