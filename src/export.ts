// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { createApp } from 'vue';
import App from './App.vue';
import i18n from './assets/locales/i18n';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { createPinia } from 'pinia';

class CustomElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const propsList: string[] = [
      'fontColor',
      'language',
      'showSustainabilityActionFilter',
      'showOrganizationFilter',
    ];

    const optionalPropsList: string[] = ['selectedOrganisation'];

    const props: { [index: string]: string } = {};

    // Validate, if all props are present
    for (const prop of propsList) {
      const propValue = this.attributes.getNamedItem(prop)?.value;

      if (!propValue) {
        console.error(`Missing attribute ${prop}`);
        return;
      }

      props[prop] = propValue;
    }

    for (const prop of optionalPropsList) {
      const propValue = this.attributes.getNamedItem(prop)?.value;

      if (!propValue) {
        continue;
      }

      props[prop] = propValue;
    }

    const pinia = createPinia();

    const app = createApp(App, props);
    app.use(i18n);
    app.use(pinia);

    const wrapper = document.createElement('div');
    app.mount(wrapper);

    const shadowRoot = this.attachShadow({ mode: 'open' });

    const styleElements = document.querySelectorAll(
      'style, link[rel="stylesheet"]'
    );

    styleElements.forEach((styleElement) => {
      shadowRoot.appendChild(styleElement.cloneNode(true));
    });

    shadowRoot.appendChild(wrapper.children[0]);
  }
}

window.customElements.define('sustainability-apps', CustomElement);
