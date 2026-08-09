export const Colors = {
  primary: '#4A90D9',
  primaryLight: '#7AB5E8',
  primaryDark: '#2E6DB4',
  primaryFaded: '#E8F4FD',

  background: '#FFFFFF',
  surface: '#F5F9FF',
  surfaceAlt: '#EBF3FA',

  text: '#1A1A2E',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  textInverse: '#FFFFFF',

  accent: '#60A5FA',
  accentLight: '#93C5FD',

  border: '#E2E8F0',
  borderLight: '#F0F4F8',
  divider: '#E5E7EB',

  riskLow: '#34D399',
  riskLowBg: '#D1FAE5',
  riskMedium: '#FBBF24',
  riskMediumBg: '#FEF3C7',
  riskHigh: '#F97316',
  riskHighBg: '#FFEDD5',
  riskCritical: '#EF4444',
  riskCriticalBg: '#FEE2E2',

  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  white: '#FFFFFF',
  black: '#000000',
  shadow: 'rgba(0, 0, 0, 0.08)',
  overlay: 'rgba(0, 0, 0, 0.5)',
  ripple: 'rgba(74, 144, 217, 0.15)',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const FontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  title: 28,
  hero: 36,
};

export const BorderRadius = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};

export const Shadow = {
  sm: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 8,
  },
};

export const InterventionLevels = {
  1: {
    title: 'Farkındalık',
    description: 'Kullanım alışkanlıklarınızı gözden geçirme zamanı',
    color: Colors.riskLow,
    bgColor: Colors.riskLowBg,
    emoji: '🌱',
    action: 'Günlük bildirimlerle farkındalık kazanın',
  },
  2: {
    title: 'Sınırlama',
    description: 'Ekran sürenizi yönetmeye başlayın',
    color: Colors.riskMedium,
    bgColor: Colors.riskMediumBg,
    emoji: '⚖️',
    action: 'Uygulama sınırları ve molalar belirleyin',
  },
  3: {
    title: 'Müdahale',
    description: 'Profesyonel destek alma zamanı',
    color: Colors.riskHigh,
    bgColor: Colors.riskHighBg,
    emoji: '🛡️',
    action: 'AI asistan ve Yeşilay uzmanlarına yönlendirme',
  },
  4: {
    title: 'Kriz',
    description: 'Acil destek gerekiyor',
    color: Colors.riskCritical,
    bgColor: Colors.riskCriticalBg,
    emoji: '🚨',
    action: 'Aile bildirimi ve profesyonel psikolojik destek',
  },
};

export const AppStrings = {
  appName: 'SıfırNoktası',
  tagline: 'Dijital Bağımlılığa Karşı Bilinçli Adım',
  welcome: 'Hoş Geldiniz',
  riskScore: 'Bağımlılık Risk Skoru',
  dailyUsage: 'Günlük Kullanım',
  intervention: 'Müdahale Protokolü',
  aiSupport: 'AI Destek',
  family: 'Aile Ekosistemi',
  profile: 'Profilim',
  startJourney: 'Yolculuğa Başla',
  checkRisk: 'Riskini Kontrol Et',
  getHelp: 'Destek Al',
  connectFamily: 'Aileni Bağla',
  safeZone: 'Güvendeyiz',
  warningZone: 'Dikkat',
  dangerZone: 'Tehlikeli',
};
