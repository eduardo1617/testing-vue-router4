<template>
  <div class="login">
    <h1>Login</h1>
    <div class="form">
      <label for="username">Username</label>
      <input v-model="username" type="text" name="username" class="input" />
      <label for="password">Password</label>
      <input v-model="password" type="password" class="input" />
      <button @click="login" class="btn">Login</button>
    </div>
  </div>
</template>

<script setup>
import store from "../store";
import { ref } from "vue";
import router from "../router";
import { useRoute } from "vue-router";

const route = useRoute();
const username = ref(null);
const password = ref(null);

const login = () => {
  store.user = username.value;
  const redirectPath = route.query.redirect || "/";
  router.push(redirectPath);
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
}
</style>
