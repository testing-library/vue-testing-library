import {render} from '@testing-library/vue'
import '@testing-library/jest-dom'
import {uppercaseDirective} from './directives/uppercase-directive'
import ComponentUsingDirective from './components/Directive'

test('Component with a custom directive', () => {
  const {queryByText, getByText} = render(ComponentUsingDirective, {
    global: {
      directives: {uppercase: uppercaseDirective},
    },
  })

  // Test that the text in lower case does not appear in the DOM
  expect(queryByText('example text')).not.toBeInTheDocument()

  // Test that the text in upper case does appear in the DOM thanks to the directive
  expect(getByText('EXAMPLE TEXT')).toBeInTheDocument()
})
