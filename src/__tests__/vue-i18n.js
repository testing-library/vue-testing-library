import '@testing-library/jest-dom'
import {createI18n} from 'vue-i18n'
import {render, fireEvent} from '..'
import Translations from './components/Translations'

const i18n = createI18n({
  legacy: true,
  locale: 'en',
  messages: {
    en: {
      hello: 'Hello',
    },
    ja: {
      hello: 'こんにちは',
    },
  },
})

test('renders translations', async () => {
  const {queryByText, getByText} = render(Translations, {
    global: {
      plugins: [i18n],
    },
  })

  expect(getByText('Hello')).toBeInTheDocument()

  await fireEvent.update(getByText('Japanese'))

  expect(getByText('こんにちは')).toBeInTheDocument()

  expect(queryByText('Hello')).not.toBeInTheDocument()
})
