// TypeScript Version: 4.1
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  VNode,
  Component,
  Directive,
  Plugin,
  AppConfig,
  EmitsOptions,
  ComponentOptions,
} from 'vue'
import {} from '@vue/test-utils'
import {StoreOptions} from 'vuex'
import {queries, EventType, BoundFunctions} from '@testing-library/dom'
// eslint-disable-next-line import/no-extraneous-dependencies
import {OptionsReceived as PrettyFormatOptions} from 'pretty-format'

// NOTE: fireEvent is overridden below
export * from '@testing-library/dom'

/** vvvvvvvvv THIS SHOULD COME FROM VUE TEST UTILS vvvvvvvvvvvvv */
/** vvvvvvvvv THIS SHOULD COME FROM VUE TEST UTILS vvvvvvvvvvvvv */
/** vvvvvvvvv THIS SHOULD COME FROM VUE TEST UTILS vvvvvvvvvvvvv */
/** vvvvvvvvv THIS SHOULD COME FROM VUE TEST UTILS vvvvvvvvvvvvv */
/** vvvvvvvvv THIS SHOULD COME FROM VUE TEST UTILS vvvvvvvvvvvvv */
/** vvvvvvvvv THIS SHOULD COME FROM VUE TEST UTILS vvvvvvvvvvvvv */
/** vvvvvvvvv THIS SHOULD COME FROM VUE TEST UTILS vvvvvvvvvvvvv */
/** vvvvvvvvv THIS SHOULD COME FROM VUE TEST UTILS vvvvvvvvvvvvv */
/** vvvvvvvvv THIS SHOULD COME FROM VUE TEST UTILS vvvvvvvvvvvvv */

type GlobalMountOptions = {
  plugins?: (Plugin | [Plugin, ...any[]])[]
  config?: Partial<Omit<AppConfig, 'isNativeTag'>> // isNativeTag is readonly, so we omit it
  mixins?: ComponentOptions[]
  mocks?: Record<string, any>
  provide?: Record<any, any>
  components?: Record<string, Component | object>
  directives?: Record<string, Directive>
  stubs?: Record<any, any>
  renderStubDefaultSlot?: boolean
}

type Slot = VNode | string | {render: Function} | Function | Component

type SlotDictionary = {
  [key: string]: Slot
}

interface MountingOptions<Props, Data = {}> {
  data?: () => {} extends Data ? any : Data extends object ? Partial<Data> : any
  props?: Props
  attrs?: Record<string, unknown>
  slots?: SlotDictionary & {
    default?: Slot
  }
  global?: GlobalMountOptions
  attachTo?: HTMLElement | string
  shallow?: boolean
}

/** ^^^^^^^^^^^^ THIS SHOULD COME FROM VUE TEST UTILS ^^^^^^^^^^^^ */
/** ^^^^^^^^^^^^ THIS SHOULD COME FROM VUE TEST UTILS ^^^^^^^^^^^^ */
/** ^^^^^^^^^^^^ THIS SHOULD COME FROM VUE TEST UTILS ^^^^^^^^^^^^ */
/** ^^^^^^^^^^^^ THIS SHOULD COME FROM VUE TEST UTILS ^^^^^^^^^^^^ */
/** ^^^^^^^^^^^^ THIS SHOULD COME FROM VUE TEST UTILS ^^^^^^^^^^^^ */
/** ^^^^^^^^^^^^ THIS SHOULD COME FROM VUE TEST UTILS ^^^^^^^^^^^^ */
/** ^^^^^^^^^^^^ THIS SHOULD COME FROM VUE TEST UTILS ^^^^^^^^^^^^ */
/** ^^^^^^^^^^^^ THIS SHOULD COME FROM VUE TEST UTILS ^^^^^^^^^^^^ */
/** ^^^^^^^^^^^^ THIS SHOULD COME FROM VUE TEST UTILS ^^^^^^^^^^^^ */
/** ^^^^^^^^^^^^ THIS SHOULD COME FROM VUE TEST UTILS ^^^^^^^^^^^^ */

type Debug = (
  baseElement?: Element | DocumentFragment | Array<Element | DocumentFragment>,
  maxLength?: number,
  options?: PrettyFormatOptions,
) => void

export interface RenderResult extends BoundFunctions<typeof queries> {
  container: Element
  baseElement: Element
  debug: Debug
  unmount(): void
  html(): string
  emitted(): EmitsOptions
  rerender(props: object): Promise<void>
}

type VueTestUtilsRenderOptions = Omit<
  MountingOptions<Record<string, any>>,
  'attachTo' | 'shallow' | 'propsData'
>
type VueTestingLibraryRenderOptions = {
  store?: StoreOptions<{}>
  // router?: ¿¿¿???
  container?: Element
  baseElement?: Element
}
type RenderOptions = VueTestUtilsRenderOptions & VueTestingLibraryRenderOptions

export function render(
  TestComponent: any, // this makes me sad :sob:
  options?: RenderOptions,
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
