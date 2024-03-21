import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import * as resources from './resources';

// creating a language detection plugin using expo
// http://i18next.com/docs/ownplugin/#languagedetector
const languageDetector = {
  type: 'languageDetector',
  async: true, // flags below detection to be async
  detect: (callback) => callback(getLocales()[0].languageCode),
  init: () => { },
  cacheUserLanguage: () => { },
};

i18n
  // @ts-ignore
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    resources: {
      ...Object.entries(resources).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: {
            translation: value
          }
        }),
        {}
      )
    }
  })