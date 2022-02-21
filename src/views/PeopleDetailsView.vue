<template>
  <div v-show="isLoading">
    <div>Loading....</div>
  </div>

  <div v-show="!isLoading">
    <div class="heading">
      <h2>{{ person?.name }}</h2>
      <p><strong>height:</strong> {{ person?.height }}</p>
      <p><strong>birth_year:</strong> {{ person?.birth_year }}</p>
      <p><strong>eye_color:</strong> {{ person?.eye_color }}</p>
      <p><strong>gender:</strong> {{ person?.gender }}</p>
      <p><strong>hair_color:</strong> {{ person?.hair_color }}</p>
      <p><strong>mass:</strong> {{ person?.mass }}</p>
      <p><strong>skin_color:</strong> {{ person?.skin_color }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import { useSwapi } from "@/api/useSwapi";
import { useRoute } from "vue-router";
import type { Person } from "@/types";

const route = useRoute();
const id = route.params.id as string;

const isLoading = ref(true);
const person = ref<Person | null>(null);
const hasError = ref(false);

watchEffect(async () => {
  try {
    const { data, error } = await useSwapi({
      path: "people",
      id,
    });

    person.value = data;
    isLoading.value = false;
    hasError.value = error;
  } catch (error) {
    console.log("ERrror", error);
  }
});
</script>

<style></style>
