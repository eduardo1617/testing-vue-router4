<template>
  <span class="go-back">
    <button @click="$router.go(-1)">go back</button>
  </span>
</template>

<script setup></script>

<style scoped>
.go-back {
  display: flex;
  cursor: pointer;
}
button {
  border: 0;
}
</style>
