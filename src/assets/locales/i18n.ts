import { createI18n } from 'vue-i18n';
import messagesEn from '@/assets/locales/en.json';
import messagesDe from '@/assets/locales/de.json';
import messagesIt from '@/assets/locales/it.json';

const i18n = createI18n({
  legacy: false,
  locale: 'de',
  messages: {
    en: messagesEn,
    de: messagesDe,
    it: messagesIt,
  },
});

export default i18n;
