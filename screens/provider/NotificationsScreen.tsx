import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../../constants/Theme';

interface Notification {
  id: string;
  type: 'job' | 'message' | 'payment' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'job',
    title: 'New Job Request',
    message: 'You have a new service request from Alice Mwangi',
    time: '10 minutes ago',
    read: false,
  },
  {
    id: '2',
    type: 'payment',
    title: 'Payment Received',
    message: 'KES 1,500 has been credited to your account',
    time: '2 hours ago',
    read: false,
  },
  {
    id: '3',
    type: 'message',
    title: 'New Message',
    message: 'You have a new message from a client',
    time: '5 hours ago',
    read: true,
  },
  {
    id: '4',
    type: 'system',
    title: 'Profile Verified',
    message: 'Your profile has been verified successfully',
    time: '1 day ago',
    read: true,
  },
];

export default function ProviderNotificationsScreen({ navigation }: any) {
  const [notifications, setNotifications] = useState(mockNotifications);

  const getIcon = (type: string) => {
    switch (type) {
      case 'job':
        return 'briefcase';
      case 'message':
        return 'chatbubble';
      case 'payment':
        return 'cash';
      case 'system':
        return 'notifications';
      default:
        return 'notifications-outline';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'job':
        return Colors.primary;
      case 'message':
        return Colors.secondary;
      case 'payment':
        return Colors.success;
      case 'system':
        return Colors.warning;
      default:
        return Colors.textSecondary;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[styles.notificationCard, !item.read && styles.unreadCard]}
      onPress={() => markAsRead(item.id)}
    >
      <View style={[styles.iconContainer, { backgroundColor: getIconColor(item.type) + '20' }]}>
        <Ionicons
          name={getIcon(item.type) as any}
          size={24}
          color={getIconColor(item.type)}
        />
      </View>
      <View style={styles.notificationContent}>
        <Text style={[styles.notificationTitle, !item.read && styles.unreadTitle]}>
          {item.title}
        </Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
      {!item.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity>
          <Text style={styles.markAllText}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
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
  markAllText: {
    ...Typography.body,
    color: Colors.primary,
  },
  list: {
    padding: Spacing.lg,
  },
  notificationCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    flexDirection: 'row',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  unreadCard: {
    backgroundColor: Colors.primary + '05',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    ...Typography.h3,
    marginBottom: Spacing.xs,
  },
  unreadTitle: {
    fontWeight: 'bold',
  },
  notificationMessage: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  notificationTime: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    alignSelf: 'center',
  },
});

