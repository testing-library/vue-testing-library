import {h} from 'vue'
import Vant from 'vant'
import {render, fireEvent} from '..'
import Button from './components/Button'
import VantValidate from './components/VantValidate'
import '@testing-library/jest-dom'

const eventTypes = [
  {
    type: 'Clipboard',
    events: ['copy', 'cut', 'paste'],
  },
  {
    type: 'Composition',
    events: ['compositionEnd', 'compositionStart', 'compositionUpdate'],
  },
  {
    type: 'Keyboard',
    events: ['keyDown', 'keyPress', 'keyUp'],
    init: {keyCode: 13},
  },
  {
    type: 'Focus',
    events: ['focus', 'blur', 'focusIn', 'focusOut'],
  },
  {
    type: 'Focus',
    events: ['submit'],
    elementType: 'form',
  },
  {
    type: 'Form',
    events: ['change', 'input', 'invalid', 'submit', 'reset'],
  },
  {
    type: 'Mouse',
    events: [
      'click',
      'contextMenu',
      'drag',
      'dragEnd',
      'dragEnter',
      'dragExit',
      'dragLeave',
      'dragOver',
      'dragStart',
      'drop',
      'mouseDown',
      'mouseEnter',
      'mouseLeave',
      'mouseMove',
      'mouseOut',
      'mouseOver',
      'mouseUp',
    ],
    elementType: 'button',
  },
  {
    type: 'Selection',
    events: ['select'],
  },
  {
    type: 'Touch',
    events: ['touchCancel', 'touchEnd', 'touchMove', 'touchStart'],
    elementType: 'button',
  },
  {
    type: 'UI',
    events: ['scroll'],
    elementType: 'div',
  },
  {
    type: 'Wheel',
    events: ['wheel'],
    elementType: 'div',
  },
  {
    type: 'Media',
    events: [
      'abort',
      'canPlay',
      'canPlayThrough',
      'durationChange',
      'emptied',
      'encrypted',
      'ended',
      'error',
      'loadedData',
      'loadedMetadata',
      'loadStart',
      'pause',
      'play',
      'playing',
      'progress',
      'rateChange',
      'seeked',
      'seeking',
      'stalled',
      'suspend',
      'timeUpdate',
      'volumeChange',
      'waiting',
    ],
    elementType: 'video',
  },
  {
    type: 'Image',
    events: ['load', 'error'],
    elementType: 'img',
  },
  {
    type: 'Animation',
    events: ['animationStart', 'animationEnd', 'animationIteration'],
    elementType: 'div',
  },
  {
    type: 'Transition',
    events: ['transitionEnd'],
    elementType: 'div',
  },
  {
    type: 'Pointer',
    events: [
      'pointerOver',
      'pointerEnter',
      'pointerDown',
      'pointerMove',
      'pointerUp',
      'pointerCancel',
      'pointerOut',
      'pointerLeave',
      'gotPointerCapture',
      'lostPointerCapture',
    ],
    elementType: 'div',
  },
]

beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {})
})

afterEach(() => {
  console.warn.mockRestore()
})

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

// For each event type, we assert that the right events are being triggered
// when the associated fireEvent method is called.
eventTypes.forEach(({type, events, elementType = 'input', init}) => {
  describe(`${type} Events`, () => {
    events.forEach(eventName => {
      it(`triggers ${eventName}`, async () => {
        const testId = `${type}-${eventName}`
        const spy = jest.fn()
        const eventNameHandler = `on${capitalize(
          eventName.toLocaleLowerCase(),
        )}`

        const componentWithEvent = {
          render() {
            return h(elementType, {
              [eventNameHandler]: spy,
              'data-testid': testId,
            })
          },
        }

        // Render an element with a listener of the event under testing and a
        // test-id attribute, so that we can get the DOM node afterwards.
        const {getByTestId} = render(componentWithEvent)

        const elem = getByTestId(testId)

        await fireEvent[eventName](elem, init)
        expect(spy).toHaveBeenCalledTimes(1)
      })
    })
  })
})

// The event is called `dblclick`, but fireEvent exposes a "doubleClick" method
test('triggers dblclick on doubleClick', async () => {
  const spy = jest.fn()

  const componentWithDblClick = {
    render() {
      return h('button', {onDblclick: spy}, 'Click me')
    },
  }

  const {getByRole} = render(componentWithDblClick)

  const elem = getByRole('button')

  await fireEvent.doubleClick(elem)
  expect(spy).toHaveBeenCalledTimes(1)
})

// fireEvent(node, event) is also a valid API
test('calling `fireEvent` directly works too', async () => {
  const {getByRole, emitted} = render(Button)

  const button = getByRole('button')

  await fireEvent(button, new Event('click'))

  expect(emitted()).toHaveProperty('click')
})

test.each(['input', 'change'])(
  `fireEvent.%s prints a warning message to use fireEvent.update instead`,
  async event => {
    const {getByRole} = render({template: `<input type="text" />`})

    await fireEvent[event](getByRole('textbox'), 'hello')

    expect(console.warn).toHaveBeenCalledTimes(1)
    expect(console.warn).toHaveBeenCalledWith(
      `Using "fireEvent.${event}" may lead to unexpected results. Please use fireEvent.update() instead.`,
    )
  },
)

test('does not warn when disabled via env var', async () => {
  process.env.VTL_SKIP_WARN_EVENT_UPDATE = 'true'

  const {getByTestId} = render({
    template: `<input type="text" data-testid="test-update" />`,
  })

  await fireEvent.input(getByTestId('test-update'), 'hello')

  expect(console.warn).not.toHaveBeenCalled()
})

test('fireEvent.update does not trigger warning messages', async () => {
  const {getByTestId} = render({
    template: `<input type="text" data-testid="test-update" />`,
  })

  await fireEvent.update(getByTestId('test-update'), 'hello')

  expect(console.warn).not.toHaveBeenCalled()
})

test('fireEvent.update does not crash if non-input element is passed in', async () => {
  const {getByText} = render({
    template: `<div>Hi</div>`,
  })

  await fireEvent.update(getByText('Hi'))

  expect(getByText('Hi')).toMatchInlineSnapshot(`
    <div>
      Hi
    </div>
  `)

  expect(console.warn).not.toHaveBeenCalled()
})

test('fireEvent.update handles input file', async () => {
  const {getByTestId} = render({
    template: `<input type="file" data-testid="test-update" />`,
  })

  const file = new File(['(⌐□_□)'], 'chucknorris.png', {type: 'image/png'})

  const inputEl = getByTestId('test-update')

  // You could replace the lines below with
  // userEvent.upload(inputEl, file)
  Object.defineProperty(inputEl, 'files', {value: [file]})
  await fireEvent.update(inputEl)

  expect(console.warn).not.toHaveBeenCalled()
})

test('triggers form validation', async () => {
  const { getByPlaceholderText, getByTestId, getByText } = render(VantValidate, {
    global: {
      plugins: [Vant]
    }
  });
  expect(getByText('empty')).toBeInTheDocument();

  await fireEvent.update(getByPlaceholderText('username'), 'user');
  await fireEvent.update(getByPlaceholderText('password'), 'psw');
  await fireEvent.submit(getByTestId('form'));
  
  expect(getByText('validation passed')).toBeInTheDocument();
})
