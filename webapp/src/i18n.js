import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      'welcome': {
        'header': 'Welcome to Privvy',
        'sub': 'Want to change this text? Just click below and lets see what happens...'
      }
    }
  },
  gibb: {
    translation: {
      'welcome': {
        'header': 'Xribrqp zi Umkkj',
        'sub': 'Twig zi nlso phox ewxp? Ywlt veixl meqkmxa ghc kqzi vjj npxl jvbbowm...'
      }
    }
  }
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n
