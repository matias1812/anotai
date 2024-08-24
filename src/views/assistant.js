import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import InputIa from '../components/inputIA';

const Assistant = () => {
  const [messages, setMessages] = useState([]);

  const addMessage = (sender, text) => {
    setMessages(prevMessages => [
      ...prevMessages,
      { sender, text }
    ]);
  };

  const addLoadingMessage = (userMessage) => {
    setMessages(prevMessages => [
      ...prevMessages,
      { sender: 'user', text: userMessage },
      { sender: 'assistant', text: '...' }
    ]);
  };

  const updateAssistantMessage = (assistantMessage) => {
    setMessages(prevMessages => {
      const messagesCopy = [...prevMessages];
      const lastMessageIndex = messagesCopy.findIndex(msg => msg.text === '...');
      if (lastMessageIndex !== -1) {
        messagesCopy[lastMessageIndex] = { sender: 'assistant', text: assistantMessage };
      }
      return messagesCopy;
    });
  };

  const updateAudioTranscript = (transcript) => {
    setMessages(prevMessages => {
      const messagesCopy = [...prevMessages];
      const lastMessageIndex = messagesCopy.findIndex(msg => msg.text === 'Audio enviado...');
      if (lastMessageIndex !== -1) {
        messagesCopy[lastMessageIndex] = { sender: 'user', text: transcript || 'Transcripción no disponible' };
      }
      return messagesCopy;
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {messages.map((msg, index) => (
          <View key={index} style={[styles.message, msg.sender === 'user' ? styles.userMessage : styles.assistantMessage]}>
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      <InputIa addMessage={addMessage} addLoadingMessage={addLoadingMessage} updateAssistantMessage={updateAssistantMessage} updateAudioTranscript={updateAudioTranscript} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  message: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1e7dd',
  },
  assistantMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f8d7da',
  },
  messageText: {
    fontSize: 16,
  },
});

export default Assistant;