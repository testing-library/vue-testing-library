import {gql} from 'apollo-boost'

export const getUserQuery = gql`
  query getUser($id: String!) {
    user(id: $id) {
      id
      email
    }
  }
`
export const updateUserMutation = gql`
  mutation updateUser($data: UpdateUserInput) {
    updateUser(input: $data) {
      id
      email
    }
  }
`
