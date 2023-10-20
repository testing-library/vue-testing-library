import {defineComponent} from 'vue'
import '@testing-library/jest-dom'
import {render, fireEvent} from '..'

const ModalButton = defineComponent({
  data() {
    return {
      modalOpen: false,
    }
  },

  template: `
    <button @click="modalOpen = true">open</button>

    <teleport to="body">
      <div v-if="modalOpen" data-testid="teleported-modal">
        This is a teleported modal!
        <button @click="modalOpen = false">close</button>
      </div>
    </teleport>
  `,
})

test('Teleport', async () => {
  const {queryByText, getByText} = render(ModalButton)

  expect(queryByText('This is a teleported modal!')).not.toBeInTheDocument()

  // Open the modal
  await fireEvent.click(getByText('open'))

  const modal = getByText('This is a teleported modal!')

  expect(modal).toBeInTheDocument()
  expect(modal.parentNode.nodeName).toBe('BODY')

  // Close the modal
  await fireEvent.click(getByText('close'))

  expect(queryByText('This is a teleported modal!')).not.toBeInTheDocument()
})
