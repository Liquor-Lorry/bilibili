<template>
  <div>
    <div class="loginTop">
      <div></div>
      <div>{{middleTop}}</div>
      <div>
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['middleTop'],
   data() {
      return {
      }
   },
}
</script>

<style lang="less">
.loginTop {
  height: 12.5vw;
  background-color: #fff;
  display: flex;
  div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4.444vw;
  }
}
</style>
