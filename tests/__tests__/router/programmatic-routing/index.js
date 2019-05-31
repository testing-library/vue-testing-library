import 'jest-dom/extend-expect'

import App from './components/App.vue'
import Home from './components/Home.vue'
import About from './components/About.vue'

import { render, fireEvent } from 'vue-testing-library'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '*', redirect: '/about' }
]

test('navigating programmatically', async () => {
  const { queryByTestId } = render(App, { routes })

  expect(queryByTestId('location-display')).toHaveTextContent('/')
  await fireEvent.click(queryByTestId('go-to-about'))

  expect(queryByTestId('location-display')).toHaveTextContent('/about')
})
