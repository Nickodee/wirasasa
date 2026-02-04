import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../../constants/Theme';

const providerMessages = [
  {
    id: '1',
    name: 'Samuel Njoroge',
    preview: 'I will arrive in 10 minutes.',
    time: '08:45',
  },
  {
    id: '2',
    name: 'Joseph Kipchoge',
    preview: 'Kindly confirm your location.',
    time: 'Yesterday',
  },
];

export default function MessagesScreen({ navigation }: any) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <TouchableOpacity style={styles.card}>
            <View style={[styles.iconCircle, { backgroundColor: Colors.primary + '15' }]}>
              <Ionicons name="headset" size={22} color={Colors.primary} />
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Contact Us</Text>
              <Text style={styles.cardSubtitle}>Reach WiraSasa support</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <View style={[styles.iconCircle, { backgroundColor: Colors.infoLight }]}>
              <Ionicons name="notifications" size={22} color={Colors.info} />
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>System Messages</Text>
              <Text style={styles.cardSubtitle}>Updates about your account and app</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <View style={[styles.iconCircle, { backgroundColor: Colors.accentSoft }]}>
              <Ionicons name="pricetag" size={22} color={Colors.accent} />
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Promotions</Text>
              <Text style={styles.cardSubtitle}>Offers, discounts and rewards</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Messages from Providers</Text>
          {providerMessages.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.messageRow}
              onPress={() => navigation.navigate('Chat', { provider: { name: item.name } })}
            >
              <View style={styles.messageAvatar}>
                <Ionicons name="person" size={20} color={Colors.white} />
              </View>
              <View style={styles.messageContent}>
                <Text style={styles.messageName}>{item.name}</Text>
                <Text style={styles.messagePreview} numberOfLines={1}>
                  {item.preview}
                </Text>
              </View>
              <Text style={styles.messageTime}>{item.time}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  scroll: {
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    ...Typography.body,
    fontWeight: '600',
    marginBottom: 2,
  },
  cardSubtitle: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  sectionTitle: {
    ...Typography.h3,
    marginBottom: Spacing.md,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  messageAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  messageContent: {
    flex: 1,
  },
  messageName: {
    ...Typography.body,
    fontWeight: '600',
  },
  messagePreview: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  messageTime: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginLeft: Spacing.sm,
  },
});
