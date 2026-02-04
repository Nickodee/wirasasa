import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../../constants/Theme';

interface DaySchedule {
  day: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
}

const weekDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export default function AvailabilityScreen({ navigation }: any) {
  const [schedule, setSchedule] = useState<DaySchedule[]>(
    weekDays.map((day) => ({
      day,
      enabled: day !== 'Sunday',
      startTime: '08:00',
      endTime: '18:00',
    }))
  );

  const toggleDay = (day: string) => {
    setSchedule(
      schedule.map((item) =>
        item.day === day ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Availability</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={24} color={Colors.secondary} />
          <Text style={styles.infoText}>
            Set your working hours. You'll only receive job requests during these times.
          </Text>
        </View>

        {schedule.map((item) => (
          <View key={item.day} style={styles.scheduleCard}>
            <View style={styles.dayRow}>
              <View style={styles.dayInfo}>
                <Text style={styles.dayName}>{item.day}</Text>
                {item.enabled && (
                  <Text style={styles.timeText}>
                    {item.startTime} - {item.endTime}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                style={[styles.toggle, item.enabled && styles.toggleActive]}
                onPress={() => toggleDay(item.day)}
              >
                <View style={[styles.toggleDot, item.enabled && styles.toggleDotActive]} />
              </TouchableOpacity>
            </View>
            {item.enabled && (
              <View style={styles.timeSelector}>
                <TouchableOpacity style={styles.timeButton}>
                  <Text style={styles.timeButtonText}>{item.startTime}</Text>
                  <Ionicons name="chevron-down" size={16} color={Colors.textSecondary} />
                </TouchableOpacity>
                <Text style={styles.toText}>to</Text>
                <TouchableOpacity style={styles.timeButton}>
                  <Text style={styles.timeButtonText}>{item.endTime}</Text>
                  <Ionicons name="chevron-down" size={16} color={Colors.textSecondary} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    paddingTop: 60,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    ...Typography.h2,
  },
  content: {
    padding: Spacing.lg,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: Colors.secondary + '20',
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    alignItems: 'center',
  },
  infoText: {
    ...Typography.body,
    color: Colors.text,
    marginLeft: Spacing.sm,
    flex: 1,
  },
  scheduleCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  dayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayInfo: {
    flex: 1,
  },
  dayName: {
    ...Typography.h3,
    marginBottom: Spacing.xs,
  },
  timeText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.border,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: Colors.primary,
  },
  toggleDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.white,
  },
  toggleDotActive: {
    alignSelf: 'flex-end',
  },
  timeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: Spacing.sm,
    flex: 1,
    justifyContent: 'space-between',
  },
  timeButtonText: {
    ...Typography.body,
  },
  toText: {
    ...Typography.body,
    marginHorizontal: Spacing.md,
    color: Colors.textSecondary,
  },
});

