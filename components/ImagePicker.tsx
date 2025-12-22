import React from 'react';
import { View, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing } from '../constants/Theme';

interface ImagePickerProps {
  imageUri: string | null;
  onImageSelected: (uri: string) => void;
  size?: number;
}

export const ProfileImagePicker: React.FC<ImagePickerProps> = ({
  imageUri,
  onImageSelected,
  size = 120,
}) => {
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'We need camera roll permissions to select an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      onImageSelected(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity onPress={pickImage} style={styles.container}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]} />
      ) : (
        <View style={[styles.placeholder, { width: size, height: size, borderRadius: size / 2 }]}>
          <Ionicons name="person" size={size / 2} color={Colors.textSecondary} />
        </View>
      )}
      <View style={[styles.editButton, { bottom: size * 0.1, right: size * 0.1 }]}>
        <Ionicons name="camera" size={16} color={Colors.white} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    borderWidth: 4,
    borderColor: Colors.primary + '20',
  },
  placeholder: {
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: Colors.primary + '20',
  },
  editButton: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.white,
  },
});

