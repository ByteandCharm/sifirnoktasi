import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius } from '../theme';
import AIAssistant from '../components/AIAssistant';
import { getAIResponse } from '../services/aiService';
import { MOCK_USAGE_DATA } from '../data/constants';
import { getInterventionLevel } from '../utils/calculations';

const AIChatScreen = () => {
  const riskLevel = getInterventionLevel(MOCK_USAGE_DATA.riskScore);

  const handleSendMessage = async (message) => {
    return await getAIResponse(message, riskLevel);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Destek Asistanı</Text>
        <Text style={styles.subtitle}>Dijital dengen için sana rehberlik ediyorum</Text>
        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Çevrimiçi</Text>
        </View>
      </View>
      <AIAssistant onSendMessage={handleSendMessage} riskLevel={riskLevel} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl + 20,
    paddingBottom: Spacing.sm,
  },
  title: {
    fontSize: FontSize.xxxl,
    fontWeight: '700',
    color: Colors.text,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.riskLow,
  },
  statusText: {
    fontSize: FontSize.sm,
    color: Colors.riskLow,
    fontWeight: '600',
  },
});

export default AIChatScreen;
