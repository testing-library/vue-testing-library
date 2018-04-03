import App from './components/Router/App.vue'
import Home from './components/Router/Home.vue'
import About from './components/Router/About.vue'

import { render, Simulate } from '../'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '*', redirect: '/' }
]

test('full app rendering/navigating', () => {
  const { wrapper, queryByTestId } = render(App, { routes })
  // normally I'd use a data-testid, but just wanted to show this is also possible
  expect(wrapper.vm.$route.fullPath).toBe('/')
  Simulate.click(queryByTestId('about-link'))
  // normally I'd use a data-testid, but just wanted to show this is also possible
  expect(queryByTestId('location-display').textContent).toBe('/about')
})

test('landing on a bad page', () => {
  const { wrapper, queryByTestId } = render(App, { routes })
  wrapper.vm.$router.push({ name: 'some-bad-route' })
  expect(queryByTestId('location-display').textContent).toBe('/')
})
