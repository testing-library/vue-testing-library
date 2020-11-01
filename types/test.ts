import Vue from 'vue'
import {render, fireEvent, screen, waitFor} from '@testing-library/vue'

declare const elem: HTMLElement

const SomeComponent = Vue.extend({
  name: 'SomeComponent',
  props: {
    foo: Number,
    bar: String,
  },
})

async function testRender() {
  const page = render({template: '<div />'})

  // single queries
  page.getByText('foo')
  page.queryByText('foo')
  await page.findByText('foo')

  // multiple queries
  page.getAllByText('bar')
  page.queryAllByText('bar')
  await page.findAllByText('bar')

  // helpers
  const {container, unmount, debug} = page

  debug(elem) // $ExpectType void
  debug([elem, elem], 100, {highlight: false}) // $ExpectType void
}

async function testRenderOptions() {
  const container = document.createElement('div')
  const options = {container}
  render({template: 'div'}, options)
}

async function testFireEvent() {
  const {container} = render({template: 'button'})
  await fireEvent.click(container)
}

async function testDebug() {
  const {debug, getAllByTestId} = render({
    render(h) {
      return h('div', [
        h('h1', {attrs: {'data-testId': 'testid'}}, 'hello world'),
        h('h2', {attrs: {'data-testId': 'testid'}}, 'hello world'),
      ])
    },
  })

  debug(getAllByTestId('testid'))
}

async function testScreen() {
  render({template: 'button'})

  await screen.findByRole('button')
}

async function testWaitFor() {
  const {container} = render({template: 'button'})
  fireEvent.click(container)
  await waitFor(() => {})
}

async function testOptions() {
  render(SomeComponent, {
    // options for new Vue()
    name: 'SomeComponent',
    methods: {
      glorb() {
        return 42
      },
    },
    // options for vue-test-utils mount()
    slots: {
      quux: '<p>Baz</p>',
    },
    mocks: {
      isThisFake() {
        return true
      },
    },
    // options for Vue Testing Library render()
    container: elem,
    baseElement: elem,
    props: {
      foo: 9,
      bar: 'x',
    },
    store: {
      state: {
        foos: [4, 5],
        bars: ['a', 'b'],
      },
      getters: {
        fooCount() {
          return this.foos.length
        },
      },
    },
    routes: [
      {path: '/', name: 'home', component: SomeComponent},
      {
        path: '/about',
        name: 'about',
        component: () => Promise.resolve(SomeComponent),
      },
    ],
  })
}

function testConfigCallback() {
  const ExamplePlugin: Vue.PluginFunction<never> = () => {}
  render(SomeComponent, {}, (localVue, store, router) => {
    localVue.use(ExamplePlugin)
    store.replaceState({foo: 'bar'})
    router.onError(error => console.log(error.message))
  })
}
