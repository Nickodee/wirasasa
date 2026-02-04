import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../constants/Theme';

const faqItems = [
  {
    id: '1',
    question: 'How do I request a service?',
    answer: 'Browse service categories, select a provider, and click "Request Service". Fill in the details and confirm your request.',
  },
  {
    id: '2',
    question: 'How are payments processed?',
    answer: 'Payments are processed securely through M-Pesa or card. You pay after service completion.',
  },
  {
    id: '3',
    question: 'Can I cancel a service request?',
    answer: 'Yes, you can cancel a request before the provider accepts it. Contact support for cancellations after acceptance.',
  },
  {
    id: '4',
    question: 'How do I become a service provider?',
    answer: 'Sign up as a provider, complete your profile, and get verified. Once verified, you can start receiving job requests.',
  },
];

export default function HelpSupportScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>

      <View style={styles.content}>
        <View style={styles.contactCard}>
          <Ionicons name="call" size={32} color={Colors.primary} />
          <Text style={styles.contactTitle}>Contact Us</Text>
          <Text style={styles.contactText}>+254 700 000 000</Text>
          <Text style={styles.contactText}>support@wirasasa.com</Text>
        </View>

        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

        {faqItems.map((item) => (
          <View key={item.id} style={styles.faqCard}>
            <Text style={styles.faqQuestion}>{item.question}</Text>
            <Text style={styles.faqAnswer}>{item.answer}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.chatButton}>
          <Ionicons name="chatbubble" size={20} color={Colors.white} />
          <Text style={styles.chatButtonText}>Chat with Support</Text>
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
  content: {
    padding: Spacing.lg,
  },
  contactCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.xl,
    alignItems: 'center',
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  contactTitle: {
    ...Typography.h3,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  contactText: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  sectionTitle: {
    ...Typography.h3,
    marginBottom: Spacing.md,
  },
  faqCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  faqQuestion: {
    ...Typography.h3,
    marginBottom: Spacing.sm,
  },
  faqAnswer: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: Spacing.md,
    marginTop: Spacing.md,
  },
  chatButtonText: {
    ...Typography.h3,
    color: Colors.white,
    marginLeft: Spacing.sm,
  },
});

