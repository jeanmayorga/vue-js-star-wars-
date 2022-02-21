<template>
  <div class="heading">
    <h2>People {{ count > 1 ? count : null }}</h2>
    <p>A character within the Star Wars universe.</p>

    <el-input
      v-model="search"
      placeholder="Type something"
      class="search-input"
    />
  </div>

  <div v-show="isLoading">
    <div>
      <div
        class="item"
        v-for="item in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]"
        :key="item"
      >
        <div class="item-skeleton"></div>
      </div>
    </div>
  </div>

  <div v-show="!isLoading">
    <div>
      <router-link
        :to="{ path: `/people/${getIdFromURL(person.url)}` }"
        class="item"
        v-for="person in people"
        :key="person.name"
      >
        <div>
          {{ person.name }}
        </div>
        <div class="item-view">View</div>
      </router-link>
    </div>
  </div>
  <el-pagination
    layout="prev, pager, next"
    :total="count"
    @current-change="onPageChange"
    :disabled="isLoading"
  />
</template>

<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import { useSwapi } from "@/api/useSwapi";
import type { Person } from "@/types";
import { getIdFromURL } from "@/utils";

const isLoading = ref(true);
const count = ref(0);
const people = ref<Person[]>([]);
const search = ref<string | undefined>(undefined);
const page = ref(1);
const hasError = ref(false);

watchEffect(async () => {
  isLoading.value = true;
  const { data, error } = await useSwapi({
    path: "people",
    page: page.value,
    search: search.value,
  });
  isLoading.value = false;
  people.value = data.results;
  count.value = data.count;
  hasError.value = error;
});

function onPageChange(pageNumber: number) {
  page.value = pageNumber;
}
</script>

<style>
.item {
  background: #fff;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 10px;
  color: #333;
  border: 1px solid transparent;
  transition: all 0.3s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  text-decoration: none;
  color: #999;
}
.item:hover {
  border: 1px solid #66b1ff;
  color: #66b1ff;
  transition: all 0.3s;
  cursor: pointer;
}
.item-skeleton {
  background: #f2f2f2;
  display: inline-block;
  height: 18px;
  width: 100%;
}
.item-view {
  font-size: 13px;
  color: #ccc;
}
.item:hover .item-view {
  color: #66b1ff;
}
.el-pagination {
  justify-content: center;
}
.search-input {
  margin-top: 15px;
}
</style>
