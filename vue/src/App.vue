<template>
    <PageLoader />
    <router-view></router-view>
</template>

<script setup>
import PageLoader from "./components/PageLoader.vue";
</script>

<style>

html {
  scroll-behavior: smooth;
}

textarea {
  resize: none;
}

img[lazy="loading"] {
  width: 10%;
  object-fit: contain;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
