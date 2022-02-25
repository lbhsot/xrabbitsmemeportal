<template>
  <div class="home">
    <Header />
    <ImageGenerator msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ImageGenerator from '@/components/ImageGenerator.vue';
import Header from '@/components/header.vue'; // @ is an alias to /src

@Options({
  components: {
    Header,
    ImageGenerator,
  },
})
export default class HomeView extends Vue {}
</script>

<style scoped lang="scss">
.home {
  min-height: 100vh;
  background: url("https://xrabbits.club/_next/static/media/banner_bg@2x.f9b1a8e3e9306be1930cb3bafd6a1182.jpg") repeat-y;
}
</style>
