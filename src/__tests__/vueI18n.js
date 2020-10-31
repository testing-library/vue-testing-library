test.todo('Your test suite must contain at least one test.')

// import '@testing-library/jest-dom'
// import {render, fireEvent} from '@testing-library/vue'
// import Vuei18n from 'vue-i18n'
// import VueI18n from './components/VueI18n'

// const messages = {
//   en: {
//     Hello: 'Hello',
//   },
//   ja: {
//     Hello: 'こんにちは',
//   },
// }

// test('renders translations', async () => {
//   const {queryByText, getByText} = render(VueI18n, {}, vue => {
//     // Let's register Vuei18n normally
//     vue.use(Vuei18n)

//     const i18n = new Vuei18n({
//       locale: 'en',
//       fallbackLocale: 'en',
//       messages,
//     })

//     // Notice how we return an object from the callback function. It will be
//     // available as an additional option on the created Vue instance.
//     return {i18n}
//   })

//   expect(getByText('Hello')).toBeInTheDocument()

//   await fireEvent.click(getByText('Japanese'))

//   expect(getByText('こんにちは')).toBeInTheDocument()

//   expect(queryByText('Hello')).toBeNull()
// })
