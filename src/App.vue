<template>
  <div class="mobile-container">
    <HeaderComponent />
    <div class="container">
      <RouterView />
    </div>
  </div>
</template>

<style>
@import "./assets/base.css";
.mobile-container {
  background: #f3f6fb;
  border: 1px solid #eee;
  border-radius: 15px;
  overflow: hidden;
  margin: 30px auto;
  width: 400px;
  box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.1);
}
.container {
  padding: 15px;
}
</style>
