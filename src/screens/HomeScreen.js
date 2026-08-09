import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '../theme';
import RiskGauge from '../components/RiskGauge';
import UsageChart from '../components/UsageChart';
import AppUsageCard from '../components/AppUsageCard';
import { MOCK_USAGE_DATA } from '../data/constants';
import { formatTime, getRiskLevel } from '../utils/calculations';

const HomeScreen = ({ navigation }) => {
  const riskInfo = getRiskLevel(MOCK_USAGE_DATA.riskScore);
  const todayTotal = MOCK_USAGE_DATA.daily[MOCK_USAGE_DATA.daily.length - 1];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Merhaba 👋</Text>
            <Text style={styles.subGreeting}>Dijital dengen nasıl?</Text>
          </View>
          <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.profileInitials}>KY</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.riskCard}>
          <Text style={styles.riskTitle}>Bağımlılık Risk Skorun</Text>
          <RiskGauge score={MOCK_USAGE_DATA.riskScore} size={160} />
          <View style={[styles.riskStatusBadge, { backgroundColor: riskInfo.color + '20' }]}>
            <Text style={[styles.riskStatusText, { color: riskInfo.color }]}>{riskInfo.label}</Text>
          </View>
          <TouchableOpacity style={[styles.detailButton, { backgroundColor: riskInfo.color }]} onPress={() => navigation.navigate('RiskScore')}>
            <Text style={styles.detailButtonText}>Detaylı Analiz →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: Colors.surface }]}>
            <Text style={styles.statValue}>{formatTime(MOCK_USAGE_DATA.totalDaily)}</Text>
            <Text style={styles.statLabel}>Bugünkü Ekran Süresi</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: Colors.surface }]}>
            <Text style={styles.statValue}>{MOCK_USAGE_DATA.avgPickups}</Text>
            <Text style={styles.statLabel}>(Ortalama) El Alma</Text>
          </View>
        </View>

        <UsageChart data={MOCK_USAGE_DATA.daily} />
        <AppUsageCard apps={MOCK_USAGE_DATA.apps} />

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Hızlı Aksiyonlar</Text>
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Intervention')}>
              <Text style={styles.actionButtonEmoji}>🛡️</Text>
              <Text style={styles.actionButtonLabel}>Müdahale</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('AIChat')}>
              <Text style={styles.actionButtonEmoji}>🤖</Text>
              <Text style={styles.actionButtonLabel}>AI Destek</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Family')}>
              <Text style={styles.actionButtonEmoji}>👨‍👩‍👧‍👦</Text>
              <Text style={styles.actionButtonLabel}>Ailem</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: Spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl + 20,
    paddingBottom: Spacing.md,
  },
  greeting: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.text,
  },
  subGreeting: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primaryFaded,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitials: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.primary,
  },
  riskCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.sm,
    alignItems: 'center',
    ...Shadow.lg,
  },
  riskTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  riskStatusBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    marginTop: Spacing.md,
  },
  riskStatusText: {
    fontSize: FontSize.sm,
    fontWeight: '700',
  },
  detailButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm + 2,
    borderRadius: BorderRadius.full,
    marginTop: Spacing.sm,
  },
  detailButtonText: {
    color: Colors.textInverse,
    fontSize: FontSize.sm,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  statCard: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FontSize.xxl,
    fontWeight: '800',
    color: Colors.text,
  },
  statLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  quickActions: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.md,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  actionButton: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    ...Shadow.sm,
  },
  actionButtonEmoji: {
    fontSize: 28,
    marginBottom: 6,
  },
  actionButtonLabel: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.text,
  },
});

export default HomeScreen;
