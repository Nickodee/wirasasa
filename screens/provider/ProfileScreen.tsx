import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { Colors, Spacing, Typography } from '../../constants/Theme';
import { ProfileImagePicker } from '../../components/ImagePicker';

export default function ProviderProfileScreen({ navigation }: any) {
  const { user, logout } = useAuth();
  const [isOnline, setIsOnline] = useState(true);
  const [profileImage, setProfileImage] = useState<string | null>(
    user?.profileImage || `https://i.pravatar.cc/150?img=${user?.id || '1'}`
  );

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>

      <View style={styles.profileHeader}>
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <ProfileImagePicker
              imageUri={profileImage}
              onImageSelected={setProfileImage}
              size={120}
            />
            <View style={styles.avatarBadge}>
              <Ionicons name="shield-checkmark" size={20} color={Colors.white} />
            </View>
          </View>
          <Text style={styles.name}>{user?.name || 'John Doe'}</Text>
          <View style={styles.verifiedBadge}>
            <Ionicons name="shield-checkmark" size={16} color={Colors.primary} />
            <Text style={styles.verifiedText}>Verified Mechanic</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>156</Text>
            <Text style={styles.statLabel}>Jobs Done</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <Ionicons name="star" size={20} color="#FFD700" />
            <Text style={styles.statNumber}>4.6</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>KES</Text>
            <Text style={styles.statNumber}>24.5K</Text>
            <Text style={styles.statLabel}>This Week</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.settingItem}>
          <View style={[styles.settingIcon, { backgroundColor: Colors.primary + '15' }]}>
            <Ionicons name="person" size={24} color={Colors.primary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Edit Profile</Text>
            <Text style={styles.settingSubtext}>Update your information</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate('ServiceManagement')}
        >
          <View style={[styles.settingIcon, { backgroundColor: Colors.secondary + '15' }]}>
            <Ionicons name="construct" size={24} color={Colors.secondary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>My Services</Text>
            <Text style={styles.settingSubtext}>Manage your service offerings</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate('Availability')}
        >
          <View style={[styles.settingIcon, { backgroundColor: '#FF9800' + '15' }]}>
            <Ionicons name="time" size={24} color="#FF9800" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Availability</Text>
            <Text style={styles.settingSubtext}>Set your working hours</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate('Notifications')}
        >
          <View style={[styles.settingIcon, { backgroundColor: Colors.secondary + '15' }]}>
            <Ionicons name="notifications" size={24} color={Colors.secondary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Notifications</Text>
            <Text style={styles.settingSubtext}>Manage your alerts</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate('PaymentMethods')}
        >
          <View style={[styles.settingIcon, { backgroundColor: '#FF9800' + '15' }]}>
            <Ionicons name="card" size={24} color="#FF9800" />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Payment Methods</Text>
            <Text style={styles.settingSubtext}>Manage earnings payout</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate('HelpSupport')}
        >
          <View style={[styles.settingIcon, { backgroundColor: Colors.textSecondary + '15' }]}>
            <Ionicons name="help-circle" size={24} color={Colors.textSecondary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Help & Support</Text>
            <Text style={styles.settingSubtext}>Get help and contact us</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="time" size={24} color={Colors.textSecondary} />
            <Text style={styles.settingLabel}>Job History</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('JobsMain')}
          >
            <Ionicons name="chevron-forward" size={24} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="radio-button-on" size={24} color={Colors.primary} />
            <Text style={styles.settingLabel}>Go Online</Text>
          </View>
          <Switch
            value={isOnline}
            onValueChange={setIsOnline}
            trackColor={{ false: Colors.border, true: Colors.primaryLight }}
            thumbColor={isOnline ? Colors.primary : Colors.white}
          />
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
          <View style={[styles.settingIcon, { backgroundColor: Colors.error + '15' }]}>
            <Ionicons name="log-out" size={24} color={Colors.error} />
          </View>
          <View style={styles.settingContent}>
            <Text style={[styles.settingLabel, { color: Colors.error }]}>
              Logout
            </Text>
            <Text style={styles.settingSubtext}>Sign out of your account</Text>
          </View>
        </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    paddingTop: 60,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  scrollContent: {
    flex: 1,
    marginTop: 100,
  },
  headerTitle: {
    ...Typography.h2,
  },
  profileHeader: {
    backgroundColor: Colors.white,
    marginBottom: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  profileSection: {
    alignItems: 'center',
    padding: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  avatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.white,
    zIndex: 1,
  },
  name: {
    ...Typography.h1,
    marginBottom: Spacing.xs,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xs,
    backgroundColor: Colors.primary + '15',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 16,
  },
  verifiedText: {
    ...Typography.caption,
    color: Colors.primary,
    marginLeft: 4,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.md,
  },
  statNumber: {
    ...Typography.h3,
    color: Colors.primary,
    fontWeight: 'bold',
    marginBottom: Spacing.xs,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  section: {
    backgroundColor: Colors.white,
    marginBottom: Spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    ...Typography.body,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingSubtext: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
});

