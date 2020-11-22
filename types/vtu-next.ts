/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  VNode,
  Component,
  Directive,
  Plugin,
  AppConfig,
  ComponentOptions,
} from 'vue'

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

export interface MountingOptions<Props, Data = {}> {
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
