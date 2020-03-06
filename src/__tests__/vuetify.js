import Vue from 'vue'
import {render, fireEvent} from '@testing-library/vue'
import Vuetify from 'vuetify'
import VuetifyDemoComponent from './components/Vuetify'

// We need to use a global Vue instance, otherwise Vuetify will complain about
// read-only attributes.
// This could also be done in a custom Jest-test-setup file to execute for all tests.
// More info: https://github.com/vuetifyjs/vuetify/issues/4068
//            https://vuetifyjs.com/en/getting-started/unit-testing
Vue.use(Vuetify)

// Custom container to integrate Vuetify with Vue Testing Library.
// Vuetify requires you to wrap your app with a v-app component that provides
// a <div data-app="true"> node.
const renderWithVuetify = (component, options, callback) => {
  return render(
    component,
    {
      container: document.createElement('div').setAttribute('data-app', 'true'),
      // for Vuetify components that use the $vuetify instance property
      vuetify: new Vuetify(),
      ...options,
    },
    callback,
  )
}

test('renders a Vuetify-powered component', async () => {
  const {getByText} = renderWithVuetify(VuetifyDemoComponent)

  await fireEvent.click(getByText('open'))

  expect(getByText('Lorem ipsum dolor sit amet.')).toMatchInlineSnapshot(`
    <div
      class="v-card__text"
    >
      Lorem ipsum dolor sit amet.
    </div>
  `)
})

test('allows changing props', async () => {
  const {queryByText, updateProps} = renderWithVuetify(VuetifyDemoComponent)

  expect(queryByText('This is a hint')).toBe(null)

  await updateProps({showHint: true})

  expect(queryByText('This is a hint')).not.toBe(null)
})
