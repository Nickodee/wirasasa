import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { Colors, Spacing, Typography } from '../../constants/Theme';
import { WeeklyEarnings } from '../../types';

const weeklyEarnings: WeeklyEarnings[] = [
  { day: 'Mon', amount: 3500 },
  { day: 'Tue', amount: 2000 },
  { day: 'Wed', amount: 5500 },
  { day: 'Thu', amount: 4000 },
  { day: 'Fri', amount: 4800 },
  { day: 'Sat', amount: 3800 },
  { day: 'Sun', amount: 900 },
];

const maxEarnings = Math.max(...weeklyEarnings.map((e) => e.amount));

export default function DashboardScreen({ navigation }: any) {
  // Navigation is available but might be undefined if accessed directly
  const nav = navigation || { navigate: () => {} };
  const { user } = useAuth();
  const [isOnline, setIsOnline] = useState(false);
  const totalEarnings = weeklyEarnings.reduce((sum, e) => sum + e.amount, 0);
  
  // Generate a random profile picture if user doesn't have one
  const profileImageUri = user?.profileImage || `https://i.pravatar.cc/150?img=${user?.id || '1'}`;

  const handleToggleOnline = () => {
    setIsOnline(!isOnline);
    if (!isOnline) {
      // Navigate to available jobs when going online
      nav.navigate('AvailableJobs');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.profileSection}
          onPress={() => nav.navigate('Profile')}
        >
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: profileImageUri }}
              style={styles.avatar}
            />
            {isOnline && (
              <View style={styles.onlineStatusBadge}>
                <View style={styles.onlineStatusDot} />
              </View>
            )}
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user?.name || 'John Doe'}</Text>
            <View style={styles.verifiedBadge}>
              <Ionicons name="shield-checkmark" size={14} color={Colors.primary} />
              <Text style={styles.verifiedText}>Verified Mechanic</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.onlineButton, isOnline && styles.onlineButtonActive]}
          onPress={handleToggleOnline}
        >
          <View style={[styles.onlineIndicator, isOnline && styles.onlineIndicatorActive]} />
          <Text style={[styles.onlineButtonText, isOnline && styles.onlineButtonTextActive]}>
            {isOnline ? 'ONLINE' : 'GO ONLINE'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {isOnline && (
            <View style={styles.onlineBanner}>
              <Ionicons name="radio-button-on" size={20} color={Colors.success} />
              <Text style={styles.onlineBannerText}>
                You're online! New jobs will appear here
              </Text>
            </View>
          )}

          <View style={styles.earningsHeader}>
            <Text style={styles.sectionTitle}>Weekly Earnings</Text>
            <View style={styles.percentageBadge}>
              <Text style={styles.percentageText}>+12%</Text>
            </View>
          </View>

          <View style={styles.chartContainer}>
            <View style={styles.chart}>
              {weeklyEarnings.map((earning, index) => {
                const height = (earning.amount / maxEarnings) * 150;
                const isHighest = earning.amount === maxEarnings;
                return (
                  <View key={index} style={styles.barContainer}>
                    <View
                      style={[
                        styles.bar,
                        { height },
                        isHighest && styles.highestBar,
                      ]}
                    />
                    <Text style={styles.dayLabel}>{earning.day}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total this week</Text>
            <Text style={styles.totalAmount}>KES {totalEarnings.toLocaleString()}</Text>
          </View>
        </View>
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    paddingTop: 60,
    backgroundColor: Colors.white,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  scrollContent: {
    flex: 1,
    marginTop: 140,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: Spacing.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: Colors.primary + '30',
  },
  onlineStatusBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  onlineStatusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.success,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    ...Typography.h3,
    marginBottom: Spacing.xs,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  onlineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
    gap: Spacing.xs,
  },
  onlineButtonActive: {
    backgroundColor: Colors.primary,
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.textSecondary,
  },
  onlineIndicatorActive: {
    backgroundColor: Colors.white,
  },
  onlineButtonText: {
    ...Typography.caption,
    fontWeight: '600',
    color: Colors.text,
  },
  onlineButtonTextActive: {
    color: Colors.white,
  },
  content: {
    padding: Spacing.lg,
  },
  earningsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.h2,
  },
  percentageBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 8,
  },
  percentageText: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '600',
  },
  chartContainer: {
    marginBottom: Spacing.xl,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 200,
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  bar: {
    width: '100%',
    backgroundColor: Colors.textSecondary,
    borderRadius: 4,
    marginBottom: Spacing.sm,
    minHeight: 20,
  },
  highestBar: {
    backgroundColor: Colors.primary,
  },
  dayLabel: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  totalLabel: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  totalAmount: {
    ...Typography.h2,
    fontWeight: 'bold',
  },
  onlineBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.success + '15',
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  onlineBannerText: {
    ...Typography.body,
    color: Colors.success,
    fontWeight: '600',
    flex: 1,
  },
});

