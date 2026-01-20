import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { COLORS } from '../../constants/colors';
import CustomButton from '../../components/common/CustomButton';
import CustomInput from '../../components/common/CustomInput';
import { validateRate } from '../../utils/validation';
import { createInvoice } from '../../api/payments.api';

const AssessmentScreen = ({ route, navigation }) => {
  const { jobId } = route.params;
  const [assessment, setAssessment] = useState('');
  const [laborCost, setLaborCost] = useState('');
  const [materials, setMaterials] = useState([
    { name: '', quantity: '', unitPrice: '' },
  ]);
  const [duration, setDuration] = useState('1 hour');
  const [loading, setLoading] = useState(false);

  const addMaterial = () => {
    setMaterials([...materials, { name: '', quantity: '', unitPrice: '' }]);
  };

  const removeMaterial = (index) => {
    const newMaterials = materials.filter((_, i) => i !== index);
    setMaterials(newMaterials);
  };

  const updateMaterial = (index, field, value) => {
    const newMaterials = [...materials];
    newMaterials[index][field] = value;
    setMaterials(newMaterials);
  };

  const calculateTotal = () => {
    const labor = parseFloat(laborCost) || 0;
    const materialsTotal = materials.reduce((sum, material) => {
      const qty = parseFloat(material.quantity) || 0;
      const price = parseFloat(material.unitPrice) || 0;
      return sum + qty * price;
    }, 0);
    return labor + materialsTotal;
  };

  const handleSubmit = async () => {
    if (!assessment) {
      Alert.alert('Error', 'Please enter problem assessment');
      return;
    }

    if (!validateRate(laborCost)) {
      Alert.alert('Error', 'Please enter valid labor cost');
      return;
    }

    setLoading(true);

    try {
      const invoiceData = {
        assessment,
        laborCost: parseFloat(laborCost),
        materials: materials.filter((m) => m.name && m.quantity && m.unitPrice),
        duration,
        total: calculateTotal(),
      };

      await createInvoice(jobId, invoiceData);
      
      Alert.alert(
        'Success',
        'Invoice sent to client for approval',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to send invoice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView style={{ flex: 1, padding: 24 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: COLORS.gray[900],
            marginBottom: 8,
          }}
        >
          Job Assessment
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: COLORS.gray[600],
            marginBottom: 24,
          }}
        >
          Fill in the details before starting work
        </Text>

        {/* Problem Assessment */}
        <CustomInput
          label="Problem Assessment"
          value={assessment}
          onChangeText={setAssessment}
          placeholder="Describe the problem and what needs to be done..."
          multiline
          numberOfLines={4}
        />

        {/* Labor Cost */}
        <CustomInput
          label="Labor Cost (KES)"
          value={laborCost}
          onChangeText={setLaborCost}
          placeholder="e.g., 2500"
          keyboardType="numeric"
        />

        {/* Materials */}
        <View style={{ marginBottom: 16 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: COLORS.gray[900],
              marginBottom: 12,
            }}
          >
            Materials Needed
          </Text>

          {materials.map((material, index) => (
            <View
              key={index}
              style={{
                backgroundColor: COLORS.gray[50],
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 12,
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: '600' }}>
                  Material {index + 1}
                </Text>
                {materials.length > 1 && (
                  <TouchableOpacity onPress={() => removeMaterial(index)}>
                    <Text style={{ color: COLORS.error, fontWeight: '600' }}>
                      Remove
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              <CustomInput
                label="Name"
                value={material.name}
                onChangeText={(value) => updateMaterial(index, 'name', value)}
                placeholder="e.g., Wire, Pipe, etc."
                style={{ marginBottom: 8 }}
              />

              <View style={{ flexDirection: 'row', gap: 12 }}>
                <View style={{ flex: 1 }}>
                  <CustomInput
                    label="Quantity"
                    value={material.quantity}
                    onChangeText={(value) => updateMaterial(index, 'quantity', value)}
                    placeholder="0"
                    keyboardType="numeric"
                    style={{ marginBottom: 0 }}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <CustomInput
                    label="Unit Price (KES)"
                    value={material.unitPrice}
                    onChangeText={(value) => updateMaterial(index, 'unitPrice', value)}
                    placeholder="0"
                    keyboardType="numeric"
                    style={{ marginBottom: 0 }}
                  />
                </View>
              </View>
            </View>
          ))}

          <TouchableOpacity
            onPress={addMaterial}
            style={{
              borderWidth: 2,
              borderColor: COLORS.primary,
              borderStyle: 'dashed',
              borderRadius: 12,
              padding: 16,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: COLORS.primary,
              }}
            >
              + Add Material
            </Text>
          </TouchableOpacity>
        </View>

        {/* Estimated Duration */}
        <View style={{ marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: COLORS.gray[900],
              marginBottom: 12,
            }}
          >
            Estimated Duration
          </Text>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {['30 mins', '1 hour', '2 hours', '3 hours', '4+ hours'].map((dur) => (
              <TouchableOpacity
                key={dur}
                onPress={() => setDuration(dur)}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderRadius: 8,
                  borderWidth: 2,
                  borderColor: duration === dur ? COLORS.primary : COLORS.gray[300],
                  backgroundColor: duration === dur ? COLORS.secondary : COLORS.white,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: duration === dur ? COLORS.primary : COLORS.gray[700],
                  }}
                >
                  {dur}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Total Estimate */}
        <View
          style={{
            backgroundColor: COLORS.secondary,
            borderRadius: 12,
            padding: 20,
            marginBottom: 24,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: COLORS.gray[900],
              }}
            >
              Total Estimate
            </Text>
            <Text
              style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: COLORS.primary,
              }}
            >
              KES {calculateTotal().toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Submit Button */}
        <CustomButton
          title="Send Invoice to Client"
          onPress={handleSubmit}
          loading={loading}
          disabled={loading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AssessmentScreen;
