// TypeScript Version: 4.0

import Vue, {ComponentOptions} from 'vue'
import {ThisTypedMountOptions, VueClass} from '@vue/test-utils'
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  queries,
  EventType,
  BoundFunctions,
  prettyFormat,
} from '@testing-library/dom'

// NOTE: fireEvent is overridden below
export * from '@testing-library/dom'

export function cleanup(): void

export interface RenderResult extends BoundFunctions<typeof queries> {
  container: Element
  baseElement: Element
  debug: (
    baseElement?:
      | Element
      | DocumentFragment
      | Array<Element | DocumentFragment>,
    maxLength?: number,
    options?: prettyFormat.OptionsReceived,
  ) => void
  unmount(): void
  isUnmounted(): boolean
  html(): string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emitted(): {[name: string]: any[][]}
  updateProps(props: object): Promise<void>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Store = any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Routes = any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Router = any

export interface RenderOptions<V extends Vue, S = Store>
  // The props and store options special-cased by Vue Testing Library and NOT passed to mount().
  extends Omit<ThisTypedMountOptions<V>, 'store' | 'props'> {
  props?: object
  store?: S
  routes?: Routes
  container?: Element
  baseElement?: Element
}

export type ConfigurationCallback<V extends Vue> =
  | ((
      localVue: typeof Vue,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      store: Store,
      router: Router,
    ) => Partial<ThisTypedMountOptions<V>>)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | ((localVue: typeof Vue, store: Store, router: Router) => void)

export function render<V extends Vue, S = Store>(
  TestComponent: VueClass<V> | ComponentOptions<V>,
  // eslint-disable-next-line @typescript-eslint/ban-tslint-comment
  // tslint:disable-next-line no-unnecessary-generics
  options?: RenderOptions<V, S>,
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
  update(element: Element, value?: string): Promise<void>
}

export const fireEvent: VueFireEventObject
