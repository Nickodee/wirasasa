import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../constants/Theme';

interface QuickStat {
  icon: string;
  label: string;
  value: string;
  color: string;
}

interface QuickStatsCardProps {
  stats: QuickStat[];
}

export const QuickStatsCard: React.FC<QuickStatsCardProps> = ({ stats }) => {
  return (
    <View style={styles.container}>
      {stats.map((stat, index) => (
        <React.Fragment key={index}>
          <View style={styles.statItem}>
            <View style={[styles.iconContainer, { backgroundColor: stat.color + '15' }]}>
              <Ionicons name={stat.icon as any} size={24} color={stat.color} />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          </View>
          {index < stats.length - 1 && <View style={styles.divider} />}
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.md,
    flexDirection: 'row',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: 2,
  },
  statLabel: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  divider: {
    width: 1,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.sm,
  },
});

