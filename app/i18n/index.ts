import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './en.json';
import hi from './hi.json';

i18n.use(initReactI18next).init({
    lng: Localization.getLocales()[0]?.languageCode || 'en',
    fallbackLng: 'en',
  resources: {
    en: { translation: en },
    hi: { translation: hi }
  },
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
