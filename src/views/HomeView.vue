<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <ImageGenerator msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ImageGenerator from '@/components/ImageGenerator.vue'; // @ is an alias to /src

@Options({
  components: {
    ImageGenerator,
  },
})
export default class HomeView extends Vue {}
</script>
