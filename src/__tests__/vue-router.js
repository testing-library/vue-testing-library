// Please notice that this example is a draft example on how to test
// the router.
// Related issue on Vue Test Utils: https://github.com/vuejs/vue-test-utils-next/issues/152

import '@testing-library/jest-dom'
import {waitFor} from '@testing-library/dom'
import {render, fireEvent} from '..'
import App from './components/Router/App.vue'
import Home from './components/Router/Home.vue'
import About from './components/Router/About.vue'

const routes = [
  {path: '/', component: Home},
  {path: '/about', component: About},
]

test('full app rendering/navigating', async () => {
  // Notice how we pass a `routes` object to our render function.
  const {findByText, getByText, getByTestId} = render(App, {routes})

  // Vue Router navigation is async, so we need to wait until the
  // initial render happens
  expect(await findByText('You are home')).toBeInTheDocument()

  await fireEvent.click(getByTestId('about-link'))

  // Same thing hereVue Router navigation is async, so we need to wait until the
  // navigation happens
  await waitFor(() =>
    expect(getByTestId('location-display')).toHaveTextContent('/about'),
  )

  expect(getByText('You are on the about page')).toBeInTheDocument()
})
