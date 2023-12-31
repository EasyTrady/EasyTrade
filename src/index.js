/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Soft UI Dashboard React Context Provider
import { SoftUIControllerProvider } from "context";
import { Provider } from "react-redux";
import store from "store/store";
import { I18nextProvider } from "react-i18next";
import i18next from 'i18next';
import common_ar from './translations/ar/common.json';
import common_en from './translations/en/common.json';
i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: 'en', // language to use
  resources: {
    en: {
      common: common_en // 'common' is our custom namespace
    },
    ar: {
      common: common_ar
    }
  }
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <SoftUIControllerProvider>
  
      <Provider store={store}>

      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
      </Provider>

    </SoftUIControllerProvider>
  </BrowserRouter>
);
