import {render, fireEvent} from '@testing-library/vue'
import Button from './components/Button'

const eventTypes = [
  {
    type: 'Clipboard',
    events: ['copy', 'paste'],
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
    events: ['focus', 'blur'],
  },
  {
    type: 'Form',
    events: ['focus', 'blur'],
  },
  {
    type: 'Focus',
    events: ['input', 'invalid'],
  },
  {
    type: 'Focus',
    events: ['submit'],
    elementType: 'form',
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
]

const mockFile = ({
  name,
  size = 0,
  type = 'text/plain',
  lastModified = new Date(),
}) => {
  const blob = new Blob(['0'.repeat(size)], {type})
  blob.lastModifiedDate = lastModified
  return new File([blob], name)
}

beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {})
})

afterEach(() => {
  console.warn.mockRestore()
})

// For each event type, we assert that the right events are being triggered
// when the associated fireEvent method is called.
eventTypes.forEach(({type, events, elementType = 'input', init}) => {
  describe(`${type} Events`, () => {
    events.forEach(eventName => {
      it(`triggers ${eventName}`, async () => {
        const testId = `${type}-${eventName}`
        const spy = jest.fn()

        // Render an element with a listener of the event under testing and a
        // test-id attribute, so that we can get the DOM node afterwards.
        const {getByTestId} = render({
          render(h) {
            return h(elementType, {
              on: {
                [eventName.toLowerCase()]: spy,
              },
              attrs: {
                'data-testid': testId,
              },
            })
          },
        })

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

  const {getByRole} = render({
    render(h) {
      return h('button', {
        on: {dblclick: spy},
      })
    },
  })

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
const typingEvents = ['input', 'change']
typingEvents.forEach(event => {
  test(`fireEvent.${event} prints a warning message to use fireEvent.update instead`, async () => {
    const {getByTestId} = render({
      template: `<input type="text" data-testid=test-${event}></input>`,
    })

    await fireEvent[event](getByTestId(`test-${event}`), 'hello')

    expect(console.warn).toHaveBeenCalledTimes(1)
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining(
        `Using "fireEvent.${event} may lead to unexpected results. Please use fireEvent.update() instead.`,
      ),
    )
  })
})
test('fireEvent.update does not trigger warning messages', async () => {
  const {getByTestId} = render({
    template: `<input type="text" data-testid=test-update></input>`,
  })

  await fireEvent.update(getByTestId('test-update'), 'hello')

  expect(console.warn).not.toHaveBeenCalled()
})

test('fireEvent.update should not crash with input file', async () => {
  const spy = jest.fn()

  const {getByTestId} = render({
    render(h) {
      return h('input', {
        on: {
          change: spy,
        },
        attrs: {
          type: 'file',
          'data-testid': 'test-update',
        },
      })
    },
  })

  // should expect an array of list since it's a fileList
  await fireEvent.update(getByTestId('test-update'), [
    mockFile({name: 'random.txt', size: 524288}),
  ])

  expect(spy).toHaveBeenCalledTimes(1)
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
