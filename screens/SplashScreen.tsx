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
            <Ionicons name="construct" size={48} color={Colors.white} />
          </View>
        </View>
        <Text style={styles.logo}>
          Wira<Text style={styles.logoAccent}>Sasa</Text>
        </Text>
        <Text style={styles.tagline}>Find skilled professionals near you</Text>
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
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.white + '20',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.white,
  },
  logo: {
    ...Typography.h1,
    fontSize: 42,
    color: Colors.white,
    marginBottom: 8,
  },
  logoAccent: {
    color: Colors.secondary,
  },
  tagline: {
    ...Typography.body,
    color: Colors.white + 'DD',
    fontSize: 16,
  },
});

