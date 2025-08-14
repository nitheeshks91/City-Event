import * as LocalAuthentication from 'expo-local-authentication';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PrimaryButton from '../components/PrimaryButton';
import TextInputField from '../components/TextInputField';
import { useAuth } from '../contexts/AuthContext';
import { useLocale } from '../contexts/LocaleContext';
import useLoginForm from '../hooks/useLoginForm';
import styles from '../styles/commonStyles';

export default function LoginScreen({ navigation }) {
  const [biometricIcon, setBiometricIcon] = useState(null);
  const { t } = useTranslation();
  const { signIn } = useAuth();
  const { locale, changeLocale } = useLocale();

  const { form, errors, handleChange, handleSubmit } = useLoginForm(async (data) => {
    console.log('Login Data:', data);
    const login = await signIn(data);

    if (login) {
      navigation.replace('Home');
    } else {
      Alert.alert('Invalid credentials');
    }
  });

  useEffect(() => {
    const detectBiometric = async () => {
      const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
      if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
        setBiometricIcon('finger-print-outline');
      } else if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
        setBiometricIcon('scan-outline'); // Face ID style icon
      }
    };

    detectBiometric();
  }, []);

  async function handleBiometric() {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (!hasHardware || !enrolled) {
        Alert.alert('Biometric not available');
        return;
      }
      const res = await LocalAuthentication.authenticateAsync({ promptMessage: t('biometric_prompt') });
      if (res.success) {
        navigation.replace('Home');
      } else {
        Alert.alert('Authentication failed');
      }
    } catch (e) {
      Alert.alert('Biometric error', String(e));
    }
  }

  const switchLocale = async () => {
    if (locale == 'ar') {
      changeLocale('en');
    } else {
      changeLocale('ar');
    }
  };

  const handleRegister = async () => {
    navigation.push('Signup');
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[styles.containerLight, { flexGrow: 1 }]}
      enableOnAndroid
      extraScrollHeight={20} // small push to avoid tight fit
    >
      <View style={[styles.containerLight, { paddingHorizontal: 0, paddingTop: 0 }]}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <Text style={styles.title}>{t('hello_welcome')}</Text>
          <TouchableOpacity onPress={switchLocale}>
            <Text style={styles.text14Underline}>
              {locale == 'ar' ? 'EN' : 'AE'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Spacer */}
        <View style={{ flex: 1 }} />

        {/* Bottom Buttons */}
        <View style={styles.bottomContainer}>
          {/* {biometricIcon != null ? (
            <PrimaryButton title={t(biometricIcon === 'finger-print-outline' ? 'touch_id' : 'face_id')} icon={biometricIcon} onPress={handleBiometric} disabled={false} />
          ) : (
              
            )
          } */}
          <View >
            <TextInputField
              label={t('email')}
              placeholder={t('email_placeholder')}
              value={form.email}
              onChangeText={(text) => handleChange('email', text)}
              error={errors.email}
            />
            <TextInputField
              label={t('password')}
              placeholder={t('password_placeholder')}
              value={form.password}
              secureTextEntry
              onChangeText={(text) => handleChange('password', text)}
              error={errors.password}
            />
            <PrimaryButton style={{ marginTop: 16 }} title={t('login')} onPress={handleSubmit} disabled={false} />

          </View>

          <View style={[styles.separator, { marginVertical: 32 }]} />

          <PrimaryButton title={t(biometricIcon === 'finger-print-outline' ? 'touch_id' : 'face_id')} icon={biometricIcon} onPress={handleBiometric} disabled={false} />

          <View style={[styles.row, { marginTop: 16 }]}>
            <Text>{t('no_account')}</Text>
            <TouchableOpacity onPress={handleRegister} style={styles.tertiaryButton}>
              <Text style={styles.tertiaryTextDark}>{t('signup')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView >
  );
}
