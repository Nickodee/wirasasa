import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/colors';
import { SERVICES } from '../../constants/services';
import ServiceCard from '../../components/client/ServiceCard';
import RoleToggle from '../../components/common/RoleToggle';
import useAuthStore from '../../store/useAuthStore';

const ClientHomeScreen = ({ navigation }) => {
  const { user } = useAuthStore();

  const handleServicePress = (service) => {
    navigation.navigate('ServiceMap', { service });
  };

  const renderServiceCard = ({ item }) => (
    <View style={{ width: '48%', paddingHorizontal: 4 }}>
      <ServiceCard service={item} onPress={handleServicePress} />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.gray[50] }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: COLORS.white,
          padding: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          shadowColor: COLORS.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          {/* User Avatar */}
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: COLORS.primary,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon name="person" size={24} color={COLORS.white} />
          </View>

          {/* Role Toggle */}
          <RoleToggle />
        </View>

        {/* Welcome Message */}
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: COLORS.gray[900],
          }}
        >
          Hi {user?.name || 'there'},
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: COLORS.gray[600],
            marginTop: 4,
          }}
        >
          What service do you need?
        </Text>
      </View>

      {/* Emergency Services Banner */}
      <View style={{ padding: 16 }}>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.error,
            borderRadius: 12,
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          activeOpacity={0.7}
        >
          <Icon name="warning" size={24} color={COLORS.white} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: COLORS.white,
              marginLeft: 12,
            }}
          >
            Emergency Services Available 24/7
          </Text>
        </TouchableOpacity>
      </View>

      {/* Services Grid */}
      <View style={{ flex: 1, padding: 12 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: COLORS.gray[900],
            marginBottom: 16,
            paddingHorizontal: 4,
          }}
        >
          Popular Services
        </Text>

        <FlatList
          data={SERVICES}
          renderItem={renderServiceCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ marginBottom: 8 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default ClientHomeScreen;
