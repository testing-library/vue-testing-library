import 'jest-dom/extend-expect'

import App from './components/Router/App.vue'
import Home from './components/Router/Home.vue'
import About from './components/Router/About.vue'

import { render, fireEvent } from '../../src'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '*', redirect: '/' }
]

test('full app rendering/navigating', async () => {
  const { queryByTestId } = render(App, { routes })

  // normally I'd use a data-testid, but just wanted to show this is also possible
  expect(queryByTestId('location-display')).toHaveTextContent('/')
  await fireEvent.click(queryByTestId('about-link'))

  expect(queryByTestId('location-display')).toHaveTextContent('/about')
})
