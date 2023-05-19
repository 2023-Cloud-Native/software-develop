<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <RouterLink to="/">
      <img class="TSMC logo" src="@/assets/TSMC_logo.png" width="100" height="100" />
    </RouterLink>
    <div class="title"> 廠區能源使用狀況</div>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">總覽</RouterLink>
        <RouterLink to="/power">電力</RouterLink>
        <RouterLink to="/water">水利</RouterLink>
        <RouterLink to="/earthquake">地震</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
header {
  width: 100%;
  height: 140px;
  background-color: #97CBFF ;
  display: flex;
}


.TSMC{
  justify-content: flex-start;
  display: flex;
  margin-top: 20px;
  margin-left: 100px;
}

.title{
  width: 700px;
  text-align: center;
  margin: 40px;
  font-size: 40px;
}

.wrapper{
  display: flex;
  justify-content: flex-end;
  line-height: 25px;
  width: 100%;
}
nav {
  width: 100%;
  font-weight: normal;
  text-align: center;
  margin-top: 50px;
  justify-content: flex-end;
  display: flex;
  margin-right: 50px;
}

a{
  text-decoration: none !important;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

</style>
