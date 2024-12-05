// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { createApp } from 'vue';
import App from './App.vue';
import i18n from './assets/locales/i18n';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { createPinia } from 'pinia';

const pinia = createPinia();

const rootProps = {
  fontFamily: 'Arial',
  fontColor: 'black',
  language: 'de',
  showSustainabilityActionFilter: true,
  showOrganizationFilter: false,
};

createApp(App, rootProps).use(i18n).use(pinia).mount('#app');
