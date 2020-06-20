import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/vue'
import Vuei18n from 'vue-i18n'
import Button from './components/Button'

/**
 * configuration callbacks may be shared shared between tests / test suites
 * e.g. for common plugin installation
 */
const installGlobalComponents = vue => {
  vue.component('CustomButton', Button)
}

const createVuei18nInstall = overrides => vue => {
  vue.use(Vuei18n)

  return {
    i18n: new Vuei18n({
      locale: 'en',
      fallbackLocale: 'en',
      ...overrides,
    }),
  }
}

test('can merge multiple configuration callbacks', () => {
  render(
    {
      template: `<custom-button :text="$t('welcome')" />`,
    },
    {},
    [
      installGlobalComponents,
      createVuei18nInstall({
        messages: {
          en: {
            welcome: 'Hello',
          },
        },
      }),
    ],
  )

  expect(screen.getByRole('button')).toHaveTextContent('Hello')
})
