// TypeScript Version: 3.8

import Vue, {ComponentOptions} from 'vue'
import {ThisTypedMountOptions, VueClass} from '@vue/test-utils'
import {Store, StoreOptions} from 'vuex'
import Router, {RouteConfig} from 'vue-router'
import {OptionsReceived as PrettyFormatOptions} from 'pretty-format'
import {queries, EventType, BoundFunctions} from '@testing-library/dom'

// NOTE: fireEvent is overridden below
export * from '@testing-library/dom'

export interface RenderResult extends BoundFunctions<typeof queries> {
  container: HTMLElement
  baseElement: HTMLElement
  debug: (
    baseElement?:
      | HTMLElement
      | DocumentFragment
      | Array<HTMLElement | DocumentFragment>,
    maxLength?: number,
    options?: PrettyFormatOptions,
  ) => void
  unmount(): void
  isUnmounted(): boolean
  html(): string
  emitted(): {[name: string]: any[][]}
  updateProps(props: object): Promise<void>
}

export interface RenderOptions<V extends Vue, S = {}>
  // The props and store options special-cased by Vue Testing Library and NOT passed to mount().
  extends Omit<ThisTypedMountOptions<V>, 'store' | 'props'> {
  props?: object
  store?: StoreOptions<S>
  routes?: RouteConfig[]
  container?: HTMLElement
  baseElement?: HTMLElement
}

export type ConfigurationCallback<V extends Vue> = (
  localVue: typeof Vue,
  store: Store<any>,
  router: Router,
) => Partial<ThisTypedMountOptions<V>> | void

export function render<V extends Vue>(
  TestComponent: VueClass<V> | ComponentOptions<V>,
  options?: RenderOptions<V>,
  configure?: ConfigurationCallback<V>,
): RenderResult

export type AsyncFireObject = {
  [K in EventType]: (
    element: Document | Element | Window,
    options?: {},
  ) => Promise<void>
}

export interface VueFireEventObject extends AsyncFireObject {
  (element: Document | Element | Window, event: Event): Promise<void>
  touch(element: Document | Element | Window): Promise<void>
  update(element: HTMLOptionElement): Promise<void>
  update(
    element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    value: string,
  ): Promise<void>
  update(element: HTMLElement, value?: string): Promise<void>
}

export const fireEvent: VueFireEventObject
