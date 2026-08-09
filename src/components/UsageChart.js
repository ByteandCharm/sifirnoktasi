import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '../theme';

const BAR_MAX_HEIGHT = 120;

const UsageChart = ({ data = [], title = 'Haftalık Ekran Süresi' }) => {
  const maxVal = Math.max(...data.map(d => d.screenTime), 1);
  const screenWidth = Dimensions.get('window').width - Spacing.lg * 2 - Spacing.md * 2;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.chartArea}>
        <View style={styles.barsContainer}>
          {data.map((item, index) => {
            const barHeight = (item.screenTime / maxVal) * BAR_MAX_HEIGHT;
            return (
              <View key={index} style={styles.barWrapper}>
                <Text style={styles.barValue}>{item.screenTime}</Text>
                <View style={[styles.bar, { height: barHeight, backgroundColor: index === data.length - 1 ? Colors.primary : Colors.primaryLight }]} />
                <Text style={styles.barLabel}>{item.day}</Text>
              </View>
            );
          })}
        </View>
      </View>
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.primaryLight }]} />
          <Text style={styles.legendText}>Geçmiş Günler</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.primary }]} />
          <Text style={styles.legendText}>Bugün</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.sm,
    ...Shadow.md,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  chartArea: {
    height: BAR_MAX_HEIGHT + 50,
    justifyContent: 'flex-end',
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: BAR_MAX_HEIGHT + 40,
  },
  barWrapper: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 2,
  },
  barValue: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginBottom: 4,
    fontWeight: '600',
  },
  bar: {
    width: '70%',
    borderRadius: BorderRadius.sm,
    minHeight: 4,
  },
  barLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 6,
    fontWeight: '500',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.sm,
    gap: Spacing.lg,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
});

export default UsageChart;
