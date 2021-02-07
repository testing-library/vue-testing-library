/* eslint-disable vue/require-prop-types */
/* eslint-disable vue/one-component-per-file */

import '@testing-library/jest-dom'
import {waitFor} from '@testing-library/dom'
import {defineComponent} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import {render, fireEvent} from '..'
import App from './components/Router/App.vue'
import Home from './components/Router/Home.vue'
import About from './components/Router/About.vue'

test('full app rendering/navigating from base URL', async () => {
  // Create a Router instance
  // https://next.router.vuejs.org/api/#createrouter
  // using the a HTML5 history.
  // https://next.router.vuejs.org/api/#createwebhistory
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {path: '/', component: Home},
      {path: '/about', component: About},
    ],
  })

  const {findByText, getByText, getByTestId} = render(App, {
    global: {
      plugins: [router],
    },
  })

  // Vue Router navigation is async, so we need to wait until the
  // initial render happens
  expect(await findByText('You are home')).toBeInTheDocument()
  expect(getByTestId('location-display')).toHaveTextContent('/')

  await fireEvent.click(getByTestId('about-link'))

  // Same thing here: Vue Router navigation is async, so we need to wait until the
  // navigation happens
  await waitFor(() =>
    expect(getByTestId('location-display')).toHaveTextContent('/about'),
  )

  expect(getByText('You are on the about page')).toBeInTheDocument()
})

test('sets router initial state', async () => {
  const Component = defineComponent({
    props: ['to'],
    template: `<router-link :to="to">Learn More</router-link>`,
  })

  const route = {
    name: 'routeName',
    path: '/',
    component: defineComponent({template: `<div></div>`}),
  }

  const router = createRouter({
    history: createWebHistory(),
    routes: [route],
  })

  const to = {name: route.name}

  const {getByText} = render(Component, {
    props: {to},
    global: {
      plugins: [router],
    },
  })

  // We need to wait for router to complete the initial navigation.
  await router.isReady()

  const button = getByText('Learn More')
  expect(button).toHaveAttribute('href', route.path)
})
