<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="header">
    <img class="logo" src="@/assets/TSMC_logo.png" width="125" height="125" />

    <div >
      <div></div>
      <nav  >
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </div>

  <RouterView />
</template>

<style>
.header {
  width: 100%;
  height:125px;
  background-color: #97CBFF ;
}
</style>
