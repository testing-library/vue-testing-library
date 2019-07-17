import 'jest-dom/extend-expect'
import { cleanup, render, fireEvent } from '@testing-library/vue'
import Vuei18n from 'vue-i18n'
import VueI18n from './components/VueI18n'

afterEach(cleanup)

const ja = {
  Hello: 'こんにちは'
}

test('can render en and ja text in header', async () => {
  const { queryByTestId, getByTestId } = render(VueI18n, {}, vue => {
    vue.use(Vuei18n)
    const i18n = new Vuei18n({
      locale: 'en',
      messages: {
        ja
      }
    })
    return { i18n }
  })

  expect(queryByTestId('section-header')).toHaveTextContent('Hello')

  await fireEvent.click(getByTestId('button-ja'))

  expect(queryByTestId('section-header')).toHaveTextContent('こんにちは')
})
