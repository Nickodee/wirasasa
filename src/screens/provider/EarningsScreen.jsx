import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../../constants/colors';
import CustomButton from '../../components/common/CustomButton';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { getEarnings } from '../../api/payments.api';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const EarningsScreen = ({ navigation }) => {
  const [period, setPeriod] = useState('week'); // week, month, custom
  const [earnings, setEarnings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEarnings();
  }, [period]);

  const loadEarnings = async () => {
    try {
      const response = await getEarnings({ period });
      setEarnings(response || mockEarnings);
    } catch (error) {
      console.error('Error loading earnings:', error);
      setEarnings(mockEarnings);
    } finally {
      setLoading(false);
    }
  };

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
          Earnings
        </Text>

        {/* Period Selector */}
        <View style={{ flexDirection: 'row', gap: 12 }}>
          {['week', 'month', 'custom'].map((p) => (
            <TouchableOpacity
              key={p}
              onPress={() => setPeriod(p)}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 8,
                backgroundColor: period === p ? COLORS.primary : COLORS.gray[200],
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: period === p ? COLORS.white : COLORS.gray[700],
                  textTransform: 'capitalize',
                }}
              >
                {p === 'custom' ? 'Custom' : `This ${p}`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView style={{ flex: 1, padding: 16 }}>
        {/* Earnings Summary */}
        <View
          style={{
            backgroundColor: COLORS.primary,
            borderRadius: 16,
            padding: 24,
            marginBottom: 24,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: COLORS.white,
              marginBottom: 8,
              opacity: 0.9,
            }}
          >
            Total Earnings
          </Text>
          <Text
            style={{
              fontSize: 36,
              fontWeight: 'bold',
              color: COLORS.white,
              marginBottom: 16,
            }}
          >
            {formatCurrency(earnings?.total || 0)}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 16,
              borderTopWidth: 1,
              borderTopColor: 'rgba(255, 255, 255, 0.3)',
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.white,
                  opacity: 0.9,
                  marginBottom: 4,
                }}
              >
                Commission (10%)
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: COLORS.white,
                }}
              >
                {formatCurrency(earnings?.commission || 0)}
              </Text>
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.white,
                  opacity: 0.9,
                  marginBottom: 4,
                }}
              >
                Net Earnings
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: COLORS.white,
                }}
              >
                {formatCurrency(earnings?.net || 0)}
              </Text>
            </View>
          </View>
        </View>

        {/* Job-wise Breakdown */}
        <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: COLORS.gray[900],
              marginBottom: 16,
            }}
          >
            Job Breakdown
          </Text>

          {/* Table Header */}
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 8,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.gray[200],
            }}
          >
            <Text
              style={{
                flex: 2,
                fontSize: 12,
                fontWeight: '600',
                color: COLORS.gray[600],
              }}
            >
              Date / Client
            </Text>
            <Text
              style={{
                flex: 1,
                fontSize: 12,
                fontWeight: '600',
                color: COLORS.gray[600],
                textAlign: 'right',
              }}
            >
              Amount
            </Text>
            <Text
              style={{
                flex: 1,
                fontSize: 12,
                fontWeight: '600',
                color: COLORS.gray[600],
                textAlign: 'right',
              }}
            >
              Net
            </Text>
          </View>

          {/* Table Rows */}
          {earnings?.jobs?.map((job, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: COLORS.gray[100],
              }}
            >
              <View style={{ flex: 2 }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: COLORS.gray[900],
                    marginBottom: 2,
                  }}
                >
                  {formatDate(job.date)}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: COLORS.gray[600],
                  }}
                >
                  {job.clientName} • {job.service}
                </Text>
              </View>
              <Text
                style={{
                  flex: 1,
                  fontSize: 14,
                  color: COLORS.gray[900],
                  textAlign: 'right',
                }}
              >
                {formatCurrency(job.amount)}
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontSize: 14,
                  fontWeight: '600',
                  color: COLORS.primary,
                  textAlign: 'right',
                }}
              >
                {formatCurrency(job.net)}
              </Text>
            </View>
          ))}
        </View>

        {/* Request Payout Button */}
        <CustomButton
          title="Request Payout"
          onPress={() => {}}
          style={{ marginBottom: 24 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

// Mock data for demo
const mockEarnings = {
  total: 28000,
  commission: 2800,
  net: 25200,
  jobs: [
    {
      date: new Date(),
      clientName: 'Alice Johnson',
      service: 'Electrician',
      amount: 3500,
      net: 3150,
    },
    {
      date: new Date(),
      clientName: 'Bob Williams',
      service: 'Plumber',
      amount: 2800,
      net: 2520,
    },
  ],
};

export default EarningsScreen;
