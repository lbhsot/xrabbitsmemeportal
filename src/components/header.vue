<template>
  <div class="header">
    <div class="title">
      <img src="../assets/logo.png" alt="XRC TO THE MOON" class="logo"/>
      X Rabbits Club
    </div>
  </div>
</template>

<script>
import { Vue } from 'vue-class-component';

export default class Header extends Vue {
}
</script>

<style lang="scss" scoped>
.header {
  background: rgba(153,41,234, .4);
  display: flex;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  align-items: center;
  justify-content: center;
  .title {
    font-size: 20px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    .logo {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
  }
}
</style>
