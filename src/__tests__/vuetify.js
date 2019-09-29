import Vue from 'vue'
import {render, fireEvent} from '@testing-library/vue'
import Vuetify from 'vuetify'
import VuetifyDemoComponent from './components/Vuetify'

// We need to use a global Vue instance, otherwise Vuetify will complain about
// read-only attributes.
// More info: https://github.com/vuetifyjs/vuetify/issues/4068
//            https://vuetifyjs.com/en/getting-started/unit-testing
Vue.use(Vuetify)

// Vuetify requires you to wrap you app with a v-app component that provides
// a <div data-app="true"> node. So you can do that, or you can also set the
// attribute to the DOM.
document.body.setAttribute('data-app', true)
// Another solution is to create a custom renderer that provides all the
// environment required by Vuetify.

test('renders a Vuetify-powered component', async () => {
  const {getByText} = render(VuetifyDemoComponent, {
    vuetify: new Vuetify(),
  })

  await fireEvent.click(getByText('open'))

  expect(getByText('Lorem ipsum dolor sit amet.')).toMatchInlineSnapshot(`
    <div
      class="v-card__text"
    >
      Lorem ipsum dolor sit amet.
    </div>
  `)
})
