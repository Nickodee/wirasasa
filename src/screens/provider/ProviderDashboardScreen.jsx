import React, { useState, useEffect } from 'react';
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
import OnlineToggle from '../../components/provider/OnlineToggle';
import EarningsCard from '../../components/provider/EarningsCard';
import RoleToggle from '../../components/common/RoleToggle';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { getDashboardData } from '../../api/payments.api';

const ProviderDashboardScreen = ({ navigation }) => {
  const [isOnline, setIsOnline] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const data = await getDashboardData();
      setDashboardData(data || mockDashboardData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setDashboardData(mockDashboardData);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleOnline = async (value) => {
    setIsOnline(value);
    // In a real app, you would update the backend here
  };

  const renderRecentJob = ({ item }) => (
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
      onPress={() => navigation.navigate('JobDetails', { job: item })}
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
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: COLORS.primary,
          }}
        >
          {formatCurrency(item.amount)}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
        <Icon name="person" size={14} color={COLORS.gray[600]} />
        <Text
          style={{
            fontSize: 14,
            color: COLORS.gray[700],
            marginLeft: 8,
          }}
        >
          {item.clientName}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name="calendar" size={14} color={COLORS.gray[600]} />
        <Text
          style={{
            fontSize: 14,
            color: COLORS.gray[600],
            marginLeft: 8,
          }}
        >
          {formatDate(item.date)}
        </Text>
      </View>
    </TouchableOpacity>
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
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: COLORS.gray[900],
            }}
          >
            Dashboard
          </Text>

          <RoleToggle />
        </View>

        <OnlineToggle isOnline={isOnline} onToggle={handleToggleOnline} />
      </View>

      <ScrollView style={{ flex: 1, padding: 16 }}>
        {/* Earnings Summary */}
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: COLORS.gray[900],
            marginBottom: 16,
          }}
        >
          Earnings Summary
        </Text>

        <EarningsCard
          title="Today's Earnings"
          amount={dashboardData?.todayEarnings || 0}
          icon="today"
        />
        
        <EarningsCard
          title="This Week"
          amount={dashboardData?.weekEarnings || 0}
          icon="calendar"
          trend={12}
        />
        
        <EarningsCard
          title="This Month"
          amount={dashboardData?.monthEarnings || 0}
          icon="bar-chart"
          trend={8}
        />

        {/* Stats */}
        <View
          style={{
            flexDirection: 'row',
            gap: 12,
            marginBottom: 24,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.white,
              borderRadius: 12,
              padding: 16,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 32,
                fontWeight: 'bold',
                color: COLORS.primary,
              }}
            >
              {dashboardData?.jobsToday || 0}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: COLORS.gray[600],
                marginTop: 4,
              }}
            >
              Jobs Today
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.white,
              borderRadius: 12,
              padding: 16,
              alignItems: 'center',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 32,
                  fontWeight: 'bold',
                  color: COLORS.primary,
                }}
              >
                {dashboardData?.rating || 4.8}
              </Text>
              <Icon name="star" size={24} color="#f59e0b" style={{ marginLeft: 4 }} />
            </View>
            <Text
              style={{
                fontSize: 14,
                color: COLORS.gray[600],
                marginTop: 4,
              }}
            >
              Rating
            </Text>
          </View>
        </View>

        {/* Recent Jobs */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: COLORS.gray[900],
            }}
          >
            Recent Jobs
          </Text>
          
          <TouchableOpacity onPress={() => navigation.navigate('Jobs')}>
            <Text
              style={{
                fontSize: 14,
                color: COLORS.primary,
                fontWeight: '600',
              }}
            >
              View All
            </Text>
          </TouchableOpacity>
        </View>

        {dashboardData?.recentJobs?.map((job) => (
          <View key={job.id}>
            {renderRecentJob({ item: job })}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// Mock data for demo
const mockDashboardData = {
  todayEarnings: 5600,
  weekEarnings: 28000,
  monthEarnings: 124000,
  jobsToday: 3,
  rating: 4.8,
  recentJobs: [
    {
      id: 1,
      serviceType: 'Electrician',
      clientName: 'Alice Johnson',
      date: new Date(),
      amount: 3500,
    },
    {
      id: 2,
      serviceType: 'Plumber',
      clientName: 'Bob Williams',
      date: new Date(),
      amount: 2100,
    },
  ],
};

export default ProviderDashboardScreen;
