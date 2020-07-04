<template>
  <div class="btnParent" @click="registerClick">
    <div class="loginBtn">
      {{btnText}}
    </div>
  </div>
</template>

<script>
export default {
  props: ['btnText'],
   data() {
      return {
        
      }
   },
   methods: {
     registerClick() {
       //发送一个点击事件到父组件
       this.$emit('registerSubmit')
     }
   }
}
</script>

<style lang="less">
  .btnParent {
    padding: 4.167vw 2.778vw;
  }
  .loginBtn {
    height: 12.5vw;
    background-color: #ff9da5;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6.25vw;
    font-size: 4.444vw;
  }
</style>
