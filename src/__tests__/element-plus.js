import ElementPlus from 'element-plus'
import {defineComponent} from 'vue'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import {render, screen, waitFor} from '..'

const Component = defineComponent({
  template: `
    <el-popover trigger="click" content="this is content">
      <template #reference>
        <el-button>Click to activate</el-button>
      </template>
    </el-popover>
  `,
})

test('Stubs out a component', async () => {
  render(Component, {
    global: {
      plugins: [ElementPlus],
    },
  })

  const button = screen.getByRole('button')
  const getContent = () => screen.getByText('this is content')

  expect(getContent()).toBeInTheDocument()
  expect(getContent()).not.toBeVisible()

  userEvent.click(button)

  await waitFor(() => expect(getContent()).toBeVisible())

  userEvent.click(button)

  await waitFor(() => expect(getContent()).not.toBeVisible())
})
