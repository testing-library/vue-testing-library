// Minimum TypeScript Version: 4.0
/* eslint-disable @typescript-eslint/no-explicit-any */

import {MountingOptions} from '@vue/test-utils'
import {queries, EventType, BoundFunctions} from '@testing-library/dom'
// eslint-disable-next-line import/no-extraneous-dependencies
import {OptionsReceived as PrettyFormatOptions} from 'pretty-format'

// NOTE: fireEvent is overridden below
export * from '@testing-library/dom'

export function cleanup(): void

type Debug = (
  baseElement?: Array<DocumentFragment | Element> | DocumentFragment | Element,
  maxLength?: number,
  options?: PrettyFormatOptions,
) => void

export interface RenderResult extends BoundFunctions<typeof queries> {
  container: Element
  baseElement: Element
  debug: Debug
  unmount(): void
  html(): string
  emitted<T = unknown>(): Record<string, T[]>
  emitted<T = unknown>(name?: string): T[]
  rerender(props: object): Promise<void>
}

type VueTestUtilsRenderOptions = Omit<
  MountingOptions<Record<string, any>>,
  'attachTo' | 'propsData' | 'shallow'
>
interface VueTestingLibraryRenderOptions {
  /**
   * @deprecated Add a Vuex instance through `global.plugins` array instead.
   */
  store?: any
  /**
   * @deprecated Add a Router instance through `global.plugins` array instead.
   */
  routes?: any
  container?: Element
  baseElement?: Element
}
export type RenderOptions = VueTestingLibraryRenderOptions &
  VueTestUtilsRenderOptions

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
