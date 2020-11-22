// Minimum TypeScript Version: 4.0
/* eslint-disable @typescript-eslint/no-explicit-any */

import {EmitsOptions} from 'vue'
import {} from '@vue/test-utils'
import {StoreOptions} from 'vuex'
import {queries, EventType, BoundFunctions} from '@testing-library/dom'
// eslint-disable-next-line import/no-extraneous-dependencies
import {OptionsReceived as PrettyFormatOptions} from 'pretty-format'

// Here until https://github.com/vuejs/vue-test-utils-next/pull/252
// is released
import {MountingOptions} from 'vtu-next'

// NOTE: fireEvent is overridden below
export * from '@testing-library/dom'

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
