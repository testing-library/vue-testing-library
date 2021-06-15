import ElementPlus from 'element-plus'
import {defineComponent} from 'vue'
import '@testing-library/jest-dom'
import {render, screen} from '..'

const Component = defineComponent({
  template: `
    <el-alert title="success alert" type="success" />`,
})

test('Renders component from third-party library', async () => {
  render(Component, {
    global: {
      plugins: [ElementPlus],
    },
  })

  expect(screen.getByRole('alert')).toHaveTextContent('success alert')
})
