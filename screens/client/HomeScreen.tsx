import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { ServiceCard } from '../../components/ServiceCard';
import { Colors, Spacing, Typography } from '../../constants/Theme';

const services = [
  { id: '1', name: 'Electrician', icon: 'flash', color: '#4CAF50' },
  { id: '2', name: 'Plumber', icon: 'construct', color: '#2196F3' },
  { id: '3', name: 'Mechanic', icon: 'car', color: '#FF9800' },
  { id: '4', name: 'Gardener', icon: 'leaf', color: '#4CAF50' },
  { id: '5', name: 'Carpenter', icon: 'hammer', color: '#795548' },
  { id: '6', name: 'Painter', icon: 'brush', color: '#9C27B0' },
  { id: '7', name: 'Cleaner', icon: 'sparkles', color: '#00BCD4' },
  { id: '8', name: 'Welder', icon: 'flame', color: '#F44336' },
];

export default function HomeScreen({ navigation }: any) {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [colorFilter, setColorFilter] = useState<'all' | 'white' | 'blue'>('all');
  
  // Generate profile image URI
  const profileImageUri = user?.profileImage || `https://i.pravatar.cc/150?img=${user?.id || '1'}`;

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesColor = colorFilter === 'all' || 
      (colorFilter === 'white' && service.color === '#FFFFFF') ||
      (colorFilter === 'blue' && service.color === '#2196F3');
    return matchesSearch && matchesColor;
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      // Navigate to service selection with search query
      navigation.navigate('ServiceSelection', { service: query, searchQuery: query });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>
            Wira<Text style={styles.logoAccent}>Sasa</Text>
          </Text>
          <Text style={styles.tagline}>Find skilled professionals near you</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: profileImageUri }}
              style={styles.avatar}
            />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>3</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.question}>What do you need help with?</Text>

          <TouchableOpacity
            style={styles.searchContainer}
            onPress={() => handleSearch(searchQuery)}
          >
            <Ionicons name="search" size={20} color={Colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for services..."
              placeholderTextColor={Colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={() => handleSearch(searchQuery)}
              returnKeyType="search"
            />
          </TouchableOpacity>

          <View style={styles.filterContainer}>
            <Text style={styles.sectionTitle}>Select a Service</Text>
            <View style={styles.filterButtons}>
              <TouchableOpacity
                style={[styles.filterButton, colorFilter === 'all' && styles.filterButtonActive]}
                onPress={() => setColorFilter('all')}
              >
                <Text style={[styles.filterButtonText, colorFilter === 'all' && styles.filterButtonTextActive]}>
                  All
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterButton, colorFilter === 'white' && styles.filterButtonActive]}
                onPress={() => setColorFilter('white')}
              >
                <Ionicons name="color-palette" size={16} color={colorFilter === 'white' ? Colors.white : Colors.textSecondary} />
                <Text style={[styles.filterButtonText, colorFilter === 'white' && styles.filterButtonTextActive]}>
                  White
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterButton, colorFilter === 'blue' && styles.filterButtonActive]}
                onPress={() => setColorFilter('blue')}
              >
                <Ionicons name="color-palette" size={16} color={colorFilter === 'blue' ? Colors.white : Colors.secondary} />
                <Text style={[styles.filterButtonText, colorFilter === 'blue' && styles.filterButtonTextActive]}>
                  Blue
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.servicesGrid}>
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  name={service.name}
                  icon={service.icon}
                  color={service.color}
                  onPress={() =>
                    navigation.navigate('ServiceSelection', { service: service.name })
                  }
                />
              ))
            ) : (
              <View style={styles.noResults}>
                <Ionicons name="search-outline" size={48} color={Colors.textSecondary} />
                <Text style={styles.noResultsText}>No services found</Text>
              </View>
            )}
          </View>
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
    marginTop: 140,
  },
  logo: {
    ...Typography.h1,
    fontSize: 28,
  },
  logoAccent: {
    color: Colors.primary,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  content: {
    padding: Spacing.lg,
  },
  question: {
    ...Typography.h2,
    marginBottom: Spacing.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    ...Typography.body,
    color: Colors.text,
    marginLeft: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: Colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  notificationBadgeText: {
    ...Typography.small,
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 10,
  },
  tagline: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  noResults: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    minHeight: 200,
  },
  noResultsText: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: Spacing.md,
  },
  sectionTitle: {
    ...Typography.h3,
    marginBottom: Spacing.md,
  },
  filterContainer: {
    marginBottom: Spacing.md,
  },
  filterButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.xs,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterButtonText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  filterButtonTextActive: {
    color: Colors.white,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Spacing.xl,
    justifyContent: 'flex-start',
  },
});

