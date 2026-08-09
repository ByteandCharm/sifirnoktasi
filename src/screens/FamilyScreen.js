import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '../theme';
import FamilyMemberCard from '../components/FamilyMemberCard';
import { MOCK_FAMILY_MEMBERS } from '../data/constants';
import { calculateFamilyRiskAverage } from '../utils/calculations';

const FamilyScreen = () => {
  const [members] = useState(MOCK_FAMILY_MEMBERS);
  const familyAverage = calculateFamilyRiskAverage(members);

  const getAverageColor = (avg) => {
    if (avg <= 25) return Colors.riskLow;
    if (avg <= 50) return Colors.riskMedium;
    if (avg <= 75) return Colors.riskHigh;
    return Colors.riskCritical;
  };

  const handleMemberPress = (member) => {
    console.log('Member pressed:', member.name);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Aile Ekosistemi</Text>
        <Text style={styles.subtitle}>Birlikte daha güçlüyüz</Text>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Aile Ortalaması</Text>
        <Text style={[styles.summaryScore, { color: getAverageColor(familyAverage) }]}>{familyAverage}</Text>
        <View style={styles.memberCount}>
          <Text style={styles.memberCountText}>{members.length} aile üyesi bağlı</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Aile Üyeleri</Text>
        {members.map((member) => (
          <FamilyMemberCard key={member.id} member={member} onPress={handleMemberPress} />
        ))}
      </View>

      <View style={styles.inviteCard}>
        <Text style={styles.inviteEmoji}>👨‍👩‍👧‍👦</Text>
        <Text style={styles.inviteTitle}>Aileni Davet Et</Text>
        <Text style={styles.inviteText}>
          Aile üyelerini SıfırNoktası'na davet ederek birbirinizin dijital sağlığını takip edebilirsiniz.
        </Text>
        <TouchableOpacity style={styles.inviteButton}>
          <Text style={styles.inviteButtonText}>Davet Gönder</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.insightsCard}>
        <Text style={styles.insightsTitle}>Aile İçgörüleri</Text>
        <View style={styles.insightItem}>
          <View style={[styles.insightDot, { backgroundColor: Colors.riskLow }]} />
          <View style={styles.insightContent}>
            <Text style={styles.insightLabel}>En Düşük Risk</Text>
            <Text style={styles.insightValue}>Mehmet - 28</Text>
          </View>
        </View>
        <View style={styles.insightItem}>
          <View style={[styles.insightDot, { backgroundColor: Colors.riskHigh }]} />
          <View style={styles.insightContent}>
            <Text style={styles.insightLabel}>En Yüksek Risk</Text>
            <Text style={styles.insightValue}>Zeynep - 72</Text>
          </View>
        </View>
        <View style={styles.insightItem}>
          <View style={[styles.insightDot, { backgroundColor: Colors.primaryLight }]} />
          <View style={styles.insightContent}>
            <Text style={styles.insightLabel}>Toplam Aile Ekran Süresi</Text>
            <Text style={styles.insightValue}>13 sa 42 dk / gün</Text>
          </View>
        </View>
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
  summaryCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginHorizontal: Spacing.lg,
    alignItems: 'center',
    ...Shadow.md,
  },
  summaryLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  summaryScore: {
    fontSize: FontSize.hero,
    fontWeight: '800',
    marginTop: Spacing.xs,
  },
  memberCount: {
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    marginTop: Spacing.sm,
  },
  memberCountText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  section: {
    marginTop: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  inviteCard: {
    backgroundColor: Colors.primaryFaded,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    alignItems: 'center',
  },
  inviteEmoji: {
    fontSize: 36,
  },
  inviteTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
    marginTop: Spacing.sm,
  },
  inviteText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 20,
  },
  inviteButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm + 2,
    borderRadius: BorderRadius.full,
    marginTop: Spacing.md,
  },
  inviteButtonText: {
    color: Colors.textInverse,
    fontSize: FontSize.md,
    fontWeight: '700',
  },
  insightsCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    ...Shadow.sm,
  },
  insightsTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  insightDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  insightContent: {
    flex: 1,
  },
  insightLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  insightValue: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
});

export default FamilyScreen;
