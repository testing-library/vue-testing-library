import {render} from '../../src'
import '../../src/extend-expect'

import {
  Empty,
  Attribute,
  GetByAltText,
  LabelText,
  LabelWithNoFormControl,
  Placeholder,
  TotallyEmptyLabel,
  AltText,
  JestHelpers
} from './components/queries'

test('query can return null', () => {
  const {
    queryByLabelText,
    queryByPlaceholderText,
    queryByText,
    queryByTestId,
    queryByAltText,
  } = render(Empty)
  expect(queryByTestId('LucyRicardo')).toBeNull()
  expect(queryByLabelText('LucyRicardo')).toBeNull()
  expect(queryByPlaceholderText('LucyRicardo')).toBeNull()
  expect(queryByText('LucyRicardo')).toBeNull()
  expect(queryByAltText('LucyRicardo')).toBeNull()
})

test('get throws a useful error message', () => {
  const {
    getByLabelText,
    getByPlaceholderText,
    getByText,
    getByTestId,
    getByAltText,
  } = render(Empty)
  expect(() => getByLabelText('LucyRicardo')).toThrowErrorMatchingSnapshot()
  expect(() =>
    getByPlaceholderText('LucyRicardo'),
  ).toThrowErrorMatchingSnapshot()
  expect(() => getByText('LucyRicardo')).toThrowErrorMatchingSnapshot()
  expect(() => getByTestId('LucyRicardo')).toThrowErrorMatchingSnapshot()
  expect(() => getByAltText('LucyRicardo')).toThrowErrorMatchingSnapshot()
})

test('get can get form controls by label text', () => {
  const {getByLabelText} = render(LabelText)
  expect(getByLabelText('1st').id).toBe('first-id')
  expect(getByLabelText('2nd').id).toBe('second-id')
  expect(getByLabelText('3rd').id).toBe('third-id')
})

test('get can get form controls by placeholder', () => {
  const {getByPlaceholderText} = render(Placeholder)
  expect(getByPlaceholderText('username').id).toBe('username-id')
})

test('label with no form control', () => {
  const {getByLabelText, queryByLabelText} = render(LabelWithNoFormControl)
  expect(queryByLabelText('alone')).toBeNull()
  expect(() => getByLabelText('alone')).toThrowErrorMatchingSnapshot()
})

test('totally empty label', () => {
  const {getByLabelText, queryByLabelText} = render(TotallyEmptyLabel)
  expect(queryByLabelText('')).toBeNull()
  expect(() => getByLabelText('')).toThrowErrorMatchingSnapshot()
})

test('get element by its alt text', () => {
  const {getByAltText} = render(GetByAltText)
  expect(getByAltText(/fin.*nem.*poster$/i).src).toBe('/finding-nemo.png')
})

test('using jest helpers to assert element states', () => {
  const {queryByTestId} = render(JestHelpers)

  // other ways to assert your test cases, but you don't need all of them.
  expect(queryByTestId('count-value')).toBeInTheDOM()
  expect(queryByTestId('count-value1')).not.toBeInTheDOM()
  expect(queryByTestId('count-value')).toHaveTextContent('2')
  expect(queryByTestId('count-value')).not.toHaveTextContent('21')
  expect(() =>
    expect(queryByTestId('count-value2')).toHaveTextContent('2'),
  ).toThrowError()

  // negative test cases wrapped in throwError assertions for coverage.
  expect(() =>
    expect(queryByTestId('count-value')).not.toBeInTheDOM(),
  ).toThrowError()
  expect(() =>
    expect(queryByTestId('count-value1')).toBeInTheDOM(),
  ).toThrowError()
  expect(() =>
    expect(queryByTestId('count-value')).toHaveTextContent('3'),
  ).toThrowError()
  expect(() =>
    expect(queryByTestId('count-value')).not.toHaveTextContent('2'),
  ).toThrowError()
})

test('using jest helpers to check element attributes', () => {
  const {queryByTestId} = render(Attribute)

  expect(queryByTestId('ok-button')).toHaveAttribute('disabled')
  expect(queryByTestId('ok-button')).toHaveAttribute('type')
  expect(queryByTestId('ok-button')).not.toHaveAttribute('class')
  expect(queryByTestId('ok-button')).toHaveAttribute('type', 'submit')
  expect(queryByTestId('ok-button')).not.toHaveAttribute('type', 'button')

  expect(() =>
    expect(queryByTestId('ok-button')).not.toHaveAttribute('disabled'),
  ).toThrowError()
  expect(() =>
    expect(queryByTestId('ok-button')).not.toHaveAttribute('type'),
  ).toThrowError()
  expect(() =>
    expect(queryByTestId('ok-button')).toHaveAttribute('class'),
  ).toThrowError()
  expect(() =>
    expect(queryByTestId('ok-button')).not.toHaveAttribute('type', 'submit'),
  ).toThrowError()
  expect(() =>
    expect(queryByTestId('ok-button')).toHaveAttribute('type', 'button'),
  ).toThrowError()
})

/* eslint jsx-a11y/label-has-for:0 */
