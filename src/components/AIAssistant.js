import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '../theme';

const AIAssistant = ({ onSendMessage, riskLevel = 1 }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '0', text: 'Merhaba! Ben SıfırNoktası AI asistanınız. Size nasıl yardımcı olabilirim? 😊', sender: 'ai' },
  ]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMsg = { id: Date.now().toString(), text: message.trim(), sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setMessage('');

    if (onSendMessage) {
      const reply = await onSendMessage(message.trim(), riskLevel);
      const aiMsg = { id: (Date.now() + 1).toString(), text: reply, sender: 'ai' };
      setMessages(prev => [...prev, aiMsg]);
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageBubble, item.sender === 'ai' ? styles.aiBubble : styles.userBubble]}>
      <Text style={[styles.messageText, item.sender === 'ai' ? styles.aiText : styles.userText]}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.messagesContainer}>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesList}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Mesajınızı yazın..."
          placeholderTextColor={Colors.textLight}
          multiline
          maxLength={500}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend} activeOpacity={0.7}>
          <Text style={styles.sendText}>Gönder</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    margin: Spacing.lg,
    ...Shadow.md,
  },
  messagesContainer: {
    flex: 1,
    padding: Spacing.md,
  },
  messagesList: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    marginVertical: 4,
  },
  aiBubble: {
    backgroundColor: Colors.surface,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: Colors.primary,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: FontSize.sm,
    lineHeight: 20,
  },
  aiText: {
    color: Colors.text,
  },
  userText: {
    color: Colors.textInverse,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    maxHeight: 80,
    fontSize: FontSize.sm,
    color: Colors.text,
  },
  sendButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginLeft: Spacing.sm,
  },
  sendText: {
    color: Colors.textInverse,
    fontSize: FontSize.sm,
    fontWeight: '700',
  },
});

export default AIAssistant;
