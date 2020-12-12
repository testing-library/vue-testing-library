<template>
  <div>
    <div v-if="loading">Loading</div> 

    <div v-if="user">
      <div>Email: {{ user.email }}</div>
      <form @submit.prevent="updateUser">
        <div>
          <label for="email-input">Email</label>
          <input id="email-input" v-model="email" type="email" />
        </div>
        <button type="submit">Change email</button>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useQuery, useMutation, useResult } from "@vue/apollo-composable";
import {updateUserMutation, getUserQuery} from './VueApollo/queries'
import {gql} from 'apollo-boost'


export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const email = ref('')
      
    const { result, loading, error } = useQuery(getUserQuery, {id: props.id})
    const user = useResult(result, null, data => data.user)

    const {mutate: updateUser} = useMutation(updateUserMutation, 
        ()=> ({variables: 
          {
            input: {
              email: email.value,
              id: props.id,
            },
          }
        })
    )

    return {
      email,
      user,
      loading,
      error,
      updateUser,
    }
  },
}
</script>
