import '@testing-library/jest-dom'
import ElementPlus from 'element-plus'
import userEvent from '@testing-library/user-event'
import {defineComponent} from 'vue'
import {render, screen, fireEvent, waitFor} from '..'
import {store} from './components/Store/store'

test('setting a plugin + a custom option such as store sets both plugins', async () => {
  const ComponentWithStore = defineComponent({
    template: `
      <el-popover trigger="hover" content="this is content">
        <template #reference>
          <el-button @click="$store.dispatch('increment')">
            Hover to activate
          </el-button>
        </template>
      </el-popover>
      <span data-testid="count-value">{{ $store.state.count }}</span>
    `,
  })

  render(ComponentWithStore, {
    store,
    global: {
      plugins: [ElementPlus],
    },
  })

  const button = screen.getByText('Hover to activate')
  userEvent.hover(button)

  await waitFor(() => expect(screen.getByText('this is content')).toBeVisible())

  expect(screen.getByTestId('count-value')).toHaveTextContent('0')

  await fireEvent.click(button)

  expect(screen.getByTestId('count-value')).toHaveTextContent('1')
})
