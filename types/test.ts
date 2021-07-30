import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import {render, fireEvent, screen, waitFor} from '@testing-library/vue'

declare const elem: Element

const SomeComponent = Vue.extend({
  name: 'SomeComponent',
  props: {
    foo: {type: Number, default: 0},
    bar: {type: String, default: '0'},
  },
})

export async function testRender() {
  const {
    getByText,
    queryByText,
    findByText,
    getAllByText,
    queryAllByText,
    findAllByText,
    container,
    unmount,
    debug,
  } = render({template: '<div />'})

  // single queries
  getByText('foo')
  queryByText('foo')
  await findByText('foo')

  // multiple queries
  getAllByText('bar')
  queryAllByText('bar')
  await findAllByText('bar')

  debug(container)

  debug(elem) // $ExpectType void
  debug([elem, elem], 100, {highlight: false}) // $ExpectType void

  unmount()
}

export function testRenderOptions() {
  const container = document.createElement('div')
  const options = {container}
  render({template: 'div'}, options)
}

export async function testFireEvent() {
  const {container} = render({template: 'button'})
  await fireEvent.click(container)
}

export function testDebug() {
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

export async function testScreen() {
  render({template: 'button'})

  await screen.findByRole('button')
}

export async function testWaitFor() {
  const {container} = render({template: 'button'})
  await fireEvent.click(container)
  await waitFor(() => {})
}

export function testOptions() {
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

export function testConfigCallback() {
  const ExamplePlugin: Vue.PluginFunction<never> = () => {}
  render(SomeComponent, {}, localVue => {
    localVue.use(ExamplePlugin)
  })
}

export function testInstantiatedStore() {
  render(SomeComponent, {
    store: new Vuex.Store({
      state: {count: 3},
      mutations: {
        increment(state) {
          state.count++
        },
        decrement(state) {
          state.count--
        },
      },
      actions: {
        increment(context) {
          context.commit('increment')
        },
        decrement(context) {
          context.commit('decrement')
        },
      },
    }),
  })
}

export function testInstantiatedRouter() {
  render(SomeComponent, {
    routes: new VueRouter({
      routes: [{path: '/', name: 'home', component: SomeComponent}],
    }),
  })
}

/*
eslint
  testing-library/prefer-explicit-assert: "off",
  testing-library/no-wait-for-empty-callback: "off",
  testing-library/no-debug: "off",
  testing-library/prefer-screen-queries: "off",
  @typescript-eslint/unbound-method: "off",
*/
