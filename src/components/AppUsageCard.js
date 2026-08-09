import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '../theme';
import { formatTime } from '../utils/calculations';

const AppUsageCard = ({ apps = [] }) => {
  const total = apps.reduce((sum, app) => sum + app.usage, 1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uygulama Bazında Kullanım</Text>
      {apps.map((app, index) => (
        <View key={index} style={styles.appRow}>
          <View style={styles.appInfo}>
            <View style={[styles.dot, { backgroundColor: app.color }]} />
            <Text style={styles.appName}>{app.name}</Text>
          </View>
          <View style={styles.usageBarOuter}>
            <View style={[styles.usageBarFill, { width: `${(app.usage / total) * 100}%`, backgroundColor: app.color }]} />
          </View>
          <Text style={styles.usageTime}>{formatTime(app.usage)}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.sm,
    ...Shadow.md,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  appRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  appInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  appName: {
    fontSize: FontSize.sm,
    color: Colors.text,
    fontWeight: '500',
  },
  usageBarOuter: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.surface,
    borderRadius: 3,
    marginHorizontal: Spacing.sm,
    overflow: 'hidden',
  },
  usageBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  usageTime: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: '600',
    width: 50,
    textAlign: 'right',
  },
});

export default AppUsageCard;
