import { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import InputIa from '../components/inputIa';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

const Assistant = () => {
  const [messages, setMessages] = useState([]);

  const updateMessages = (userMessage, assistantMessage) => {
    setMessages(prevMessages => [
      ...prevMessages,
      { id: uuidv4(), sender: 'user', text: userMessage },
      { id: uuidv4(), sender: 'assistant', text: assistantMessage }
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {messages.map((msg) => (
          <View key={msg.id} style={[styles.message, msg.sender === 'user' ? styles.userMessage : styles.assistantMessage]}>
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      <InputIa updateMessages={updateMessages} />
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