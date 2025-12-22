import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { Colors, Spacing, Typography } from '../../constants/Theme';
import { ProfileImagePicker } from '../../components/ImagePicker';

export default function ClientProfileScreen({ navigation }: any) {
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(
    user?.profileImage || `https://i.pravatar.cc/150?img=${user?.id || '1'}`
  );

  const handleLogout = async () => {
    setShowLogoutModal(false);
    await logout();
  };

  const confirmLogout = () => {
    setShowLogoutModal(true);
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
          <ProfileImagePicker
            imageUri={profileImage}
            onImageSelected={setProfileImage}
            size={120}
          />
          <Text style={styles.name}>{user?.name || 'Alice Mwangi'}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Requests</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <Ionicons name="star" size={20} color="#FFD700" />
            <Text style={styles.statNumber}>4.8</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate('UpcomingJobs')}
        >
          <View style={[styles.settingIcon, { backgroundColor: Colors.primary + '15' }]}>
            <Ionicons name="time" size={24} color={Colors.primary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Upcoming Jobs</Text>
            <Text style={styles.settingSubtext}>View your active requests</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate('RequestsMain')}
        >
          <View style={[styles.settingIcon, { backgroundColor: Colors.secondary + '15' }]}>
            <Ionicons name="list" size={24} color={Colors.secondary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Job History</Text>
            <Text style={styles.settingSubtext}>Past service requests</Text>
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
            <Text style={styles.settingSubtext}>Manage your payment options</Text>
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
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.settingItem} onPress={confirmLogout}>
          <View style={styles.settingLeft}>
            <Ionicons name="log-out" size={24} color={Colors.error} />
            <Text style={[styles.settingLabel, { color: Colors.error }]}>
              Logout
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={Colors.error} />
        </TouchableOpacity>
      </View>

      <Modal
        visible={showLogoutModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIconContainer}>
              <Ionicons name="log-out-outline" size={48} color={Colors.error} />
            </View>
            <Text style={styles.modalTitle}>Logout</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to logout? You'll need to sign in again to access your account.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.logoutButton]}
                onPress={handleLogout}
              >
                <Text style={styles.logoutButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  avatarContainer: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: Colors.primary + '20',
  },
  avatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.white,
  },
  name: {
    ...Typography.h1,
    marginBottom: Spacing.xs,
  },
  email: {
    ...Typography.body,
    color: Colors.textSecondary,
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
    ...Typography.h2,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: Spacing.xl,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  modalIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.error + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  modalTitle: {
    ...Typography.h2,
    marginBottom: Spacing.sm,
  },
  modalMessage: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: 'row',
    width: '100%',
    gap: Spacing.md,
  },
  modalButton: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cancelButtonText: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: Colors.error,
  },
  logoutButtonText: {
    ...Typography.body,
    color: Colors.white,
    fontWeight: '600',
  },
});

