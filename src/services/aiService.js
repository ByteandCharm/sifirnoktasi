const AI_RESPONSES = {
  greeting: [
    'Merhaba! Ben SıfırNoktası AI asistanınız. Size nasıl yardımcı olabilirim?',
    'Hoş geldiniz! Dijital denge yolculuğunuzda size rehberlik etmek için buradayım.',
  ],
  motivation: [
    'Her küçük adım, büyük değişimlerin başlangıcıdır. Bugün ekran süreni 10 dakika azaltmayı dene!',
    'Dijital detoks bir ceza değil, kendine verdiğin bir hediyedir.',
    'Telefonunu eline her alışında bir sebebin olsun. Bilinçli kullanım özgürlüktür.',
    'Mükemmel olmak zorunda değilsin, sadece daha iyiye doğru adım at.',
  ],
  tips: [
    'Sabah uyanır uyanmaz telefonuna bakma. İlk 30 dakikayı kendine ayır.',
    'Yemek yerken telefonunu başka bir odada bırak.',
    'Sosyal medyada geçireceğin süreyi günlük 30 dakika ile sınırla.',
    'Telefon bildirimlerini kapat, kendin kontrol et.',
    'Yatmadan 1 saat önce telefonu kullanmayı bırak.',
  ],
  warning: [
    'Kullanım desenlerinizde artış gözlemliyorum. Biraz ara vermek ister misiniz?',
    'Son 3 gündür ekran süreniz ortalamanın üzerinde. Bir mola iyi gelebilir.',
  ],
  emergency: [
    'Buradasın ve bu çok önemli. Şu anda zor bir dönemden geçiyor olabilirsin. Unutma, yardım istemek güçlü olmaktır. Aşağıdaki kaynaklar sana destek olabilir:\n\n• Yeşilay Danışma Hattı: 115\n• Psikolojik Destek Hattı: 183\n• Acil Durumlar: 112',
  ],
};

const getRandomResponse = (category) => {
  const responses = AI_RESPONSES[category] || AI_RESPONSES.greeting;
  return responses[Math.floor(Math.random() * responses.length)];
};

export const getAIResponse = async (userMessage, riskLevel) => {
  const msg = userMessage.toLowerCase();

  if (riskLevel >= 4) return getRandomResponse('emergency');

  if (msg.includes('merhaba') || msg.includes('selam') || msg.includes('hey')) {
    return getRandomResponse('greeting');
  }

  if (msg.includes('yardım') || msg.includes('destek') || msg.includes('zor')) {
    if (riskLevel >= 3) {
      return `${getRandomResponse('motivation')}\n\nProfesyonel destek almayı düşünebilirsin. Yeşilay danışma hattı: 115`;
    }
    return getRandomResponse('motivation');
  }

  if (msg.includes('tavsiye') || msg.includes('öneri') || msg.includes('ne yapmalı')) {
    return getRandomResponse('tips');
  }

  if (msg.includes('teşekkür') || msg.includes('sağ ol')) {
    return 'Rica ederim! Her zaman buradayım. Unutma, dijital dengen senin elinde. 💪';
  }

  if (msg.includes('kötü') || msg.includes('üzgün') || msg.includes('stres')) {
    return 'Duygularını anlıyorum. Bazen telefonumuza sığınırız, ama asıl ihtiyacımız olan kendimizle baş başa kalmak. Derin bir nefes al ve şu anın tadını çıkar.';
  }

  if (riskLevel >= 3) {
    return `${getRandomResponse('warning')}\n\n${getRandomResponse('motivation')}`;
  }

  return getRandomResponse('motivation');
};

export const generateDailyReport = (usageData) => {
  const { totalDaily, avgPickups } = usageData;
  const hours = Math.floor(totalDaily / 60);
  const mins = totalDaily % 60;

  let report = `📊 Günlük Raporun\n\n`;
  report += `Ekran Süresi: ${hours} saat ${mins} dakika\n`;
  report += `Telefonu Elinize Alma Sayısı: ${avgPickups}\n\n`;

  if (totalDaily > 240) {
    report += '⚠️ Önerilen günlük kullanım süresini aştınız. Yarın daha bilinçli kullanmayı deneyin.';
  } else if (totalDaily > 120) {
    report += '👍 Ortalama bir gün geçirdiniz. Küçük iyileştirmelerle daha iyi olabilirsiniz.';
  } else {
    report += '🌟 Harika! Dijital dengenizi koruyordunuz. Bu şekilde devam edin!';
  }

  return report;
};
