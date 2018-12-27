import { render, cleanup, fireEvent } from "../../src"
import Form from "./components/Form"

afterEach(cleanup)

test("Form contians with search button", () => {
  const { getByText } = render(Form, {
    stubs: ['font-awesome-icon']
  })
  getByText("Search now")
})
