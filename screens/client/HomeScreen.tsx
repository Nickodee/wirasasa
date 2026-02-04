import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
  Platform,
  BackHandler,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { ServiceCard } from '../../components/ServiceCard';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '../../constants/Theme';
import { SafeAreaView } from 'react-native-safe-area-context';

const services = [
  { id: '1', name: 'Electrician', icon: 'flash-outline', color: Colors.electric },
  { id: '2', name: 'Plumber', icon: 'water-outline', color: Colors.plumbing },
  { id: '3', name: 'Mechanic', icon: 'car-sport-outline', color: Colors.mechanical },
  { id: '4', name: 'Gardener', icon: 'leaf-outline', color: Colors.garden },
  { id: '5', name: 'Carpenter', icon: 'hammer-outline', color: Colors.carpentry },
  { id: '6', name: 'Painter', icon: 'brush-outline', color: Colors.painting },
  { id: '7', name: 'Cleaner', icon: 'sparkles-outline', color: Colors.cleaning },
  { id: '8', name: 'Welder', icon: 'flame-outline', color: Colors.welding },
];

export default function HomeScreen({ navigation }: any) {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  
  // Handle Android back button
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (navigation.canGoBack()) {
          navigation.goBack();
          return true;
        }
        return false;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [navigation])
  );
  
  const profileImageUri = user?.profileImage || `https://i.pravatar.cc/150?img=${user?.id || '1'}`;

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigation.navigate('ServiceSelection', { searchQuery });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.primary} />
      
      {/* Header - Bold Green Brand */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <Text style={styles.brandName}>WiraSasa</Text>
            <Text style={styles.greeting}>Find skilled workers nearby</Text>
          </View>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Profile')}
            style={styles.avatarButton}
            activeOpacity={0.7}
          >
            <Image source={{ uri: profileImageUri }} style={styles.avatar} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={[
          styles.searchContainer,
          searchFocused && styles.searchContainerFocused
        ]}>
          <Ionicons 
            name="search-outline" 
            size={22} 
            color={searchFocused ? Colors.primary : Colors.white} 
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a service..."
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              onPress={() => setSearchQuery('')}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="close-circle" size={20} color={Colors.textTertiary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Services Section - Main Focus */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>What do you need?</Text>
          </View>

          {filteredServices.length > 0 ? (
            <View style={styles.servicesGrid}>
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  name={service.name}
                  icon={service.icon}
                  color={service.color}
                  onPress={() =>
                    navigation.navigate('ServiceSelection', { service: service.name })
                  }
                />
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <View style={styles.emptyStateIcon}>
                <Ionicons name="search-outline" size={48} color={Colors.textTertiary} />
              </View>
              <Text style={styles.emptyStateTitle}>No services found</Text>
              <Text style={styles.emptyStateText}>
                Try searching for something else
              </Text>
            </View>
          )}
        </View>

        {/* Quick Stats */}
        <View style={styles.section}>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: Colors.primarySoft }]}>
                <Ionicons name="calendar-outline" size={24} color={Colors.primary} />
              </View>
              <Text style={styles.statValue}>2</Text>
              <Text style={styles.statLabel}>Upcoming</Text>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: Colors.successLight }]}>
                <Ionicons name="checkmark-circle-outline" size={24} color={Colors.success} />
              </View>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: Colors.warningLight }]}>
                <Ionicons name="star-outline" size={24} color={Colors.warning} />
              </View>
              <Text style={styles.statValue}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
        </View>

        {/* Why Choose Us */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why WiraSasa?</Text>
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: Colors.primarySoft }]}>
                <Ionicons name="shield-checkmark" size={24} color={Colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.featureTitle}>Verified Professionals</Text>
                <Text style={styles.featureText}>ID & skill verified providers</Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: Colors.successLight }]}>
                <Ionicons name="flash" size={24} color={Colors.success} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.featureTitle}>Fast Response</Text>
                <Text style={styles.featureText}>Average arrival under 15 min</Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: Colors.secondarySoft }]}>
                <Ionicons name="lock-closed" size={24} color={Colors.secondary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.featureTitle}>Secure Payments</Text>
                <Text style={styles.featureText}>M-Pesa & card protected</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom padding for tab bar */}
        <View style={{ height: Platform.OS === 'ios' ? 100 : 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingTop: 10,
  },
  
  // Header Styles - Bold Green Brand
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
  },
  headerLeft: {
    flex: 1,
  },
  brandName: {
    ...Typography.h1,
    color: Colors.white,
    fontWeight: '700',
    marginBottom: Spacing.xxs,
  },
  greeting: {
    ...Typography.body,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  userName: {
    ...Typography.h2,
    color: Colors.white,
  },
  avatarButton: {
    position: 'relative',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: BorderRadius.full,
    borderWidth: 3,
    borderColor: Colors.white,
  },
  notificationDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.error,
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  
  // Search Styles - Updated for Green Header
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.base,
    height: 54,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    gap: Spacing.sm,
  },
  searchContainerFocused: {
    backgroundColor: Colors.white,
    borderColor: Colors.white,
  },
  searchInput: {
    flex: 1,
    ...Typography.body,
    color: Colors.text,
    paddingVertical: 0,
  },
  
  // Scroll View
  scrollView: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },
  
  // Section Styles
  section: {
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.lg,
  },
  sectionHeader: {
    marginBottom: Spacing.base,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.text,
    fontWeight: '600',
  },
  sectionSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  seeAllText: {
    ...Typography.captionBold,
    color: Colors.primary,
  },
  
  // Stats Cards
  statsContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  statValue: {
    ...Typography.h3,
    color: Colors.text,
    fontWeight: '700',
    marginBottom: Spacing.xxs,
  },
  statLabel: {
    ...Typography.small,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  
  // Services Grid
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: Spacing.xs,
  },
  
  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xxxl,
  },
  emptyStateIcon: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  emptyStateTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  emptyStateText: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  
  // Features
  featuresContainer: {
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: Spacing.base,
    borderRadius: BorderRadius.md,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureTitle: {
    ...Typography.captionBold,
    color: Colors.text,
    marginBottom: 2,
  },
  featureText: {
    ...Typography.small,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
});

