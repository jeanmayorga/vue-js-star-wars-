<template>
  <div class="heading">
    <h2>People {{ count > 1 ? count : null }}</h2>
    <p>A character within the Star Wars universe.</p>
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
      <div class="item" v-for="person in people" :key="person.name">
        {{ person.name }}
      </div>
    </div>
  </div>
  <el-pagination
    layout="prev, pager, next"
    :total="count"
    @current-change="onPageChange"
    :disabled="isLoading"
  />
</template>

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
}
.item:hover {
  border: 1px solid #66b1ff;
  transition: all 0.3s;
  cursor: pointer;
}
.item-skeleton {
  background: #f2f2f2;
  display: inline-block;
  height: 18px;
  width: 100%;
}
.el-pagination {
  justify-content: center;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { api } from "@/api";
import type { Person } from "@/types";

interface Data {
  isLoading: boolean;
  count: number;
  people: Person[];
}

export default defineComponent({
  data(): Data {
    return {
      isLoading: true,
      count: 0,
      people: [],
    };
  },
  async mounted() {
    const { data } = await api.get("/people");
    this.isLoading = false;
    this.people = data.results;
    this.count = data.count;
  },
  methods: {
    async onPageChange(page: number) {
      this.isLoading = true;
      const { data } = await api.get(`/people?page=${page}`);
      this.isLoading = false;
      this.people = data.results;
    },
  },
});
</script>
