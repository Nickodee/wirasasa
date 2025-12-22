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

interface PaymentMethod {
  id: string;
  type: 'mpesa' | 'bank';
  name: string;
  details: string;
  isDefault: boolean;
}

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'mpesa',
    name: 'M-Pesa',
    details: '+254 712 345 678',
    isDefault: true,
  },
  {
    id: '2',
    type: 'bank',
    name: 'Equity Bank',
    details: 'Account: 1234567890',
    isDefault: false,
  },
];

export default function ProviderPaymentMethodsScreen({ navigation }: any) {
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);

  const getIcon = (type: string) => {
    switch (type) {
      case 'mpesa':
        return 'phone-portrait';
      case 'bank':
        return 'business';
      default:
        return 'wallet';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={24} color={Colors.secondary} />
          <Text style={styles.infoText}>
            Earnings will be sent to your default payment method
          </Text>
        </View>

        {paymentMethods.map((method) => (
          <View key={method.id} style={styles.paymentCard}>
            <View style={styles.paymentInfo}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name={getIcon(method.type) as any}
                  size={24}
                  color={Colors.primary}
                />
              </View>
              <View style={styles.paymentDetails}>
                <Text style={styles.paymentName}>{method.name}</Text>
                <Text style={styles.paymentDetailsText}>{method.details}</Text>
              </View>
            </View>
            {method.isDefault && (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultText}>Default</Text>
              </View>
            )}
          </View>
        ))}

        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={24} color={Colors.primary} />
          <Text style={styles.addButtonText}>Add Payment Method</Text>
        </TouchableOpacity>
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
  paymentCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  paymentDetails: {
    flex: 1,
  },
  paymentName: {
    ...Typography.h3,
    marginBottom: Spacing.xs,
  },
  paymentDetailsText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  defaultBadge: {
    backgroundColor: Colors.primary + '20',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 8,
  },
  defaultText: {
    ...Typography.small,
    color: Colors.primary,
    fontWeight: '600',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    marginTop: Spacing.md,
  },
  addButtonText: {
    ...Typography.body,
    color: Colors.primary,
    marginLeft: Spacing.sm,
    fontWeight: '600',
  },
});

