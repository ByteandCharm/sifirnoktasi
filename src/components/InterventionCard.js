import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '../theme';

const InterventionCard = ({ level, title, description, color, bgColor, emoji, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: bgColor || Colors.surface, borderLeftColor: color || Colors.primary }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={styles.levelBadge}>Seviye {level}</Text>
        <Text style={styles.emoji}>{emoji || '🎯'}</Text>
      </View>
      <Text style={[styles.title, { color: color || Colors.primary }]}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { backgroundColor: color || Colors.primary, width: `${level * 25}%` }]} />
      </View>
      <Text style={styles.actionText}>Daha fazla bilgi →</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.xs,
    borderLeftWidth: 4,
    ...Shadow.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  levelBadge: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  emoji: {
    fontSize: FontSize.xl,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    marginBottom: 4,
  },
  description: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: Spacing.sm,
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    marginBottom: Spacing.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  actionText: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: '600',
  },
});

export default InterventionCard;
