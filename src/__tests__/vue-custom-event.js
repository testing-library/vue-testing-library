import {render, fireEvent} from '@testing-library/vue'
import '@testing-library/jest-dom/extend-expect'
import Component from './components/WithChildComponent/Parent.vue'

test('Custom vue events handling', async () => {
  const payload = {foo: 'bar'}
  const {getByTestId, emitted} = render(Component)

  expect(emitted.custom).toBeUndefined()

  await fireEvent.emit(getByTestId('child'), 'custom', payload)

  expect(emitted().custom).toEqual([[payload]])
})
