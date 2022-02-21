<template>
  <header>
    <div class="content">
      <h1>Star Wars</h1>
      <p>A VueJs App</p>
    </div>

    <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
      <el-tab-pane label="People" name="people" />
      <el-tab-pane label="Planets" name="planets" />
      <el-tab-pane label="Films" name="films" />
      <el-tab-pane label="Epecies" name="species" />
      <el-tab-pane label="Vehicles" name="vehicles" />
      <el-tab-pane label="Starships" name="starships" />
    </el-tabs>
  </header>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const activeName = ref("people");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleClick(pane: any) {
  const name = pane.props.name;
  router.push(`/${name}`);
}
</script>
<style>
header {
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
}
.content {
  padding: 30px 15px;
}
.tabs .el-tabs__header {
  margin: 0;
  border-top: 1px solid #e4e7ed;
}
.tabs .el-tabs__nav-scroll {
  padding: 0 15px;
}
.tabs .el-tabs__nav-wrap::after {
  display: none;
}
.tabs .el-tabs__item {
  font-weight: 700;
  color: #9ea3af;
}
.tabs .el-tabs__item:hover,
.tabs .el-tabs__item.is-active {
  color: #14153a;
}
</style>
