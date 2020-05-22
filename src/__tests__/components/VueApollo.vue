<template>
  <div>
    <div v-if="$apollo.queries.user.loading">Loading</div>
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
import {userQuery, updateUserMutation} from './VueApollo/queries'

export default {
  apollo: {
    user: {
      query: userQuery,
      variables() {
        return {id: this.id}
      },
    },
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      user: null,
      email: '',
    }
  },
  methods: {
    async updateUser() {
      const {
        data: {
          updateUser: {email},
        },
      } = await this.$apollo.mutate({
        mutation: updateUserMutation,
        variables: {
          input: {
            email: this.email,
            id: this.id,
          },
        },
      })

      this.user.email = email
    },
  },
}
</script>
