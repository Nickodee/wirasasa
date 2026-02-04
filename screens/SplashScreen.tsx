import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography } from '../constants/Theme';
import { useAuth } from '../context/AuthContext';

export default function SplashScreen({ navigation }: any) {
  const { user, role } = useAuth();
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Wait a bit for auth state to load
    const readyTimer = setTimeout(() => {
      setIsReady(true);
    }, 1500);

    return () => clearTimeout(readyTimer);
  }, []);

  useEffect(() => {
    if (isReady && navigation) {
      const timer = setTimeout(() => {
        if (user && role) {
          // User is logged in, navigate to appropriate app
          if (role === 'client') {
            navigation.reset({
              index: 0,
              routes: [{ name: 'ClientApp' }],
            });
          } else {
            navigation.reset({
              index: 0,
              routes: [{ name: 'ProviderApp' }],
            });
          }
        } else {
          // User is not logged in, navigate to Login
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isReady, user, role, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="hammer" size={56} color={Colors.white} />
          </View>
        </View>
        <Text style={styles.logo}>
          Wira<Text style={styles.logoAccent}>Sasa</Text>
        </Text>
        <Text style={styles.tagline}>Find skilled workers nearby</Text>
        <Text style={styles.subtitle}>Fast • Verified • Trusted</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 24,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: Colors.white,
  },
  logo: {
    ...Typography.h1,
    fontSize: 48,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 8,
    letterSpacing: -1,
  },
  logoAccent: {
    color: Colors.white,
    fontWeight: '300',
  },
  tagline: {
    ...Typography.body,
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: 18,
    marginBottom: 8,
  },
  subtitle: {
    ...Typography.caption,
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    letterSpacing: 2,
  },
});

