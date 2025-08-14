import * as Updates from 'expo-updates';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { I18nManager } from 'react-native';
import i18n from '../app/i18n';
import secureStore from '../storage/secureStore';

const LocaleContext = createContext();
const LOCALE_KEY = 'LOCALE';

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(i18n.language || 'en');

  useEffect(() => {
    (async () => {

      const storedLocale = await secureStore.getItem(LOCALE_KEY);
      const deviceLang = storedLocale ? storedLocale : 'en';

      const isRTL = deviceLang && deviceLang.startsWith('ar');
      i18n.changeLanguage(deviceLang);

      if (I18nManager.isRTL !== isRTL) {
        I18nManager.allowRTL(isRTL);
        I18nManager.forceRTL(isRTL);
        await Updates.reloadAsync();
      }

      setLocale(deviceLang);
    })();
  }, []);

  const changeLocale = async (lang) => {
    const isRTL = lang && lang.startsWith('ar');
    i18n.changeLanguage(lang);
    setLocale(lang);

    console.log('isRtl  Splash ' + I18nManager.isRTL);
    await secureStore.setItem(LOCALE_KEY, lang);
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);
      await Updates.reloadAsync();
    }
  };

  return (
    <LocaleContext.Provider value={{ locale, changeLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);
