import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '../theme';

const RiskGauge = ({ score, size = 200, showLabel = true }) => {
  const getLevel = (s) => {
    if (s <= 25) return { label: 'Düşük Risk', color: Colors.riskLow, bg: Colors.riskLowBg };
    if (s <= 50) return { label: 'Orta Risk', color: Colors.riskMedium, bg: Colors.riskMediumBg };
    if (s <= 75) return { label: 'Yüksek Risk', color: Colors.riskHigh, bg: Colors.riskHighBg };
    return { label: 'Kritik Risk', color: Colors.riskCritical, bg: Colors.riskCriticalBg };
  };

  const level = getLevel(score);
  const radius = (size - 40) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const strokeWidth = size * 0.08;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={[styles.gaugeOuter, { width: size, height: size, borderRadius: size / 2, backgroundColor: Colors.surface, borderColor: Colors.border }]}>
        <View style={[styles.gaugeInner, { width: size - strokeWidth * 2, height: size - strokeWidth * 2, borderRadius: (size - strokeWidth * 2) / 2, backgroundColor: level.bg }]}>
          <Text style={[styles.score, { color: level.color, fontSize: size * 0.18 }]}>{score}</Text>
          {showLabel && <Text style={[styles.label, { color: level.color }]}>{level.label}</Text>}
        </View>
      </View>
      <View style={[styles.arcSegment, {
        width: size - 8,
        height: size - 8,
        borderRadius: (size - 8) / 2,
        borderWidth: strokeWidth,
        borderColor: level.color,
        opacity: 0.6,
      }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  gaugeOuter: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  gaugeInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: {
    fontWeight: '800',
    fontFamily: 'System',
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    marginTop: 2,
  },
  arcSegment: {
    position: 'absolute',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    transform: [{ rotate: '-135deg' }],
  },
});

export default RiskGauge;
