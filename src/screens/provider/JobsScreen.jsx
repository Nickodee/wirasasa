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

const JobsScreen = ({ navigation }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, completed, cancelled

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const response = await getJobHistory('provider');
      setJobs(response.jobs || mockJobs);
    } catch (error) {
      console.error('Error loading jobs:', error);
      setJobs(mockJobs);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    if (filter === 'all') return true;
    return job.status === filter;
  });

  const renderJob = ({ item }) => (
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
        
        <View
          style={{
            backgroundColor:
              item.status === 'completed' ? '#dcfce7' : '#fee2e2',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 6,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: '600',
              color: item.status === 'completed' ? COLORS.success : COLORS.error,
              textTransform: 'uppercase',
            }}
          >
            {item.status}
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
          {item.clientName}
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
            fontWeight: '600',
            color: COLORS.primary,
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
          Job History
        </Text>

        {/* Filter Tabs */}
        <View style={{ flexDirection: 'row', gap: 12 }}>
          {['all', 'completed', 'cancelled'].map((tab) => (
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

      {/* Jobs List */}
      <FlatList
        data={filteredJobs}
        renderItem={renderJob}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 48 }}>
            <Icon name="briefcase-outline" size={64} color={COLORS.gray[400]} />
            <Text
              style={{
                fontSize: 18,
                color: COLORS.gray[600],
                marginTop: 16,
              }}
            >
              No jobs found
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

// Mock data for demo
const mockJobs = [
  {
    id: 1,
    serviceType: 'Electrician',
    clientName: 'Alice Johnson',
    date: new Date(),
    amount: 3500,
    status: 'completed',
  },
  {
    id: 2,
    serviceType: 'Plumber',
    clientName: 'Bob Williams',
    date: new Date(),
    amount: 2800,
    status: 'completed',
  },
];

export default JobsScreen;
