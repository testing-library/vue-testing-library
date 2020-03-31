import '@testing-library/jest-dom'
import {render, fireEvent} from '@testing-library/vue'
import {waitFor} from '@testing-library/dom'

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
  const {queryByTestId} = await render(App, {routes})

  expect(queryByTestId('location-display')).toHaveTextContent('/')

  await fireEvent.click(queryByTestId('about-link'))

  expect(queryByTestId('location-display')).toHaveTextContent('/about')
})

test('setting initial route', async () => {
  // The callback function receives three parameters: the Vue instance where
  // the component is mounted, the store instance (if any) and the router
  // object.
  const {queryByTestId} = await render(App, {routes}, (vue, store, router) => {
    router.push('/about')
  })

  expect(queryByTestId('location-display')).toHaveTextContent('/about')
})

test('setting initial route for nested routes with async component import', async () => {
  const {queryByTestId} = await render(
    App,
    {
      routes: [
        {
          path: '/about',
          component: () => import('./components/Router/AboutWrapper.vue'),
          children: [
            {
              path: 'me',
              component: () => import('./components/Router/About.vue'),
            },
          ],
        },
      ],
    },
    async (vue, store, router) => {
      await router.push('/about/me')
    },
  )

  await waitFor(() =>
    expect(queryByTestId('location-display')).toHaveTextContent('/about/me'),
  )
})
