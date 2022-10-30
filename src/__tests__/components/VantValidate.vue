<script setup>
import { ref, reactive } from 'vue';

const loginForm = reactive({
  username: '',
  password: '',
});

const msg = ref('empty')

const submitLogin = async () => {
  msg.value = 'validation passed';
}
</script>

<template>
  <div>
    <van-form data-testid="form" @submit="submitLogin">
      <van-cell-group inset>
        <van-field
          v-model="loginForm.username"
          label="username"
          placeholder="username"
          :rules="[{ required: true, message: 'please input username' }]"
        />
        <van-field
          v-model="loginForm.password"
          type="password"
          label="password"
          placeholder="password"
          :rules="[{ required: true, message: 'please input password' }]"
        />
      </van-cell-group>
      <div>
        <van-button
          native-type="submit"
        >
          login
        </van-button>
      </div>
    </van-form>
  </div>
  <span>{{ msg }}</span>
</template>