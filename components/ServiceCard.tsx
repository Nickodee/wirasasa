import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '../constants/Theme';

interface ServiceCardProps {
  name: string;
  icon: string;
  color: string;
  onPress: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ name, icon, color, onPress }) => {
  const [scaleValue] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 8,
    }).start();
  };

  return (
    <Animated.View style={[styles.cardWrapper, { transform: [{ scale: scaleValue }] }]}>
      <TouchableOpacity
        style={styles.card}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <View style={[styles.iconContainer, { backgroundColor: color + '12' }]}>
          <Ionicons name={icon as any} size={32} color={color} />
        </View>
        <Text style={styles.name} numberOfLines={2}>{name}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    width: '31%',
    marginBottom: Spacing.md,
    marginRight: Spacing.xs,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    paddingBottom: Spacing.md,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.borderLight,
    overflow: 'hidden',
    minHeight: 110,
    justifyContent: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  name: {
    ...Typography.captionBold,
    color: Colors.text,
    textAlign: 'center',
    fontSize: 13,
  },
});

