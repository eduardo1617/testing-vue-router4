<template>
  <div class="home">
    <h1>All Destinations</h1>
    <div class="destinations">
      <div v-for="destination in destinations" :key="destination.name">
        <router-link
          :to="{
            name: 'DestinationDetails',
            params: { slug: destination.slug },
          }"
        >
          <h2>{{ destination.name }}</h2>
        </router-link>
        <figure>
          <router-link
            :to="{
              name: 'DestinationDetails',
              params: { slug: destination.slug },
            }"
          >
            <img
              :src="getImageUrl(destination.image)"
              :alt="destination.name"
            />
            <!-- :src="require(`@/assets/${destination.image}`)" -->
          </router-link>
        </figure>
      </div>
    </div>
  </div>
</template>

<script setup>
import store from "@/store.js";

const { destinations } = store;

const getImageUrl = (url) => {
  return new URL(`../assets/${url}`, import.meta.url).href;
};
</script>

<style scoped>
.home {
  max-width: 1400px;
  margin: 0 auto;
}
img {
  max-width: 200px;
}
.destinations {
  display: flex;
  justify-content: space-between;
}

a {
  color: lightseagreen;
  text-decoration: none;
}
a:hover,
a:visited {
  text-decoration: underline;
}
</style>
