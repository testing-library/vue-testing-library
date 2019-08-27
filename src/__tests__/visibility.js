import {render, fireEvent} from '@testing-library/vue'
import '@testing-library/jest-dom/extend-expect'
import Collapsible from './components/Collapsible'

test('Collapsible component', async () => {
  const {getByText} = render(Collapsible)

  // Check that text element is not initially visible
  expect(getByText('Text')).not.toBeVisible()

  // Click button in order to display the collapsed text element
  const button = getByText('Click me')
  await fireEvent.click(button)

  // Check that text element is visible
  expect(getByText('Text')).toBeVisible()

  // Click button to hide the visible text element
  await fireEvent.click(button)

  // Check that text element is not visible again
  expect(getByText('Text')).not.toBeVisible()
})
