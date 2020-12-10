import ElementPlus from 'element-plus'
import {defineComponent} from 'vue'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import {render, screen, waitFor} from '..'

const Component = defineComponent({
  template: `
    <el-popover trigger="hover" content="this is content">
      <template #reference>
        <el-button>Hover to activate</el-button>
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

  const button = screen.getByText('Hover to activate')
  const getContent = () => screen.getByText('this is content')

  expect(getContent()).toBeInTheDocument()
  expect(getContent()).not.toBeVisible()

  userEvent.hover(button)

  await waitFor(() => expect(getContent()).toBeVisible())

  userEvent.unhover(button)

  await waitFor(() => expect(getContent()).not.toBeVisible())
})
