<template>
  <div @click="bannerClick">
    <div class="editBanner">
      <span>{{left}}</span>
      <span>
        <slot name="right"></slot>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['left'],
   data() {
      return {

      }
   },
   methods: {
     bannerClick() {
       this.$emit('bannerClick')
     }
   }
}
</script>

<style lang="less">
  .editBanner {
    background-color: #fff;
    padding: 10px;
    color: #555;
    font-size: 3.889vw;
    border-bottom: 0.278vw solid #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
