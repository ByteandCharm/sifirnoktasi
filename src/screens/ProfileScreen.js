import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '../theme';

const ProfileScreen = () => {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [familySync, setFamilySync] = React.useState(true);

  const menuItems = [
    { icon: '🎯', label: 'Hedeflerim', sublabel: 'Günlük ekran süresi hedefi: 3 saat' },
    { icon: '📊', label: 'Geçmiş Raporlar', sublabel: 'Son 30 günlük kullanım geçmişi' },
    { icon: '🏆', label: 'Başarılarım', sublabel: '5 rozet kazandın' },
    { icon: '🔔', label: 'Bildirim Tercihleri', sublabel: 'Hatırlatıcı ve uyarılar' },
    { icon: '🛡️', label: 'Gizlilik', sublabel: 'Veri paylaşımı ve güvenlik' },
    { icon: '📖', label: 'Yeşilay Rehberi', sublabel: 'Dijital bağımlılık hakkında bilgiler' },
    { icon: '💬', label: 'Geri Bildirim', sublabel: 'Uygulamayı değerlendir' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Profilim</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatarLarge}>
          <Text style={styles.avatarText}>KY</Text>
        </View>
        <Text style={styles.userName}>Kullanıcı Yılmaz</Text>
        <Text style={styles.userEmail}>kullanici@email.com</Text>
        <View style={styles.streakBadge}>
          <Text style={styles.streakText}>🔥 7 günlük seri</Text>
        </View>
      </View>

      <View style={styles.settingsCard}>
        <Text style={styles.settingsTitle}>Ayarlar</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>🔔 Bildirimler</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: Colors.border, true: Colors.primaryLight }}
            thumbColor={notifications ? Colors.primary : Colors.textLight}
          />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>🌙 Karanlık Mod</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: Colors.border, true: Colors.primaryLight }}
            thumbColor={darkMode ? Colors.primary : Colors.textLight}
          />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>👨‍👩‍👧‍👦 Aile Senkronizasyonu</Text>
          <Switch
            value={familySync}
            onValueChange={setFamilySync}
            trackColor={{ false: Colors.border, true: Colors.primaryLight }}
            thumbColor={familySync ? Colors.primary : Colors.textLight}
          />
        </View>
      </View>

      <View style={styles.menuCard}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <View style={styles.menuContent}>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.menuSublabel}>{item.sublabel}</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>SıfırNoktası v1.0.0</Text>
        <Text style={styles.footerText}>Teknofest 2026 - Yeşilay</Text>
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
  profileCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginHorizontal: Spacing.lg,
    alignItems: 'center',
    ...Shadow.md,
  },
  avatarLarge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.primaryFaded,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  avatarText: {
    fontSize: FontSize.xxl,
    fontWeight: '800',
    color: Colors.primary,
  },
  userName: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.text,
  },
  userEmail: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  streakBadge: {
    backgroundColor: Colors.riskMediumBg,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    marginTop: Spacing.sm,
  },
  streakText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.riskMedium,
  },
  settingsCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    ...Shadow.sm,
  },
  settingsTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  settingLabel: {
    fontSize: FontSize.md,
    color: Colors.text,
  },
  menuCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.sm,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    ...Shadow.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm + 2,
    paddingHorizontal: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  menuIcon: {
    fontSize: 22,
    marginRight: Spacing.md,
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  menuSublabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  menuArrow: {
    fontSize: FontSize.xl,
    color: Colors.textLight,
    fontWeight: '300',
  },
  footer: {
    alignItems: 'center',
    marginTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  footerText: {
    fontSize: FontSize.sm,
    color: Colors.textLight,
    marginTop: 2,
  },
});

export default ProfileScreen;
