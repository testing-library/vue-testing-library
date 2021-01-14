import '@testing-library/jest-dom'
import {render, fireEvent} from '@testing-library/vue'

import App from './components/Router/App.vue'
import Home from './components/Router/Home.vue'
import About from './components/Router/About.vue'

const routes = [
  {path: '/', component: Home},
  {path: '/about', component: About},
  {path: '*', redirect: '/about'},
]

test('full app rendering/navigating', async () => {
  // Notice how we pass a `routes` object to our render function.
  const {getByTestId} = render(App, {routes})

  expect(getByTestId('location-display')).toHaveTextContent('/')

  await fireEvent.click(getByTestId('about-link'))

  expect(getByTestId('location-display')).toHaveTextContent('/about')
})

test('setting initial route', () => {
  // The callback function receives three parameters: the Vue instance where
  // the component is mounted, the store instance (if any) and the router
  // object.
  const {getByTestId} = render(App, {routes}, (vue, store, router) => {
    router.push('/about')
  })

  expect(getByTestId('location-display')).toHaveTextContent('/about')
})
