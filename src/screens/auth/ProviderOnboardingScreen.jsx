import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/colors';
import CustomButton from '../../components/common/CustomButton';
import CustomInput from '../../components/common/CustomInput';
import { SERVICES } from '../../constants/services';
import { validateRate } from '../../utils/validation';

const ProviderOnboardingScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form data
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [experience, setExperience] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [dailyRate, setDailyRate] = useState('');

  const totalSteps = 4;

  const handleSkillToggle = (skillId) => {
    if (selectedSkills.includes(skillId)) {
      setSelectedSkills(selectedSkills.filter((id) => id !== skillId));
    } else {
      setSelectedSkills([...selectedSkills, skillId]);
    }
  };

  const handleNext = () => {
    // Validate current step
    if (step === 1 && selectedSkills.length === 0) {
      Alert.alert('Error', 'Please select at least one skill');
      return;
    }

    if (step === 2) {
      if (!experience || parseInt(experience) < 0) {
        Alert.alert('Error', 'Please enter valid years of experience');
        return;
      }
    }

    if (step === 3) {
      if (!validateRate(hourlyRate) || !validateRate(dailyRate)) {
        Alert.alert('Error', 'Please enter valid rates');
        return;
      }
    }

    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = async () => {
    setLoading(true);

    try {
      // In a real app, you would upload documents and profile photo
      // For now, we'll just navigate to the app
      
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Alert.alert(
        'Success',
        'Your profile is complete! You can now start receiving job requests.',
        [
          {
            text: 'OK',
            onPress: () => navigation.replace('App'),
          },
        ]
      );
    } catch (err) {
      Alert.alert('Error', 'Failed to complete onboarding. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderProgressBar = () => (
    <View style={{ marginBottom: 24 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}
      >
        {[...Array(totalSteps)].map((_, index) => (
          <View
            key={index}
            style={{
              flex: 1,
              height: 4,
              backgroundColor:
                index < step ? COLORS.primary : COLORS.gray[300],
              marginHorizontal: 2,
              borderRadius: 2,
            }}
          />
        ))}
      </View>
      <Text style={{ fontSize: 14, color: COLORS.gray[600], textAlign: 'center' }}>
        Step {step} of {totalSteps}
      </Text>
    </View>
  );

  const renderStep1 = () => (
    <View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: COLORS.gray[900],
          marginBottom: 8,
        }}
      >
        Select Your Skills
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: COLORS.gray[600],
          marginBottom: 24,
        }}
      >
        Choose the services you can provide
      </Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
        {SERVICES.map((service) => (
          <TouchableOpacity
            key={service.id}
            onPress={() => handleSkillToggle(service.id)}
            style={{
              width: '48%',
              backgroundColor: selectedSkills.includes(service.id)
                ? COLORS.secondary
                : COLORS.white,
              borderWidth: 2,
              borderColor: selectedSkills.includes(service.id)
                ? COLORS.primary
                : COLORS.gray[300],
              borderRadius: 12,
              padding: 16,
              alignItems: 'center',
            }}
          >
            <Icon
              name={service.icon}
              size={32}
              color={selectedSkills.includes(service.id) ? COLORS.primary : COLORS.gray[600]}
            />
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: COLORS.gray[900],
                marginTop: 8,
                textAlign: 'center',
              }}
            >
              {service.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: COLORS.gray[900],
          marginBottom: 8,
        }}
      >
        Experience
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: COLORS.gray[600],
          marginBottom: 24,
        }}
      >
        How many years of experience do you have?
      </Text>

      <CustomInput
        label="Years of Experience"
        value={experience}
        onChangeText={setExperience}
        placeholder="e.g., 5"
        keyboardType="numeric"
      />
    </View>
  );

  const renderStep3 = () => (
    <View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: COLORS.gray[900],
          marginBottom: 8,
        }}
      >
        Set Your Rates
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: COLORS.gray[600],
          marginBottom: 24,
        }}
      >
        How much do you charge for your services?
      </Text>

      <CustomInput
        label="Hourly Rate (KES)"
        value={hourlyRate}
        onChangeText={setHourlyRate}
        placeholder="e.g., 500"
        keyboardType="numeric"
      />

      <CustomInput
        label="Daily Rate (KES)"
        value={dailyRate}
        onChangeText={setDailyRate}
        placeholder="e.g., 3000"
        keyboardType="numeric"
      />
    </View>
  );

  const renderStep4 = () => (
    <View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: COLORS.gray[900],
          marginBottom: 8,
        }}
      >
        Documents & Photo
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: COLORS.gray[600],
          marginBottom: 24,
        }}
      >
        Upload your documents for verification (optional)
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: COLORS.white,
          borderWidth: 2,
          borderColor: COLORS.gray[300],
          borderRadius: 12,
          padding: 20,
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <Icon name="camera" size={48} color={COLORS.gray[400]} />
        <Text style={{ fontSize: 16, color: COLORS.gray[700], marginTop: 8 }}>
          Upload Profile Photo
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: COLORS.white,
          borderWidth: 2,
          borderColor: COLORS.gray[300],
          borderRadius: 12,
          padding: 20,
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <Icon name="document" size={48} color={COLORS.accentBlue} />
        <Text style={{ fontSize: 16, color: COLORS.gray[700], marginTop: 8 }}>
          Upload Certificates (Blue Tick)
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: COLORS.white,
          borderWidth: 2,
          borderColor: COLORS.gray[300],
          borderRadius: 12,
          padding: 20,
          alignItems: 'center',
        }}
      >
        <Icon name="shield-checkmark" size={48} color={COLORS.accent} />
        <Text style={{ fontSize: 16, color: COLORS.gray[700], marginTop: 8 }}>
          Upload Good Conduct (Orange Tick)
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={{
            padding: 24,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.gray[200],
          }}
        >
          {renderProgressBar()}
        </View>

        {/* Content */}
        <ScrollView style={{ flex: 1, padding: 24 }}>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
        </ScrollView>

        {/* Footer Buttons */}
        <View
          style={{
            padding: 24,
            borderTopWidth: 1,
            borderTopColor: COLORS.gray[200],
            flexDirection: 'row',
            gap: 12,
          }}
        >
          {step > 1 && (
            <CustomButton
              title="Back"
              variant="secondary"
              onPress={handleBack}
              style={{ flex: 1 }}
            />
          )}
          <CustomButton
            title={step === totalSteps ? 'Complete Profile' : 'Next'}
            onPress={handleNext}
            loading={loading}
            disabled={loading}
            style={{ flex: step > 1 ? 1 : undefined }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProviderOnboardingScreen;
