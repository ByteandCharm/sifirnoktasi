import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

if (global.ErrorUtils && !global.__sifirnoktasiErrorHandler) {
  global.__sifirnoktasiErrorHandler = true;
  const originalHandler =
    global.ErrorUtils.getGlobalHandler && global.ErrorUtils.getGlobalHandler();
  global.ErrorUtils.setGlobalHandler((error, isFatal) => {
    try {
      const msg = String((error && error.message) || error);
      global.__lastAppError = msg;
      Alert.alert(
        'SıfırNoktası Hata',
        msg + (isFatal ? '\n(Uygulama kapatılacak)' : ''),
        isFatal ? undefined : [{ text: 'Tamam' }]
      );
    } catch (_) {}
    if (originalHandler) {
      originalHandler(error, isFatal);
    }
  });
}

if (!global.__sifirnoktasiCrashCheck) {
  global.__sifirnoktasiCrashCheck = true;
  try {
    const FileSystem = require('expo-file-system');
    const crashPath = FileSystem.documentDirectory + 'sn_crash.txt';
    FileSystem.readAsStringAsync(crashPath)
      .then((text) => {
        if (text && text.length > 0) {
          FileSystem.deleteAsync(crashPath).catch(() => {});
          Alert.alert('Önceki çökme raporu', text.slice(0, 600));
        }
      })
      .catch(() => {});
  } catch (_) {}
}

class ErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    global.__lastAppError = String((error && error.message) || error);
  }

  render() {
    if (this.state.error) {
      return (
        <View style={styles.errorWrap}>
          <Text style={styles.errorTitle}>Bir hata oluştu</Text>
          <Text style={styles.errorText}>
            {String((this.state.error && this.state.error.message) || this.state.error)}
          </Text>
          <TouchableOpacity
            style={styles.errorBtn}
            onPress={() => this.setState({ error: null })}
          >
            <Text style={styles.errorBtnText}>Yeniden Dene</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  errorWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 32,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#16202e',
    marginBottom: 12,
  },
  errorText: {
    fontSize: 14,
    color: '#41536b',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  errorBtn: {
    backgroundColor: '#4a90d9',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 99,
  },
  errorBtnText: {
    color: '#ffffff',
    fontWeight: '700',
  },
});
