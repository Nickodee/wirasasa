import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/colors';
import { formatCurrency, formatDate } from '../../utils/formatters';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { getJobHistory } from '../../api/jobs.api';

const MyBookingsScreen = ({ navigation }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, active, completed

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const response = await getJobHistory('client');
      setBookings(response.jobs || mockBookings);
    } catch (error) {
      console.error('Error loading bookings:', error);
      setBookings(mockBookings);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'all') return true;
    if (filter === 'active') return booking.status !== 'completed';
    if (filter === 'completed') return booking.status === 'completed';
    return true;
  });

  const renderBooking = ({ item }) => (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
      onPress={() => navigation.navigate('BookingDetails', { booking: item })}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: COLORS.gray[900],
          }}
        >
          {item.serviceType}
        </Text>
        
        <View
          style={{
            backgroundColor:
              item.status === 'completed'
                ? '#dcfce7'
                : item.status === 'in_progress'
                ? '#fef3c7'
                : '#e0e7ff',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 6,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              color:
                item.status === 'completed'
                  ? COLORS.success
                  : item.status === 'in_progress'
                  ? COLORS.warning
                  : COLORS.accentBlue,
            }}
          >
            {item.status.replace('_', ' ').toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
        <Icon name="person" size={16} color={COLORS.gray[600]} />
        <Text
          style={{
            fontSize: 14,
            color: COLORS.gray[700],
            marginLeft: 8,
          }}
        >
          {item.providerName}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
        <Icon name="calendar" size={16} color={COLORS.gray[600]} />
        <Text
          style={{
            fontSize: 14,
            color: COLORS.gray[700],
            marginLeft: 8,
          }}
        >
          {formatDate(item.date)}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name="cash" size={16} color={COLORS.gray[600]} />
        <Text
          style={{
            fontSize: 14,
            color: COLORS.gray[700],
            marginLeft: 8,
          }}
        >
          {formatCurrency(item.amount)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.gray[50] }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: COLORS.white,
          padding: 20,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.gray[200],
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: COLORS.gray[900],
            marginBottom: 16,
          }}
        >
          My Bookings
        </Text>

        {/* Filter Tabs */}
        <View style={{ flexDirection: 'row', gap: 12 }}>
          {['all', 'active', 'completed'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setFilter(tab)}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 8,
                backgroundColor:
                  filter === tab ? COLORS.primary : COLORS.gray[200],
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: filter === tab ? COLORS.white : COLORS.gray[700],
                  textTransform: 'capitalize',
                }}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Bookings List */}
      <FlatList
        data={filteredBookings}
        renderItem={renderBooking}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 48 }}>
            <Icon name="calendar-outline" size={64} color={COLORS.gray[400]} />
            <Text
              style={{
                fontSize: 18,
                color: COLORS.gray[600],
                marginTop: 16,
              }}
            >
              No bookings found
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

// Mock data for demo
const mockBookings = [
  {
    id: 1,
    serviceType: 'Electrician',
    providerName: 'John Doe',
    date: new Date(),
    amount: 3500,
    status: 'completed',
  },
  {
    id: 2,
    serviceType: 'Plumber',
    providerName: 'Jane Smith',
    date: new Date(),
    amount: 2800,
    status: 'in_progress',
  },
];

export default MyBookingsScreen;
