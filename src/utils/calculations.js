export const calculateRiskScore = (dailyUsage, pickups, appVariety, nightUsage) => {
  const usageScore = Math.min(dailyUsage / 4, 30);
  const pickupScore = Math.min(pickups * 0.4, 20);
  const varietyScore = Math.min(appVariety * 5, 20);
  const nightScore = Math.min(nightUsage / 6, 30);

  return Math.min(Math.round(usageScore + pickupScore + varietyScore + nightScore), 100);
};

export const getRiskLevel = (score) => {
  if (score <= 25) return { level: 1, label: 'Düşük Risk', color: '#34D399' };
  if (score <= 50) return { level: 2, label: 'Orta Risk', color: '#FBBF24' };
  if (score <= 75) return { level: 3, label: 'Yüksek Risk', color: '#F97316' };
  return { level: 4, label: 'Kritik Risk', color: '#EF4444' };
};

export const getInterventionLevel = (score) => {
  if (score <= 25) return 1;
  if (score <= 50) return 2;
  if (score <= 75) return 3;
  return 4;
};

export const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins} dk`;
  if (mins === 0) return `${hours} sa`;
  return `${hours} sa ${mins} dk`;
};

export const getStreakAdvice = (currentStreak) => {
  if (currentStreak === 0) return 'İlk hedefini belirle!';
  if (currentStreak < 3) return 'İyi gidiyorsun, devam et!';
  if (currentStreak < 7) return 'Alışkanlık oluşuyor, harikasın!';
  if (currentStreak < 21) return 'Disiplinli bir kullanıcısın!';
  return 'Dijital denge konusunda uzmansın!';
};

export const calculateFamilyRiskAverage = (members) => {
  if (!members || members.length === 0) return 0;
  const total = members.reduce((sum, m) => sum + m.riskScore, 0);
  return Math.round(total / members.length);
};
