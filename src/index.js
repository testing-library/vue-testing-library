import {
  createLocalVue,
  mount
} from '@vue/test-utils'

import {
  getQueriesForElement,
  prettyDOM,
  wait,
  fireEvent
} from 'dom-testing-library'

const mountedWrappers = new Set()

function render (TestComponent, {
  props = null,
  store = null,
  routes = null
} = {}, configurationCb) {
  const localVue = createLocalVue()
  let vuexStore = null
  let router = null

  if (store) {
    const Vuex = require('vuex')
    localVue.use(Vuex)
    vuexStore = new Vuex.Store(store)
  }

  if (routes) {
    const VueRouter = require('vue-router')
    localVue.use(VueRouter)
    router = new VueRouter({
      routes
    })
  }

  if (configurationCb && typeof configurationCb === 'function') {
    configurationCb(localVue)
  }

  const wrapper = mount(TestComponent, {
    localVue,
    router,
    store: vuexStore,
    propsData: { ...props },
    attachToDocument: true,
    sync: false
  })

  mountedWrappers.add(wrapper)

  return {
    debug: () => console.log(prettyDOM(wrapper.element)),
    unmount: () => wrapper.destroy(),
    isUnmounted: () => wrapper.vm._isDestroyed,
    html: () => wrapper.html(),
    emitted: () => wrapper.emitted(),
    updateProps: _ => {
      wrapper.setProps(_)
      return wait()
    },
    updateState: _ => wrapper.setData(_),
    ...getQueriesForElement(wrapper.element)
  }
}

function cleanup () {
  mountedWrappers.forEach(cleanupAtWrapper)
}

function cleanupAtWrapper (wrapper) {
  if (wrapper.parentNode === document.body) {
    document.body.removeChild(wrapper)
  }
  wrapper.destroy()
  mountedWrappers.delete(wrapper)
}

Object.keys(fireEvent).forEach(fn => {
  fireEvent[`_${fn}`] = fireEvent[fn];
  fireEvent[fn] = async (...params) => {
    fireEvent[`_${fn}`](...params)
    await wait()
  }
})

fireEvent.touch = async (elem) => {
  await fireEvent.focus(elem)
  await fireEvent.blur(elem)
}

export * from 'dom-testing-library'
export {
  cleanup,
  render
}
