import * as ReactSplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Platform, StatusBar, Text, View } from 'react-native';
import styles from '../styles/commonStyles';

ReactSplashScreen.preventAutoHideAsync();


export default function SplashScreen({ navigation }) {
  const { t } = useTranslation();

  useEffect(() => {
    const load = async () => {
      try {
        ReactSplashScreen.hideAsync();
      } catch (e) {
        console.warn('Error : ' + e);
      } finally {
        await new Promise(resolve => setTimeout(resolve, 2000));
        navigation.replace('Login');
      }
    };

    load();
  }, []);

  return (
    <View style={styles.containerDark}>
      <StatusBar
        backgroundColor={styles.containerDark.backgroundColor}
        barStyle={Platform.OS === 'android' ? 'light-content' : 'light-content'}
      />

      {/* Logp + App Name */}
      <View style={styles.centerContent}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>{t('app_name')}</Text>
      </View>

      {/* Version */}
      <Text numberOfLines={1} style={styles.version}>
        {t('version')}
      </Text>
    </View>
  );
}
