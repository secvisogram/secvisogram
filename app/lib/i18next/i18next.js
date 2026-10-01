/* global __webpack_public_path__ */
import i18next from 'i18next'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

i18next
  .use(Backend)
  .use(initReactI18next)
  .init({
    debug: false,
    returnNull: false,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: `${__webpack_public_path__}locales/{{lng}}/translation.json`,
    },
  })

export default i18next
