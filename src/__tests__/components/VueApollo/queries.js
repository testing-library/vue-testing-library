import gql from 'graphql-tag'

export const updateUserMutation = gql`
  mutation updateUser($data: UpdateUserInput) {
    updateUser(input: $data) {
      id
      email
    }
  }
`

export const userQuery = gql`
  query User($id: String!) {
    user(id: $id) {
      id
      email
    }
  }
`
