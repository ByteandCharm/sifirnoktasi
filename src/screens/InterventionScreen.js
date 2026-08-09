import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Shadow, InterventionLevels } from '../theme';
import InterventionCard from '../components/InterventionCard';
import { MOCK_USAGE_DATA, INTERVENTION_PROTOCOL } from '../data/constants';
import { getInterventionLevel } from '../utils/calculations';

const InterventionScreen = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const currentLevel = getInterventionLevel(MOCK_USAGE_DATA.riskScore);
  const currentLevelData = InterventionLevels[currentLevel];

  const allLevels = Object.entries(InterventionLevels).map(([key, value]) => ({
    ...value,
    level: parseInt(key),
  }));

  const protocolDetails = selectedLevel
    ? INTERVENTION_PROTOCOL.find(p => p.level === selectedLevel)
    : null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Müdahale Protokolü</Text>
        <Text style={styles.subtitle}>Seviyene göre kişiselleştirilmiş müdahale planı</Text>
      </View>

      <View style={[styles.currentLevelCard, { backgroundColor: currentLevelData.bgColor }]}>
        <Text style={styles.currentLevelLabel}>Şu anki seviyen</Text>
        <View style={styles.currentLevelHeader}>
          <Text style={[styles.currentLevelEmoji]}>{currentLevelData.emoji}</Text>
          <View>
            <Text style={[styles.currentLevelTitle, { color: currentLevelData.color }]}>
              Seviye {currentLevel} - {currentLevelData.title}
            </Text>
            <Text style={styles.currentLevelDesc}>{currentLevelData.description}</Text>
          </View>
        </View>
        <View style={[styles.actionBadge, { backgroundColor: currentLevelData.color + '20' }]}>
          <Text style={[styles.actionText, { color: currentLevelData.color }]}>{currentLevelData.action}</Text>
        </View>
      </View>

      <View style={styles.levelsContainer}>
        <Text style={styles.sectionTitle}>Tüm Seviyeler</Text>
        {allLevels.map((level) => (
          <TouchableOpacity key={level.level} onPress={() => setSelectedLevel(selectedLevel === level.level ? null : level.level)}>
            <InterventionCard
              level={level.level}
              title={`Seviye ${level.level}: ${level.title}`}
              description={level.description}
              color={level.color}
              bgColor={level.bgColor}
              emoji={level.emoji}
            />
            {selectedLevel === level.level && protocolDetails && (
              <View style={[styles.protocolDetail, { borderLeftColor: level.color }]}>
                <Text style={styles.protocolDesc}>{protocolDetails.description}</Text>
                <View style={styles.actionList}>
                  {protocolDetails.actions.map((action, i) => (
                    <View key={i} style={styles.actionItem}>
                      <View style={[styles.actionDot, { backgroundColor: level.color }]} />
                      <Text style={styles.actionItemText}>{action}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoIcon}>ℹ️</Text>
        <Text style={styles.infoText}>
          SıfırNoktası, risk seviyene göre otomatik olarak uygun müdahale protokolünü devreye alır.
          Her seviye, bir öncekinin üzerine inşa edilerek kademeli bir iyileşme süreci sunar.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingBottom: Spacing.xxl,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl + 20,
    paddingBottom: Spacing.md,
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
  currentLevelCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginHorizontal: Spacing.lg,
    ...Shadow.md,
  },
  currentLevelLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.sm,
  },
  currentLevelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  currentLevelEmoji: {
    fontSize: 36,
  },
  currentLevelTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  currentLevelDesc: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  actionBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    marginTop: Spacing.md,
    alignSelf: 'flex-start',
  },
  actionText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  levelsContainer: {
    marginTop: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  protocolDetail: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.lg,
    marginTop: -4,
    padding: Spacing.md,
    borderLeftWidth: 3,
    borderRadius: BorderRadius.md,
    ...Shadow.sm,
  },
  protocolDesc: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  actionList: {
    gap: Spacing.sm,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  actionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  actionItemText: {
    fontSize: FontSize.sm,
    color: Colors.text,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: Colors.primaryFaded,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    gap: Spacing.sm,
    alignItems: 'flex-start',
  },
  infoIcon: {
    fontSize: 20,
  },
  infoText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    flex: 1,
  },
});

export default InterventionScreen;
