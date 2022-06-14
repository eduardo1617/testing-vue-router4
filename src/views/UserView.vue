<template>
  <div>
    <h1>Welcome {{ user }}</h1>
    <p>
      <router-link
        :to="{
          name: 'invoices',
        }"
        >Invoices</router-link
      >
    </p>
    <button @click="logOut" class="btn">Log out</button>
  </div>
</template>

<script setup>
import store from "../store";
import router from "../router";
const { user } = store;

const logOut = () => {
  store.user = null;
  router.push("/");
};
</script>

<style lang="scss" scoped></style>
