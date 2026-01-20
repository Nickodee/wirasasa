import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/colors';
import { formatCurrency, formatDistance } from '../../utils/formatters';

const JobPingOverlay = ({ visible, job, onAccept, onDecline }) => {
  const [countdown, setCountdown] = useState(20);
  const [progress] = useState(new Animated.Value(1));

  useEffect(() => {
    if (visible) {
      setCountdown(20);
      
      // Start countdown
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            onDecline(); // Auto-decline after timeout
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Animate progress ring
      Animated.timing(progress, {
        toValue: 0,
        duration: 20000,
        useNativeDriver: false,
      }).start();

      return () => {
        clearInterval(interval);
        progress.setValue(1);
      };
    }
  }, [visible]);

  if (!visible || !job) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onDecline}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
        {/* Content Container */}
        <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 20,
            padding: 24,
            width: '100%',
            maxWidth: 400,
            alignItems: 'center',
          }}
        >
          {/* Title */}
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: COLORS.gray[900],
              marginBottom: 8,
              textAlign: 'center',
            }}
          >
            New Job Request!
          </Text>

          {/* Countdown Timer */}
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              borderWidth: 4,
              borderColor: COLORS.primary,
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 20,
            }}
          >
            <Text
              style={{
                fontSize: 32,
                fontWeight: 'bold',
                color: COLORS.primary,
              }}
            >
              {countdown}
            </Text>
          </View>

          {/* Job Details */}
          <View style={{ width: '100%', marginBottom: 24 }}>
            <InfoRow
              icon="person"
              label="Client"
              value={job.clientName}
            />
            <InfoRow
              icon="star"
              label="Rating"
              value={`${job.clientRating} ⭐`}
            />
            <InfoRow
              icon="construct"
              label="Service"
              value={job.serviceType}
            />
            <InfoRow
              icon="location"
              label="Distance"
              value={formatDistance(job.distance * 1000)}
            />
            <InfoRow
              icon="cash"
              label="Est. Earnings"
              value={formatCurrency(job.estimatedEarnings)}
            />
          </View>

          {/* Action Buttons */}
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              gap: 12,
            }}
          >
            <TouchableOpacity
              onPress={onDecline}
              style={{
                flex: 1,
                backgroundColor: COLORS.gray[300],
                paddingVertical: 16,
                borderRadius: 12,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: COLORS.gray[700],
                }}
              >
                Decline
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onAccept}
              style={{
                flex: 1,
                backgroundColor: COLORS.primary,
                paddingVertical: 16,
                borderRadius: 12,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: COLORS.white,
                }}
              >
                Accept Job
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    }}
  >
    <Icon name={icon} size={20} color={COLORS.gray[600]} />
    <Text
      style={{
        fontSize: 14,
        color: COLORS.gray[600],
        marginLeft: 8,
        flex: 1,
      }}
    >
      {label}:
    </Text>
    <Text
      style={{
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.gray[900],
      }}
    >
      {value}
    </Text>
  </View>
);

export default JobPingOverlay;
