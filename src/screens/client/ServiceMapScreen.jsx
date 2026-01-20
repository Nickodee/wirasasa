import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/colors';
import MapViewComponent from '../../components/client/MapView';
import ProviderCard from '../../components/client/ProviderCard';
import CustomButton from '../../components/common/CustomButton';
import { getCurrentLocation } from '../../utils/geolocation';
import { getNearbyProviders } from '../../api/jobs.api';

const ServiceMapScreen = ({ route, navigation }) => {
  const { service } = route.params;
  const [region, setRegion] = useState(null);
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showListView, setShowListView] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNearbyProviders();
  }, []);

  const loadNearbyProviders = async () => {
    try {
      const location = await getCurrentLocation();
      
      setRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });

      // Fetch nearby providers
      const response = await getNearbyProviders({
        lat: location.latitude,
        lng: location.longitude,
        service: service.name,
        radius: 5,
      });

      setProviders(response.providers || mockProviders);
    } catch (error) {
      console.error('Error loading providers:', error);
      // Use mock data for demo
      const location = await getCurrentLocation();
      setRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
      setProviders(mockProviders);
    } finally {
      setLoading(false);
    }
  };

  const handleProviderPress = (provider) => {
    setSelectedProvider(provider);
  };

  const handleRequestService = () => {
    navigation.navigate('ProviderTracking', {
      provider: selectedProvider,
      service,
    });
  };

  const markers = providers.map((provider) => ({
    latitude: provider.latitude,
    longitude: provider.longitude,
    title: provider.name,
    description: `${provider.rating} ⭐ • ${provider.distance} km`,
    provider,
  }));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* Header */}
      <View
        style={{
          padding: 16,
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: COLORS.gray[200],
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={COLORS.gray[900]} />
        </TouchableOpacity>
        
        <Text
          style={{
            flex: 1,
            fontSize: 18,
            fontWeight: '600',
            color: COLORS.gray[900],
            marginLeft: 16,
          }}
        >
          {service.name}s Near You
        </Text>

        <TouchableOpacity onPress={() => setShowListView(!showListView)}>
          <Icon
            name={showListView ? 'map' : 'list'}
            size={24}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>

      {/* Map or List View */}
      {!showListView && region ? (
        <MapViewComponent
          region={region}
          markers={markers}
          onMarkerPress={(marker) => handleProviderPress(marker.provider)}
        />
      ) : (
        <FlatList
          data={providers}
          renderItem={({ item }) => (
            <ProviderCard provider={item} onPress={handleProviderPress} />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 16 }}
        />
      )}

      {/* Provider Details Modal */}
      <Modal
        visible={!!selectedProvider}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedProvider(null)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'flex-end',
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.white,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
            }}
          >
            {selectedProvider && (
              <>
                <ProviderCard
                  provider={selectedProvider}
                  onPress={() => {}}
                />
                
                <CustomButton
                  title="Request Service"
                  onPress={handleRequestService}
                  style={{ marginTop: 16 }}
                />
                
                <CustomButton
                  title="Cancel"
                  variant="secondary"
                  onPress={() => setSelectedProvider(null)}
                  style={{ marginTop: 12 }}
                />
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// Mock data for demo
const mockProviders = [
  {
    id: 1,
    name: 'John Doe',
    rating: 4.8,
    reviewCount: 124,
    experience: 5,
    hourlyRate: 500,
    dailyRate: 3000,
    distance: 1.2,
    latitude: -1.286389,
    longitude: 36.817223,
    hasCertificates: true,
    hasGoodConduct: true,
  },
  {
    id: 2,
    name: 'Jane Smith',
    rating: 4.6,
    reviewCount: 89,
    experience: 3,
    hourlyRate: 450,
    dailyRate: 2800,
    distance: 2.5,
    latitude: -1.290389,
    longitude: 36.820223,
    hasCertificates: true,
    hasGoodConduct: false,
  },
];

export default ServiceMapScreen;
