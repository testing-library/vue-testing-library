import '@testing-library/jest-dom/extend-expect'
import {render, wait} from '@testing-library/vue'
import {value as valueDirective} from './components/directives/v-value'
import CompWithDirective from './components/CompWithDirective.vue'

test('element should have the same value as the directive', async () => {
  const value = 'test'
  const {container, updateProps} = render(
    CompWithDirective,
    {props: {value}},
    vue => vue.directive('value', valueDirective),
  )
  await wait()
  expect(container.firstChild).toHaveValue(value)
  const anotherValue = 'another'
  await updateProps({value: anotherValue})
  expect(container.firstChild).toHaveValue(anotherValue)
})
