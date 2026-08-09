import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSize, Shadow } from '../theme';

import HomeScreen from '../screens/HomeScreen';
import RiskScoreScreen from '../screens/RiskScoreScreen';
import InterventionScreen from '../screens/InterventionScreen';
import AIChatScreen from '../screens/AIChatScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabIcon = ({ label, focused }) => {
  const icons = {
    'Ana Sayfa': '🏠',
    'Risk Skoru': '📊',
    'Müdahale': '🛡️',
    'AI Destek': '🤖',
    'Profilim': '👤',
  };

  return (
    <View style={styles.tabIconContainer}>
      <Text style={[styles.tabIcon, focused && styles.tabIconFocused]}>
        {icons[label] || '📱'}
      </Text>
    </View>
  );
};

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textLight,
        tabBarLabelStyle: styles.tabLabel,
        tabBarShowLabel: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Ana Sayfa',
          tabBarIcon: ({ focused }) => <TabIcon label="Ana Sayfa" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="RiskScore"
        component={RiskScoreScreen}
        options={{
          tabBarLabel: 'Risk Skoru',
          tabBarIcon: ({ focused }) => <TabIcon label="Risk Skoru" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Intervention"
        component={InterventionScreen}
        options={{
          tabBarLabel: 'Müdahale',
          tabBarIcon: ({ focused }) => <TabIcon label="Müdahale" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="AIChat"
        component={AIChatScreen}
        options={{
          tabBarLabel: 'AI Destek',
          tabBarIcon: ({ focused }) => <TabIcon label="AI Destek" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profilim',
          tabBarIcon: ({ focused }) => <TabIcon label="Profilim" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.white,
    borderTopWidth: 0,
    height: 70,
    paddingTop: 6,
    paddingBottom: 12,
    ...Shadow.lg,
  },
  tabLabel: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    marginTop: -2,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 22,
    opacity: 0.5,
  },
  tabIconFocused: {
    opacity: 1,
  },
});

export default AppNavigator;
