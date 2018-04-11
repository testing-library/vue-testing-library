import { createLocalVue, mount } from '@vue/test-utils'
import Simulate from './Simulate'
import { wait, queries } from 'dom-testing-library'

function render (TestComponent, { props = null, store = null, routes = null } = {}, configurationCb) {
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
    router = new VueRouter(routes)
  }

  if (configurationCb && typeof configurationCb === 'function') {
    configurationCb(localVue)
  }

  const wrapper = mount(TestComponent, {
    localVue,
    router,
    store: vuexStore,
    propsData: { ...props },
    attachToDocument: true
  })

  const wrapperHelpers = Object.entries(queries).reduce(
    (helpers, [key, fn]) => {
      helpers[key] = fn.bind(null, wrapper.element)
      return helpers
    },
    {}
  )

  return {
    unmount: () => wrapper.destroy(),
    isUnmounted: () => wrapper.vm._isDestroyed,
    html: () => wrapper.html(),
    updateProps: _ => wrapper.setProps(_),
    updateState: _ => wrapper.setData(_),
    ...wrapperHelpers
  }
}

export { render, wait, Simulate }
