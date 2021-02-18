/* eslint-disable testing-library/no-wait-for-empty-callback */
import {mount} from '@vue/test-utils'

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
) {
  const div = document.createElement('div')
  const baseElement = customBaseElement || customContainer || document.body
  const container = customContainer || baseElement.appendChild(div)

  const plugins = mountOptions.global?.plugins || []

  if (store) {
    const {createStore} = require('vuex')
    plugins.push(createStore(store))
  }

  if (routes) {
    const requiredRouter = require('vue-router')
    const {createRouter, createWebHistory} =
      requiredRouter.default || requiredRouter

    const routerPlugin = createRouter({history: createWebHistory(), routes})
    plugins.push(routerPlugin)
  }

  const wrapper = mount(Component, {
    ...mountOptions,
    attachTo: container,
    global: {...mountOptions.global, plugins},
  })

  // this removes the additional "data-v-app" div node from VTU:
  // https://github.com/vuejs/vue-test-utils-next/blob/master/src/mount.ts#L196-L213
  unwrapNode(wrapper.parentElement)

  mountedWrappers.add(wrapper)

  return {
    container,
    baseElement,
    debug: (el = baseElement, maxLength, options) =>
      Array.isArray(el)
        ? el.forEach(e => console.log(prettyDOM(e, maxLength, options)))
        : console.log(prettyDOM(el, maxLength, options)),
    unmount: () => wrapper.unmount(),
    html: () => wrapper.html(),
    emitted: () => wrapper.emitted(),
    rerender: props => wrapper.setProps(props),
    ...getQueriesForElement(baseElement),
  }
}

function unwrapNode(node) {
  node.replaceWith(...node.childNodes)
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

  wrapper.unmount()
  mountedWrappers.delete(wrapper)
}

export {render, cleanup}
