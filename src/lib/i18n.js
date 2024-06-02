'use strict'

import I18n from 'react-native-i18n';
//import memoize from 'lodash.memoize'; // Use for caching/memoize for better performance


// export const IMLocalized = memoize(
//   (key, config) =>
//     i18n.t(key, config).includes('missing') ? key : i18n.t(key, config),
//   (key, config) => (config ? key + JSON.stringify(config) : key),
// );

// IMLocalized.cache.clear();

////{IMLocalized('welcome')}

import en from './en.json';
import fr from './fr.json';
import ru from './ru.json';
import cn from './zn.json';
import es from './es.json';

I18n.fallbacks = true;

I18n.translations = {
  en,
  fr,
  ru,
  cn,
  es,
};


export default I18n;