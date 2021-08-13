<template>
  <metainfo>
    <template v-slot:title="{ content }">{{
      content ? `${content} - ${SITE_NAME}` : SITE_NAME
    }}</template>
  </metainfo>
  <div class="flex flex-col min-h-screen">
    <div
      class="
        h-32
        bg-gray-700
        text-gray-200
        flex
        items-center
        justify-center
        uppercase
        text-4xl
        font-bold
        select-none
        underline
      "
    >
      <router-link to="/">wchr.aun</router-link>
    </div>
    <div class="flex-grow p-2 md:p-8 bg-gray-800 text-gray-200">
      <router-view />
    </div>
    <div class="text-gray-200 bg-gray-700 p-4 text-center text-xs">
      Copyright©2021 | WCHRAUN. All Rights Reserved | GitHub:
      <a class="underline" href="https://github.com/wchr-aun/wchr.aun"
        >wchraun</a
      >
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "App",
  components: {},
  data() {
    return {
      SITE_NAME: "wchr.aun",
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
body {
  font-family: "Montserrat", sans-serif !important;
}
</style>
