<template>
  <section>
    <h2>{{ experience().name }}</h2>
    <div class="experience-details">
      <img :src="`${getExperienceImageUrl()}`" :alt="experience().name" />
      <p>{{ experience().description }}</p>
    </div>
  </section>
</template>

<script setup>
import store from "../store";

const values = defineProps({
  slug: {
    type: String,
    require: true,
  },
  experienceSlug: {
    type: String,
    require: true,
  },
});

const destination = () => {
  return store.destinations.find(
    (destination) => destination.slug === values.slug
  );
};

const experience = () => {
  return destination().experiences.find(
    (experience) => experience.slug === values.experienceSlug
  );
};

const getExperienceImageUrl = () => {
  return new URL(`../assets/${experience().image}`, import.meta.url).href;
};
</script>

<style scoped>
img {
  max-width: 600px;
  height: auto;
  width: 100%;
  max-height: 400px;
}
.experience-details {
  display: flex;
  justify-content: space-between;
  padding: 40px 0;
}
p {
  margin: 0 40px;
  font-size: 20px;
  text-align: left;
}
</style>
