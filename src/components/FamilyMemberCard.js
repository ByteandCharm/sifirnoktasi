import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '../theme';

const FamilyMemberCard = ({ member, onPress }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'warning': return Colors.riskHigh;
      case 'danger': return Colors.riskCritical;
      default: return Colors.riskLow;
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress?.(member)} activeOpacity={0.7}>
      <View style={[styles.avatar, { backgroundColor: member.status === 'warning' ? Colors.riskHighBg : Colors.surface }]}>
        <Text style={[styles.avatarText, { color: member.status === 'warning' ? Colors.riskHigh : Colors.primary }]}>
          {getInitials(member.name)}
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{member.name}</Text>
        <Text style={styles.role}>{member.role}</Text>
      </View>
      <View style={[styles.riskBadge, { backgroundColor: getStatusColor(member.status) + '20' }]}>
        <Text style={[styles.riskText, { color: getStatusColor(member.status) }]}>{member.riskScore}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginVertical: 4,
    ...Shadow.sm,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: FontSize.md,
    fontWeight: '700',
  },
  info: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  name: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  role: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  riskBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  riskText: {
    fontSize: FontSize.sm,
    fontWeight: '700',
  },
});

export default FamilyMemberCard;
