import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '../theme';
import RiskGauge from '../components/RiskGauge';
import { MOCK_USAGE_DATA } from '../data/constants';
import { getRiskLevel, formatTime } from '../utils/calculations';

const RiskScoreScreen = () => {
  const riskInfo = getRiskLevel(MOCK_USAGE_DATA.riskScore);

  const riskFactors = [
    { label: 'Günlük Ekran Süresi', value: formatTime(MOCK_USAGE_DATA.totalDaily), impact: 'Yüksek', score: 28 },
    { label: 'Günlük El Alma Sayısı', value: `${MOCK_USAGE_DATA.avgPickups} kez`, impact: 'Orta', score: 15 },
    { label: 'Gece Kullanımı', value: '2 sa 15 dk', impact: 'Yüksek', score: 12 },
    { label: 'Uygulama Çeşitliliği', value: '8 uygulama', impact: 'Düşük', score: 7 },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Risk Analizi</Text>
        <Text style={styles.subtitle}>Dijital alışkanlıklarının detaylı değerlendirmesi</Text>
      </View>

      <View style={styles.gaugeCard}>
        <RiskGauge score={MOCK_USAGE_DATA.riskScore} size={180} />
        <View style={[styles.levelBadge, { backgroundColor: riskInfo.color + '20' }]}>
          <Text style={[styles.levelText, { color: riskInfo.color }]}>{riskInfo.label}</Text>
        </View>
        <Text style={styles.scoreDescription}>
          {MOCK_USAGE_DATA.riskScore <= 25
            ? 'Dijital dengen iyi durumda. Bilinçli kullanımına devam et!'
            : MOCK_USAGE_DATA.riskScore <= 50
            ? 'Dikkatli olman gereken bir dönemdesin. Küçük değişiklikler büyük fark yaratabilir.'
            : MOCK_USAGE_DATA.riskScore <= 75
            ? 'Dijital alışkanlıklarını gözden geçirmen gerekiyor. Destek almayı düşünebilirsin.'
            : 'Acil müdahale gerekiyor. Lütfen profesyonel destek al.'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Risk Faktörleri</Text>
        {riskFactors.map((factor, index) => (
          <View key={index} style={styles.factorCard}>
            <View style={styles.factorHeader}>
              <Text style={styles.factorLabel}>{factor.label}</Text>
              <View style={[styles.impactBadge, {
                backgroundColor: factor.impact === 'Yüksek' ? Colors.riskHighBg : factor.impact === 'Orta' ? Colors.riskMediumBg : Colors.riskLowBg
              }]}>
                <Text style={[styles.impactText, {
                  color: factor.impact === 'Yüksek' ? Colors.riskHigh : factor.impact === 'Orta' ? Colors.riskMedium : Colors.riskLow
                }]}>{factor.impact}</Text>
              </View>
            </View>
            <Text style={styles.factorValue}>{factor.value}</Text>
            <View style={styles.factorBar}>
              <View style={[styles.factorBarFill, {
                width: `${factor.score}%`,
                backgroundColor: factor.impact === 'Yüksek' ? Colors.riskHigh : factor.impact === 'Orta' ? Colors.riskMedium : Colors.riskLow
              }]} />
            </View>
          </View>
        ))}
      </View>

      <View style={styles.tipCard}>
        <Text style={styles.tipEmoji}>💡</Text>
        <Text style={styles.tipTitle}>Öneri</Text>
        <Text style={styles.tipText}>
          Haftada en az bir gün dijital detoks yapmayı dene. Telefonunu 24 saatliğine kapatmak, zihnini dinlendirecek ve gerçek dünyayla bağlantını güçlendirecektir.
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
  gaugeCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginHorizontal: Spacing.lg,
    alignItems: 'center',
    ...Shadow.md,
  },
  levelBadge: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    marginTop: Spacing.md,
  },
  levelText: {
    fontSize: FontSize.md,
    fontWeight: '700',
  },
  scoreDescription: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.sm,
    lineHeight: 20,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  factorCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadow.sm,
  },
  factorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  factorLabel: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  impactBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  impactText: {
    fontSize: FontSize.xs,
    fontWeight: '700',
  },
  factorValue: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  factorBar: {
    height: 4,
    backgroundColor: Colors.surface,
    borderRadius: 2,
    marginTop: Spacing.sm,
    overflow: 'hidden',
  },
  factorBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  tipCard: {
    backgroundColor: Colors.primaryFaded,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  tipEmoji: {
    fontSize: 24,
  },
  tipTitle: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  tipText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    flex: 1,
    marginTop: 2,
  },
});

export default RiskScoreScreen;
