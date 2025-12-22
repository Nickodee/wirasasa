import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../../constants/Theme';

interface Service {
  id: string;
  name: string;
  hourlyRate: number;
  enabled: boolean;
}

const mockServices: Service[] = [
  { id: '1', name: 'Mechanic', hourlyRate: 900, enabled: true },
  { id: '2', name: 'Electrician', hourlyRate: 850, enabled: false },
  { id: '3', name: 'Plumber', hourlyRate: 800, enabled: false },
];

export default function ServiceManagementScreen({ navigation }: any) {
  const [services, setServices] = useState(mockServices);

  const toggleService = (id: string) => {
    setServices(
      services.map((service) =>
        service.id === id ? { ...service, enabled: !service.enabled } : service
      )
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Services</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={24} color={Colors.secondary} />
          <Text style={styles.infoText}>
            Enable services you offer and set your hourly rates
          </Text>
        </View>

        {services.map((service) => (
          <View key={service.id} style={styles.serviceCard}>
            <View style={styles.serviceHeader}>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceRate}>KSh {service.hourlyRate}/hr</Text>
              </View>
              <Switch
                value={service.enabled}
                onValueChange={() => toggleService(service.id)}
                trackColor={{ false: Colors.border, true: Colors.primaryLight }}
                thumbColor={service.enabled ? Colors.primary : Colors.white}
              />
            </View>
            {service.enabled && (
              <View style={styles.rateEditor}>
                <Text style={styles.rateLabel}>Hourly Rate</Text>
                <View style={styles.rateInputContainer}>
                  <Text style={styles.currency}>KSh</Text>
                  <TextInput
                    style={styles.rateInput}
                    value={service.hourlyRate.toString()}
                    keyboardType="numeric"
                    placeholder="0"
                  />
                  <Text style={styles.perHour}>/hr</Text>
                </View>
              </View>
            )}
          </View>
        ))}

        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={24} color={Colors.primary} />
          <Text style={styles.addButtonText}>Add New Service</Text>
        </TouchableOpacity>
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
  serviceCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    ...Typography.h3,
    marginBottom: Spacing.xs,
  },
  serviceRate: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '600',
  },
  rateEditor: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  rateLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  rateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: Spacing.sm,
  },
  currency: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginRight: Spacing.xs,
  },
  rateInput: {
    flex: 1,
    ...Typography.h3,
    padding: 0,
  },
  perHour: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginLeft: Spacing.xs,
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

