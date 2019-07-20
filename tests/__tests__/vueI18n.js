import '@testing-library/jest-dom/extend-expect'
import { cleanup, render, fireEvent } from '@testing-library/vue'
import Vuei18n from 'vue-i18n'
import VueI18n from './components/VueI18n'

afterEach(cleanup)

const messages = {
  en: {
    Hello: 'Hello'
  },
  ja: {
    Hello: 'こんにちは'
  }
}

test('can render en and ja text in header', async () => {
  const { queryByText, getByText } = render(VueI18n, {}, vue => {
    vue.use(Vuei18n)
    const i18n = new Vuei18n({
      locale: 'en',
      fallbackLocale: 'en',
      messages
    })
    //return i18n object so that it will be available as an additional option on the created vue instance
    return { i18n }
  })

  expect(getByText('Hello')).toBeInTheDocument()

  await fireEvent.click(getByText('Japanese'))

  expect(getByText('こんにちは')).toBeInTheDocument()

  expect(queryByText('Hello')).toBeNull()
})
