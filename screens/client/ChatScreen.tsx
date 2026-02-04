import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../../constants/Theme';
import { Message } from '../../types';

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: 'provider',
    receiverId: 'client',
    text: 'Hello! I received your service request. I will be there shortly.',
    timestamp: new Date('2024-01-01T08:48:00'),
  },
  {
    id: '2',
    senderId: 'client',
    receiverId: 'provider',
    text: 'Hi',
    timestamp: new Date('2024-01-01T08:49:00'),
  },
  {
    id: '3',
    senderId: 'provider',
    receiverId: 'client',
    text: 'I will take care of that.',
    timestamp: new Date('2024-01-01T08:49:00'),
  },
  {
    id: '4',
    senderId: 'client',
    receiverId: 'provider',
    text: 'Thank you',
    timestamp: new Date('2024-01-01T08:49:00'),
  },
  {
    id: '5',
    senderId: 'provider',
    receiverId: 'client',
    text: 'Got it, thank you!',
    timestamp: new Date('2024-01-01T08:49:00'),
  },
  {
    id: '6',
    senderId: 'client',
    receiverId: 'provider',
    text: 'See you shortly',
    timestamp: new Date('2024-01-01T08:49:00'),
  },
];

export default function ChatScreen({ route, navigation }: any) {
  const { provider } = route.params || {};
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  
  // Hide bottom tab bar when this screen is focused
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: 'none' }
    });
    
    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          position: 'absolute',
          bottom: 30,
          left: 0,
          right: 0,
          borderTopWidth: 1,
          borderTopColor: '#E5E5E5',
          backgroundColor: '#FFFFFF',
          height: Platform.OS === 'ios' ? 88 : 65,
          paddingBottom: Platform.OS === 'ios' ? 28 : 10,
          paddingTop: 8,
          elevation: 0,
          shadowOpacity: 0,
        }
      });
    };
  }, [navigation]);
  
  // Generate profile image URI for provider
  const providerImageUri = provider?.profileImage || `https://i.pravatar.cc/150?img=${provider?.id || '1'}`;

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: 'client',
        receiverId: 'provider',
        text: message,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isClient = item.senderId === 'client';
    return (
      <View
        style={[
          styles.messageContainer,
          isClient ? styles.clientMessage : styles.providerMessage,
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            isClient ? styles.clientBubble : styles.providerBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              isClient ? styles.clientText : styles.providerText,
            ]}
          >
            {item.text}
          </Text>
        </View>
        <Text style={styles.timestamp}>{formatTime(item.timestamp)}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <View style={styles.headerAvatarContainer}>
            <Image
              source={{ uri: providerImageUri }}
              style={styles.headerAvatar}
            />
            <View style={styles.headerStatusDot} />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerName}>{provider?.name || 'Chat'}</Text>
            <Text style={styles.headerStatus}>Active</Text>
          </View>
        </View>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
      />
      
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachButton}>
          <Ionicons name="add-circle-outline" size={28} color={Colors.primary} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor={Colors.textSecondary}
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity style={styles.emojiButton}>
          <Ionicons name="happy-outline" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}
        >
          <Ionicons name="send" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    paddingTop: 60,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerInfo: {
    flex: 1,
    marginLeft: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatarContainer: {
    position: 'relative',
    marginRight: Spacing.sm,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.primary + '30',
  },
  headerStatusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.success,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerName: {
    ...Typography.h3,
  },
  headerStatus: {
    ...Typography.caption,
    color: Colors.primary,
    marginTop: 2,
  },
  messagesList: {
    padding: Spacing.md,
    paddingBottom: 100,
  },
  messageContainer: {
    marginBottom: Spacing.md,
  },
  clientMessage: {
    alignItems: 'flex-end',
  },
  providerMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '75%',
    padding: Spacing.md,
    borderRadius: 16,
    marginBottom: 4,
  },
  clientBubble: {
    backgroundColor: Colors.primary,
  },
  providerBubble: {
    backgroundColor: Colors.surface,
  },
  messageText: {
    ...Typography.body,
  },
  clientText: {
    color: Colors.white,
  },
  providerText: {
    color: Colors.text,
  },
  timestamp: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  attachButton: {
    marginRight: Spacing.xs,
    padding: 4,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 24,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginRight: Spacing.xs,
    maxHeight: 100,
    ...Typography.body,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emojiButton: {
    marginRight: Spacing.xs,
    padding: 4,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

