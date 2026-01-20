import React from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/colors';
import { formatCurrency } from '../../utils/formatters';
import CustomButton from '../common/CustomButton';

const InvoiceModal = ({ visible, invoice, onClose, onApprove }) => {
  if (!invoice) return null;

  const totalMaterialsCost = invoice.materials?.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  ) || 0;

  const totalCost = (invoice.laborCost || 0) + totalMaterialsCost;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'flex-end',
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.white,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxHeight: '80%',
          }}
        >
          {/* Header */}
          <View
            style={{
              padding: 20,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.gray[200],
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.gray[900],
              }}
            >
              Job Assessment & Invoice
            </Text>
          </View>

          {/* Content */}
          <ScrollView style={{ padding: 20 }}>
            {/* Problem Assessment */}
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: COLORS.gray[900],
                  marginBottom: 8,
                }}
              >
                Problem Assessment
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.gray[700],
                  lineHeight: 20,
                }}
              >
                {invoice.assessment}
              </Text>
            </View>

            {/* Labor Cost */}
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: COLORS.gray[900],
                  marginBottom: 8,
                }}
              >
                Labor Cost
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: COLORS.primary,
                }}
              >
                {formatCurrency(invoice.laborCost)}
              </Text>
            </View>

            {/* Materials */}
            {invoice.materials && invoice.materials.length > 0 && (
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: COLORS.gray[900],
                    marginBottom: 8,
                  }}
                >
                  Materials Needed
                </Text>
                
                {invoice.materials.map((material, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 8,
                      borderBottomWidth: 1,
                      borderBottomColor: COLORS.gray[200],
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: COLORS.gray[900],
                        }}
                      >
                        {material.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: COLORS.gray[600],
                        }}
                      >
                        Qty: {material.quantity} × {formatCurrency(material.unitPrice)}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: COLORS.gray[900],
                      }}
                    >
                      {formatCurrency(material.quantity * material.unitPrice)}
                    </Text>
                  </View>
                ))}
                
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 8,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: COLORS.gray[700],
                    }}
                  >
                    Materials Subtotal:
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: COLORS.gray[900],
                    }}
                  >
                    {formatCurrency(totalMaterialsCost)}
                  </Text>
                </View>
              </View>
            )}

            {/* Estimated Duration */}
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: COLORS.gray[900],
                  marginBottom: 8,
                }}
              >
                Estimated Duration
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.gray[700],
                }}
              >
                {invoice.duration}
              </Text>
            </View>

            {/* Total */}
            <View
              style={{
                backgroundColor: COLORS.secondary,
                padding: 16,
                borderRadius: 12,
                marginBottom: 20,
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
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: COLORS.primary,
                  }}
                >
                  {formatCurrency(totalCost)}
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Actions */}
          <View
            style={{
              padding: 20,
              borderTopWidth: 1,
              borderTopColor: COLORS.gray[200],
              flexDirection: 'row',
              gap: 12,
            }}
          >
            <CustomButton
              title="Cancel"
              variant="secondary"
              onPress={onClose}
              style={{ flex: 1 }}
            />
            <CustomButton
              title="Approve"
              variant="primary"
              onPress={onApprove}
              style={{ flex: 1 }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default InvoiceModal;
