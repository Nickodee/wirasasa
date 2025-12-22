import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../constants/Theme';

interface ServiceCardProps {
  name: string;
  icon: string;
  color: string;
  onPress: () => void;
}

const getGradientColor = (baseColor: string) => {
  const colorMap: { [key: string]: string } = {
    '#4CAF50': '#66BB6A',
    '#2196F3': '#42A5F5',
    '#FF9800': '#FFA726',
  };
  return colorMap[baseColor] || baseColor;
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ name, icon, color, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: color + '15' }]}>
        <View style={[styles.iconCircle, { backgroundColor: color }]}>
          <Ionicons name={icon as any} size={28} color={Colors.white} />
        </View>
      </View>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '30%',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    margin: Spacing.xs,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconContainer: {
    marginBottom: Spacing.sm,
    borderRadius: 16,
    padding: Spacing.sm,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 12,
  },
});

