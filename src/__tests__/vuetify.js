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

// Custom render wrapper to integrate Vuetify with Vue Testing Library.
// Vuetify requires you to wrap your app with a v-app component that provides
// a <div data-app="true"> node.
export const renderWithVuetify = (component, options, callback) => {
  return render(
    // anonymous component
    {
      // Vue's render function
      render(createElement) {
        // wrap the component with a <div data-app="true"> node and render the test component
        return createElement('div', {attrs: {'data-app': true}}, [
          createElement(component),
        ])
      },
    },
    // for Vuetify components that use the $vuetify instance property
    {vuetify: new Vuetify(), ...options},
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
