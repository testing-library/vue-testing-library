import { render } from '@testing-library/vue'
import '@testing-library/jest-dom'
import { uppercaseDirective } from './directives/uppercase-directive'
import Directive from './components/Directive'

// We are about to test an easy vue directive, that we have implemented,
// named v-uppercawse.
test('Component with a custom directive', () => {
  // Do not forget to add the new custom directive to the render function as
  // the third parameter.
  const { queryByText } = render(Directive, {}, vue =>
    vue.directive('uppercase', uppercaseDirective)
  )

  // Test that the text in lower case does not appear in the DOM
  expect(queryByText('example text')).not.toBeInTheDocument()

  // Test that the text in upper case does appear in the DOM thanks to the directive
  expect(queryByText('EXAMPLE TEXT')).toBeInTheDocument()
})
