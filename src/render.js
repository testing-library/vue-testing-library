import {createLocalVue, mount} from '@vue/test-utils'

import {getQueriesForElement, prettyDOM} from '@testing-library/dom'

const mountedWrappers = new Set()

function render(
  Component,
  {
    store = null,
    routes = null,
    container: customContainer,
    baseElement: customBaseElement,
    ...mountOptions
  } = {},
  configurationCb,
) {
  const div = document.createElement('div')
  const baseElement = customBaseElement || customContainer || document.body
  const container = customContainer || baseElement.appendChild(div)

  const attachTo = document.createElement('div')
  container.appendChild(attachTo)

  const localVue = createLocalVue()
  let vuexStore = null
  let router = null
  let callbackOptions = {}

  if (store) {
    const Vuex = require('vuex')
    localVue.use(Vuex)

    vuexStore = store instanceof Vuex.Store ? store : new Vuex.Store(store)
  }

  if (routes) {
    const requiredRouter = require('vue-router')
    const VueRouter = requiredRouter.default || requiredRouter
    localVue.use(VueRouter)

    router = routes instanceof VueRouter ? routes : new VueRouter({routes})
  }

  if (configurationCb && typeof configurationCb === 'function') {
    callbackOptions = configurationCb(localVue, vuexStore, router)
  }

  if (!mountOptions.propsData && !!mountOptions.props) {
    mountOptions.propsData = mountOptions.props
    delete mountOptions.props
  }

  const wrapper = mount(Component, {
    attachTo,
    localVue,
    router,
    store: vuexStore,
    ...mountOptions,
    ...callbackOptions,
  })

  mountedWrappers.add(wrapper)
  container.appendChild(wrapper.element)

  return {
    container,
    baseElement,
    debug: (el = baseElement, ...args) =>
      Array.isArray(el)
        ? el.forEach(e => console.log(prettyDOM(e, ...args)))
        : console.log(prettyDOM(el, ...args)),
    unmount: () => wrapper.destroy(),
    isUnmounted: () => wrapper.vm._isDestroyed,
    html: () => wrapper.html(),
    emitted: () => wrapper.emitted(),
    updateProps: _ => wrapper.setProps(_),
    ...getQueriesForElement(baseElement),
  }
}

function cleanup() {
  mountedWrappers.forEach(cleanupAtWrapper)
}

function cleanupAtWrapper(wrapper) {
  if (
    wrapper.element.parentNode &&
    wrapper.element.parentNode.parentNode === document.body
  ) {
    document.body.removeChild(wrapper.element.parentNode)
  }

  try {
    wrapper.destroy()
  } finally {
    mountedWrappers.delete(wrapper)
  }
}

export {cleanup, render}
