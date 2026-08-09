export const USAGE_THRESHOLDS = {
  low: { max: 120, label: 'Düşük', color: '#34D399' },
  moderate: { max: 240, label: 'Orta', color: '#FBBF24' },
  high: { max: 360, label: 'Yüksek', color: '#F97316' },
  critical: { max: Infinity, label: 'Kritik', color: '#EF4444' },
};

export const INTERVENTION_PROTOCOL = [
  {
    level: 1,
    name: 'Farkındalık',
    icon: 'leaf',
    description: 'Kullanım desenlerinizi keşfedin ve dijital alışkanlıklarınızın farkına varın.',
    actions: [
      'Günlük ekran süresi bildirimi',
      'Haftalık kullanım raporu',
      'Dijital detoks hatırlatıcıları',
    ],
    aiPrompt: 'Kullanıcıya dijital farkındalık kazandırmak için motive edici bir mesaj oluştur.',
  },
  {
    level: 2,
    name: 'Sınırlama',
    icon: 'clock',
    description: 'Sağlıklı sınırlar belirleyerek dijital tüketiminizi kontrol altına alın.',
    actions: [
      'Uygulama bazlı zaman sınırları',
      'Odak modu (Focus Mode)',
      'Mola hatırlatıcıları (Pomodoro)',
    ],
    aiPrompt: 'Kullanıcıya ekran süresini azaltmak için kişiselleştirilmiş öneriler sun.',
  },
  {
    level: 3,
    name: 'Müdahale',
    icon: 'shield',
    description: 'Profesyonel destek ve yapılandırılmış dijital detoks programı.',
    actions: [
      'AI asistan ile günlük check-in',
      'Yeşilay danışmanlık yönlendirmesi',
      '25 günlük yapılandırılmış detoks',
    ],
    aiPrompt: 'Kullanıcıya profesyonel yardım alması için cesaret verici ve bilgilendirici bir yanıt hazırla.',
  },
  {
    level: 4,
    name: 'Kriz',
    icon: 'alert-triangle',
    description: 'Acil müdahale ve aile destek sistemi devreye girer.',
    actions: [
      'Aile üyelerine anlık bildirim',
      'Psikolog randevu yönlendirmesi',
      '7/24 kriz hattı bilgisi',
    ],
    aiPrompt: 'Krizi yönetmek için sakinleştirici ve yönlendirici bir mesaj hazırla. Acil durum numaralarını paylaş.',
  },
];

export const MOCK_USAGE_DATA = {
  daily: [
    { day: 'Pzt', screenTime: 185, pickups: 42 },
    { day: 'Sal', screenTime: 210, pickups: 38 },
    { day: 'Çar', screenTime: 165, pickups: 35 },
    { day: 'Per', screenTime: 245, pickups: 51 },
    { day: 'Cum', screenTime: 190, pickups: 44 },
    { day: 'Cmt', screenTime: 320, pickups: 67 },
    { day: 'Paz', screenTime: 280, pickups: 58 },
  ],
  apps: [
    { name: 'Sosyal Medya', usage: 145, color: '#4A90D9' },
    { name: 'Video', usage: 98, color: '#7AB5E8' },
    { name: 'Oyun', usage: 67, color: '#60A5FA' },
    { name: 'Mesajlaşma', usage: 89, color: '#93C5FD' },
    { name: 'Diğer', usage: 45, color: '#BFDBFE' },
  ],
  totalDaily: 444,
  avgPickups: 48,
  riskScore: 62,
};

export const MOCK_FAMILY_MEMBERS = [
  {
    id: '1',
    name: 'Ayşe Yılmaz',
    role: 'Anne',
    riskScore: 35,
    status: 'stable',
    avatar: null,
  },
  {
    id: '2',
    name: 'Mehmet Yılmaz',
    role: 'Baba',
    riskScore: 28,
    status: 'stable',
    avatar: null,
  },
  {
    id: '3',
    name: 'Zeynep Yılmaz',
    role: 'Kardeş',
    riskScore: 72,
    status: 'warning',
    avatar: null,
  },
];
