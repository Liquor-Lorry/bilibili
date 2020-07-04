<template>
  <div>
     <div class="loginText">
        <van-field v-model="content" required
        :label="label" :type="type" 
        :placeholder="placeholder" :rule="rule" />
      </div>
  </div>
</template>

<script>
export default {
   props: ['label', 'type', 'placeholder', 'rule'],
   data() {
      return {
         content: ''
      }
   },
   watch: {
      content() {
         this.handleRule()
      }
   },
   methods: {
      handleRule() {
         //将字符串正则转化成真正的正则
         const rule = new RegExp(this.rule)
         //console.log(rule);
         //判断content内容是否满足条件
         if(rule.test(this.content)){
            //console.log('校验成功');
            //发送一个事件给父组件
            this.$emit('inputChange', this.content)
         }
      }
   }
}
</script>

<style>

</style>
