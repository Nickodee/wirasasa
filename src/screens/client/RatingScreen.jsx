import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/colors';
import CustomButton from '../../components/common/CustomButton';
import CustomInput from '../../components/common/CustomInput';
import { rateJob } from '../../api/jobs.api';

const RatingScreen = ({ route, navigation }) => {
  const { provider, jobId } = route.params;
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert('Error', 'Please select a rating');
      return;
    }

    setLoading(true);

    try {
      await rateJob(jobId, rating, review);
      Alert.alert('Success', 'Thank you for your feedback!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('ClientHome'),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to submit rating. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigation.navigate('ClientHome');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, padding: 24 }}>
        {/* Title */}
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: COLORS.gray[900],
            textAlign: 'center',
            marginBottom: 8,
          }}
        >
          Rate Your Experience
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: COLORS.gray[600],
            textAlign: 'center',
            marginBottom: 32,
          }}
        >
          How was your service with {provider?.name}?
        </Text>

        {/* Provider Info */}
        <View
          style={{
            backgroundColor: COLORS.gray[50],
            borderRadius: 12,
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 32,
          }}
        >
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: COLORS.gray[300],
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 12,
            }}
          >
            <Icon name="person" size={32} color={COLORS.gray[600]} />
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: COLORS.gray[900],
              }}
            >
              {provider?.name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: COLORS.gray[600],
              }}
            >
              {provider?.experience} years experience
            </Text>
          </View>
        </View>

        {/* Star Rating */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 32,
          }}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setRating(star)}
              style={{ marginHorizontal: 8 }}
            >
              <Icon
                name={star <= rating ? 'star' : 'star-outline'}
                size={48}
                color={star <= rating ? '#f59e0b' : COLORS.gray[400]}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Review Text */}
        <CustomInput
          label="Share your experience (optional)"
          value={review}
          onChangeText={setReview}
          placeholder="Write your review here..."
          multiline
          numberOfLines={4}
        />

        {/* Submit Button */}
        <CustomButton
          title="Submit Rating"
          onPress={handleSubmit}
          loading={loading}
          disabled={loading || rating === 0}
          style={{ marginTop: 16 }}
        />

        {/* Skip Button */}
        <TouchableOpacity
          onPress={handleSkip}
          style={{ alignItems: 'center', marginTop: 16 }}
        >
          <Text
            style={{
              fontSize: 16,
              color: COLORS.gray[600],
            }}
          >
            Skip for now
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RatingScreen;
