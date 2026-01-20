import React, { useState, useCallback } from 'react';
import { View, SafeAreaView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { COLORS } from '../../constants/colors';
import useAuthStore from '../../store/useAuthStore';

const ChatScreen = ({ route, navigation }) => {
  const { provider, service } = route.params;
  const { user } = useAuthStore();
  const [messages, setMessages] = useState([]);

  const onSend = useCallback((newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
    // In a real app, you would send the message to the backend here
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: user?.id || 1,
          name: user?.name || 'You',
        }}
        placeholder="Type a message..."
        alwaysShowSend
        renderUsernameOnMessage
        showAvatarForEveryMessage
        scrollToBottom
        messagesContainerStyle={{
          backgroundColor: COLORS.gray[50],
        }}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;
