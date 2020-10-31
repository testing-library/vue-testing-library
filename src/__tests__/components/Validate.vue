<template>
  <Form>
    <Field :rules="validateEmail" name="email" as="input" type="email" />

    <error-message name="email" data-testid="error-message" />

    <button>Sign up</button>
  </Form>
</template>

<script>
import {Form, Field, ErrorMessage} from 'vee-validate'

export default {
  name: 'VeeValidate',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  methods: {
    validateEmail(value) {
      if (!value) {
        return 'This field is required'
      }

      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return 'This field must be a valid email'
      }

      return true
    },
  },
}
</script>
