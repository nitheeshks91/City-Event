import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { I18nManager, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PrimaryButton from '../components/PrimaryButton';
import TextInputField from '../components/TextInputField';
import { useAuth } from '../contexts/AuthContext';
import useLoginForm from '../hooks/useLoginForm';
import styles from '../styles/commonStyles';

export default function SignupScreen({ navigation }) {
  const { t } = useTranslation();
  const { signUp } = useAuth();

  const { form, errors, handleChange, handleSubmit } = useLoginForm(async (data) => {
    console.log('Login Data:', data);
    await signUp(data);
    navigateBack();
  });

  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[styles.containerLight, { flexGrow: 1 }]}
      enableOnAndroid
      extraScrollHeight={20} // small push to avoid tight fit
    >
      <View style={[styles.containerLight, { paddingHorizontal: 0, paddingTop: 0 }]}>
        {/* Top Bar */}
        <View style={[styles.topBar, { justifyContent: 'flex-start' }]}>
          <TouchableOpacity onPress={navigateBack}>
            <Ionicons style={{
              transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
            }} name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={[styles.title, { marginStart: 32 }]}>{t('signup')}</Text>
        </View>

        <View style={[styles.bottomContainer, { marginTop: 42 }]}>
          <TextInputField
            label={t('email')}
            placeholder={t('email_placeholder')}
            value={form.email}
            onChangeText={(text) => handleChange('email', text)}
            error={errors.email}
          />
          <View style={{ padding: 8 }} />
          <TextInputField
            label={t('password')}
            placeholder={t('password_placeholder')}
            value={form.password}
            secureTextEntry
            onChangeText={(text) => handleChange('password', text)}
            error={errors.password}
          />
        </View>


        <View style={{ flex: 1 }} />

        {/* Bottom Buttons */}
        <View style={styles.bottomContainer}>
          <PrimaryButton style={{ marginTop: 16 }} title={t('signup')} onPress={handleSubmit} disabled={false} />
        </View>

      </View>
    </KeyboardAwareScrollView >
  );
}
