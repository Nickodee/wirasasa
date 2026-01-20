import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/colors';
import MapViewComponent from '../../components/client/MapView';
import CustomButton from '../../components/common/CustomButton';
import { formatDistance } from '../../utils/formatters';

const ProviderTrackingScreen = ({ route, navigation }) => {
  const { provider, service } = route.params;
  const [status, setStatus] = useState('on_the_way'); // on_the_way, arrived, in_progress
  const [region, setRegion] = useState({
    latitude: -1.286389,
    longitude: 36.817223,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const statusMessages = {
    on_the_way: 'Provider is on the way',
    arrived: 'Provider has arrived',
    in_progress: 'Job in progress',
  };

  const handleOpenChat = () => {
    navigation.navigate('Chat', { provider, service });
  };

  const handleCancel = () => {
    navigation.navigate('ClientHome');
  };

  const markers = [
    {
      latitude: -1.286389,
      longitude: 36.817223,
      title: 'Your Location',
    },
    {
      latitude: -1.288389,
      longitude: 36.819223,
      title: provider.name,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* Map */}
      <MapViewComponent
        region={region}
        markers={markers}
        showsUserLocation={true}
      />

      {/* Provider Info Card */}
      <View
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          right: 20,
          backgroundColor: COLORS.white,
          borderRadius: 16,
          padding: 16,
          shadowColor: COLORS.black,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: COLORS.gray[300],
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 12,
            }}
          >
            <Icon name="person" size={32} color={COLORS.gray[600]} />
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: COLORS.gray[900],
              }}
            >
              {provider.name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: COLORS.gray[600],
                marginTop: 2,
              }}
            >
              {statusMessages[status]}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: COLORS.primary,
                fontWeight: '600',
                marginTop: 2,
              }}
            >
              ETA: 15 mins • {formatDistance(provider.distance * 1000)}
            </Text>
          </View>

          <TouchableOpacity
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: COLORS.primary,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon name="call" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Actions */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: COLORS.white,
          padding: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: COLORS.black,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <CustomButton
            title="Message"
            variant="secondary"
            onPress={handleOpenChat}
            style={{ flex: 1 }}
            icon={<Icon name="chatbubble-outline" size={20} color={COLORS.primary} />}
          />
          
          <CustomButton
            title="Cancel"
            variant="secondary"
            onPress={handleCancel}
            style={{ flex: 1 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProviderTrackingScreen;
