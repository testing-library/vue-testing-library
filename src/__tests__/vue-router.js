test.todo('Your test suite must contain at least one test.')

// // Please notice that this example is a draft example on how to test
// // the router.
// // Related issue on Vue Test Utils: https://github.com/vuejs/vue-test-utils-next/issues/152

// import '@testing-library/jest-dom'
// import {render, fireEvent} from '@testing-library/vue'
// import App from './components/Router/App.vue'
// import Home from './components/Router/Home.vue'
// import About from './components/Router/About.vue'

// const routes = [
//   {path: '/', component: Home},
//   {path: '/about', component: About},
// ]

// test('full app rendering/navigating', async () => {
//   // Notice how we pass a `routes` object to our render function.
//   const {queryByTestId} = render(App, {routes})

//   expect(queryByTestId('location-display')).toHaveTextContent('/')

//   await fireEvent.click(queryByTestId('about-link'))

//   expect(queryByTestId('location-display')).toHaveTextContent('/about')
// })

// test('setting initial route', () => {
//   // The callback function receives three parameters: the Vue instance where
//   // the component is mounted, the store instance (if any) and the router
//   // object.
//   const {queryByTestId} = render(App, {routes}, (vue, store, router) => {
//     router.push('/about')
//   })

//   expect(queryByTestId('location-display')).toHaveTextContent('/about')
// })
