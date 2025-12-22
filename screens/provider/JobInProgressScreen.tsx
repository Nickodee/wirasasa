import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { Colors, Spacing, Typography } from '../../constants/Theme';
import { Job } from '../../types';

export default function JobInProgressScreen({ route, navigation }: any) {
  const { job }: { job?: Job } = route?.params || {};
  const { user } = useAuth();
  const [invoiceAmount, setInvoiceAmount] = useState('');
  const [invoiceDescription, setInvoiceDescription] = useState('');
  const [showInvoice, setShowInvoice] = useState(false);
  
  // Generate profile image URI
  const profileImageUri = user?.profileImage || `https://i.pravatar.cc/150?img=${user?.id || '1'}`;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.profileSection}
          onPress={() => navigation.navigate('Profile')}
        >
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: profileImageUri }}
              style={styles.avatar}
            />
            <View style={styles.onlineDot} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user?.name || 'John Doe'}</Text>
            <View style={styles.verifiedBadge}>
              <Ionicons name="shield-checkmark" size={14} color={Colors.primary} />
              <Text style={styles.verifiedText}>Verified Mechanic</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.onlineBadge}>
          <View style={styles.onlineIndicator} />
          <Text style={styles.onlineText}>ONLINE</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.jobCard}>
          <View style={styles.jobHeader}>
            <View style={styles.jobHeaderLeft}>
              <Ionicons name="time" size={20} color={Colors.white} />
              <Text style={styles.jobHeaderText}>Job in Progress</Text>
            </View>
            <Text style={styles.jobId}>#{job?.id || 'JOB-1234'}</Text>
          </View>

          <View style={styles.jobDetails}>
            <View style={styles.detailRow}>
              <View>
                <Text style={styles.detailLabel}>Client</Text>
                <Text style={styles.detailValue}>Alice Mwangi</Text>
              </View>
              <View style={styles.alignRight}>
                <Text style={styles.detailLabel}>Est. Earnings</Text>
                <Text style={[styles.detailValue, styles.earningsValue]}>
                  KES {job?.estimatedEarnings || 1500}
                </Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View>
                <Text style={styles.detailLabel}>Service Type</Text>
                <Text style={styles.detailValue}>{job?.serviceType || 'Mechanic'}</Text>
              </View>
            </View>

            <View style={styles.locationCard}>
              <Ionicons name="location" size={20} color={Colors.textSecondary} />
              <View style={styles.locationInfo}>
                <Text style={styles.locationText}>
                  {job?.location?.address || 'Westlands, Nairobi'}
                </Text>
                <Text style={styles.locationDetails}>
                  {job?.distance ? `${job.distance} km away` : '1.2km away'} • {job?.estimatedTime || 5} mins
                </Text>
              </View>
            </View>

            {showInvoice && (
              <View style={styles.invoiceSection}>
                <Text style={styles.sectionTitle}>Add Invoice</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Amount (KES)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter amount"
                    value={invoiceAmount}
                    onChangeText={setInvoiceAmount}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Description</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Describe the work done..."
                    value={invoiceDescription}
                    onChangeText={setInvoiceDescription}
                    multiline
                    numberOfLines={4}
                  />
                </View>
                <TouchableOpacity
                  style={styles.submitInvoiceButton}
                  onPress={() => {
                    if (invoiceAmount && invoiceDescription) {
                      Alert.alert('Success', 'Invoice submitted successfully!');
                      setShowInvoice(false);
                      setInvoiceAmount('');
                      setInvoiceDescription('');
                    } else {
                      Alert.alert('Error', 'Please fill in all fields');
                    }
                  }}
                >
                  <Text style={styles.submitInvoiceButtonText}>Submit Invoice</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  // Open navigation app
                  Alert.alert('Navigation', 'Opening navigation app...');
                }}
              >
                <Ionicons name="navigate" size={20} color={Colors.text} />
                <Text style={styles.actionButtonText}>Navigate</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => navigation.navigate('Chat', { job, userType: 'provider' })}
              >
                <Ionicons name="chatbubble-outline" size={20} color={Colors.text} />
                <Text style={styles.actionButtonText}>Message</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.jobActions}>
              <TouchableOpacity
                style={styles.requestPayButton}
                onPress={() => {
                  Alert.alert('Request Payment', 'Payment request sent to client!');
                }}
              >
                <Ionicons name="cash" size={20} color={Colors.white} />
                <Text style={styles.requestPayButtonText}>Request Payment</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.invoiceButton}
                onPress={() => setShowInvoice(!showInvoice)}
              >
                <Ionicons name="document-text" size={20} color={Colors.primary} />
                <Text style={styles.invoiceButtonText}>
                  {showInvoice ? 'Hide Invoice' : 'Add Invoice'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.bottomActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  Alert.alert(
                    'Cancel Job',
                    'Are you sure you want to cancel this job?',
                    [
                      { text: 'No', style: 'cancel' },
                      {
                        text: 'Yes, Cancel',
                        style: 'destructive',
                        onPress: () => {
                          Alert.alert('Job Cancelled', 'The job has been cancelled.');
                          navigation.goBack();
                        },
                      },
                    ]
                  );
                }}
              >
                <Ionicons name="close-circle" size={20} color={Colors.error} />
                <Text style={styles.cancelButtonText}>Cancel Job</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.completeButton}
                onPress={() => {
                  Alert.alert(
                    'Complete Job',
                    'Mark this job as completed?',
                    [
                      { text: 'No', style: 'cancel' },
                      {
                        text: 'Yes, Complete',
                        onPress: () => {
                          Alert.alert('Job Completed', 'The job has been marked as completed!');
                          navigation.navigate('Jobs');
                        },
                      },
                    ]
                  );
                }}
              >
                <Ionicons name="checkmark-circle" size={20} color={Colors.white} />
                <Text style={styles.completeButtonText}>Complete Job</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    paddingTop: 60,
    backgroundColor: Colors.white,
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
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.primary + '30',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.success,
    borderWidth: 2,
    borderColor: Colors.white,
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
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
    gap: Spacing.xs,
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.white,
  },
  onlineText: {
    ...Typography.caption,
    color: Colors.white,
    fontWeight: '600',
  },
  content: {
    padding: Spacing.lg,
  },
  jobCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    padding: Spacing.md,
  },
  jobHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobHeaderText: {
    ...Typography.body,
    color: Colors.white,
    marginLeft: Spacing.sm,
    fontWeight: '600',
  },
  jobId: {
    ...Typography.caption,
    color: Colors.primaryLight,
  },
  jobDetails: {
    padding: Spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  detailLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  detailValue: {
    ...Typography.h3,
  },
  alignRight: {
    alignItems: 'flex-end',
  },
  earningsValue: {
    color: Colors.primary,
  },
  locationCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: 12,
    marginBottom: Spacing.lg,
  },
  locationInfo: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  locationText: {
    ...Typography.body,
    marginBottom: Spacing.xs,
  },
  locationDetails: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  actionButtonText: {
    ...Typography.body,
    marginLeft: Spacing.xs,
  },
  invoiceSection: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    marginTop: Spacing.md,
  },
  sectionTitle: {
    ...Typography.h3,
    marginBottom: Spacing.md,
  },
  inputContainer: {
    marginBottom: Spacing.md,
  },
  inputLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
    fontWeight: '600',
  },
  input: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Typography.body,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitInvoiceButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: Spacing.md,
    alignItems: 'center',
  },
  submitInvoiceButtonText: {
    ...Typography.body,
    color: Colors.white,
    fontWeight: '600',
  },
  jobActions: {
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  requestPayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
    padding: Spacing.md,
    borderRadius: 12,
    gap: Spacing.xs,
  },
  requestPayButtonText: {
    ...Typography.body,
    color: Colors.white,
    fontWeight: '600',
  },
  invoiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
    gap: Spacing.xs,
  },
  invoiceButtonText: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '600',
  },
  bottomActions: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.md,
  },
  cancelButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.error,
    gap: Spacing.xs,
  },
  cancelButtonText: {
    ...Typography.body,
    color: Colors.error,
    fontWeight: '600',
  },
  completeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: 12,
    gap: Spacing.xs,
  },
  completeButtonText: {
    ...Typography.body,
    color: Colors.white,
    fontWeight: '600',
  },
});

