import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../../constants/Theme';
import { ServiceProvider, Job } from '../../types';
import { useJobs } from '../../context/JobContext';
import { useAuth } from '../../context/AuthContext';

export default function ServiceRequestScreen({ route, navigation }: any) {
  const { provider }: { provider: ServiceProvider } = route.params;
  const { user } = useAuth();
  const { addClientJob } = useJobs();
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');

  const handleRequest = () => {
    if (description && address) {
      // Create a new job request
      const newJob: Job = {
        id: `JOB-${Date.now()}`,
        clientId: user?.id || '1',
        providerId: provider.id,
        serviceType: provider.profession,
        status: 'pending',
        location: {
          address,
          latitude: -1.2921,
          longitude: 36.8219,
        },
        estimatedEarnings: provider.hourlyRate * 2.5,
        distance: 2.5,
        estimatedTime: provider.eta,
      };
      
      addClientJob(newJob);
      navigation.navigate('Tracking', { provider, job: newJob });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Request Service</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
        <View style={styles.providerCard}>
          <View style={styles.providerHeader}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: provider.profileImage || 'https://i.pravatar.cc/150?img=12' }}
                style={styles.providerAvatar}
              />
              {provider.verified && (
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark" size={14} color={Colors.white} />
                </View>
              )}
            </View>
            <View style={styles.providerInfo}>
              <Text style={styles.providerName}>{provider.name}</Text>
              <Text style={styles.providerProfession}>{provider.profession}</Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Ionicons name="star" size={20} color="#FFD700" />
              </View>
              <View style={styles.statContent}>
                <Text style={styles.statValue}>{provider.rating}</Text>
                <Text style={styles.statLabel}>Rating</Text>
              </View>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Ionicons name="briefcase" size={20} color={Colors.primary} />
              </View>
              <View style={styles.statContent}>
                <Text style={styles.statValue}>{provider.jobsCompleted}</Text>
                <Text style={styles.statLabel}>Jobs Done</Text>
              </View>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Ionicons name="cash" size={20} color={Colors.secondary} />
              </View>
              <View style={styles.statContent}>
                <Text style={styles.statValue}>KES {provider.hourlyRate}</Text>
                <Text style={styles.statLabel}>Per Hour</Text>
              </View>
            </View>
          </View>

          <View style={styles.etaContainer}>
            <Ionicons name="time" size={18} color={Colors.textSecondary} />
            <Text style={styles.etaText}>Estimated arrival: {provider.eta} minutes</Text>
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Service Details</Text>
          <Text style={styles.label}>Describe what you need</Text>
          <TextInput
            style={styles.textArea}
            placeholder="E.g., Car engine diagnosis and repair"
            placeholderTextColor={Colors.textSecondary}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Service Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your address"
            placeholderTextColor={Colors.textSecondary}
            value={address}
            onChangeText={setAddress}
          />
          <TouchableOpacity style={styles.locationButton}>
            <Ionicons name="location" size={20} color={Colors.primary} />
            <Text style={styles.locationButtonText}>Use Current Location</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Estimated Cost</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Hourly Rate</Text>
            <Text style={styles.summaryValue}>KSh {provider.hourlyRate}/hr</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Estimated Time</Text>
            <Text style={styles.summaryValue}>2-3 hours</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Estimated Total</Text>
            <Text style={styles.totalValue}>
              KSh {provider.hourlyRate * 2.5}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.requestButton, (!description || !address) && styles.requestButtonDisabled]}
          onPress={handleRequest}
          disabled={!description || !address}
        >
          <Text style={styles.requestButtonText}>Confirm Request</Text>
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
  headerTitle: {
    ...Typography.h2,
  },
  scrollContent: {
    flex: 1,
    marginTop: 100,
  },
  content: {
    padding: Spacing.lg,
  },
  providerCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  providerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: Spacing.md,
  },
  providerAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: Colors.primary + '30',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.white,
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    ...Typography.h2,
    marginBottom: Spacing.xs,
  },
  providerProfession: {
    ...Typography.body,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.xs,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  statContent: {
    alignItems: 'center',
  },
  statValue: {
    ...Typography.h3,
    color: Colors.text,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statLabel: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  etaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary + '10',
    padding: Spacing.md,
    borderRadius: 12,
    gap: Spacing.sm,
  },
  etaText: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: '600',
  },
  sectionTitle: {
    ...Typography.h3,
    marginBottom: Spacing.md,
  },
  formSection: {
    marginBottom: Spacing.lg,
  },
  label: {
    ...Typography.body,
    marginBottom: Spacing.sm,
    fontWeight: '600',
  },
  input: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.md,
    ...Typography.body,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  textArea: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.md,
    ...Typography.body,
    minHeight: 120,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.sm,
  },
  locationButtonText: {
    ...Typography.body,
    color: Colors.primary,
    marginLeft: Spacing.xs,
  },
  summaryCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  summaryLabel: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  summaryValue: {
    ...Typography.body,
    fontWeight: '600',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.sm,
    marginTop: Spacing.sm,
  },
  totalLabel: {
    ...Typography.h3,
  },
  totalValue: {
    ...Typography.h2,
    color: Colors.primary,
  },
  requestButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: Spacing.md,
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  requestButtonDisabled: {
    backgroundColor: Colors.border,
  },
  requestButtonText: {
    ...Typography.h3,
    color: Colors.white,
  },
});

