const NOTIFICATIONS = {
  morning: {
    title: 'Günaydın!',
    body: 'Bugün bilinçli bir dijital kullanım günü olsun. Hedefini belirledin mi?',
    trigger: { hour: 8, minute: 0, repeats: true },
  },
  break: {
    title: 'Mola Zamanı',
    body: 'Uzun süredir ekrana bakıyorsun. 5 dakikalık bir mola ver, gözlerini dinlendir.',
    trigger: { hour: 14, minute: 0, repeats: true },
  },
  evening: {
    title: 'Dijital Detoks',
    body: 'Yatmadan önce telefonunu bırakma zamanı. 1 saat kitap okumaya ne dersin?',
    trigger: { hour: 22, minute: 0, repeats: true },
  },
  streak: {
    title: 'Tebrikler!',
    body: 'Hedefini başarıyla tamamladın! Yarın da devam etmeye ne dersin?',
    trigger: null,
  },
  warning: {
    title: 'Kullanım Uyarısı',
    body: 'Bugünlük hedeflediğin ekran süresini aştın. Dengeyi korumaya özen göster.',
    trigger: null,
  },
};

export const getNotificationsForLevel = (level) => {
  const base = [NOTIFICATIONS.morning, NOTIFICATIONS.evening];

  if (level >= 1) base.push(NOTIFICATIONS.break);
  if (level >= 2) base.push(NOTIFICATIONS.warning);

  return base;
};

export const scheduleNotifications = async (level) => {
  const notifications = getNotificationsForLevel(level);

  for (const notif of notifications) {
    if (notif.trigger) {
      console.log(`[Bildirim Planlandı] ${notif.title}: ${notif.body}`);
    }
  }

  return notifications.length;
};
