<script setup>
import NavBar from './components/navBarComponent.vue'
import Footer from './components/footerComponent.vue'
</script>

<template>
  <NavBar :authenticated="true"></NavBar>

  <router-view></router-view>

  <Footer></Footer>
</template>

<script></script>
