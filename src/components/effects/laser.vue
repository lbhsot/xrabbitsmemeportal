<template>
  <div class="laser" :style="style" >
    <div
      class="circle-laser"
      :style="{
        background: colors.length > 0 ? colors[0] : '#FFF',
        boxShadow: `1px 1px 5px 5px ${colors.length > 1 ? colors[1] : '#F90C20'}`,
      }"
    />
    <div
      class="line-laser"
      :style="{
        background: colors.length > 0 ? colors[0] : '#FFF',
        boxShadow: `1px 10px 5px 5px ${colors.length > 1 ? colors[1] : '#F90C20'}`,
      }"
    />
  </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    style: Object,
    colors: Array[String],
  },
})
export default class Laser extends Vue {
}
</script>

<style lang="scss" scoped>
.laser {
  position: absolute;
  display: flex;
  height: 1100px;
  flex-direction: column;
  align-items: center;
  transform: rotate(55deg);
  transform-origin: top;
  filter: blur(1px);
  top: 50%;
  left: 50%;

  .circle-laser {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background: white;
    box-shadow: 1px 1px 5px 5px #F90C20;
  }

  .line-laser {
    width: 20px;
    height: 1060px;
    background: white;
    margin-top: -10px;
    box-shadow: 1px 10px 5px 5px #F90C20;
  }
}
</style>
