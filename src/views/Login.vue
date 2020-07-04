<template>
  <div>
    <login-top middleTop="登录bilibili">
      <div class="right" slot="right" @click="$router.push('/register')">切换到注册页面</div>
    </login-top>

    <login-text class="num" label="账号" placeholder="请输入账号"
                @inputChange='content => model.username = content' />
    <login-text class="pwd" label="密码" type="password" placeholder="请输入密码"
                @inputChange='content => model.password = content' />

    <login-btn btnText="登录" @registerSubmit="loginSubmit"></login-btn>
  </div>
</template>

<script>
import LoginTop from '@/components/common/LoginTop'
import LoginText from '@/components/common/LoginText'
import LoginBtn from '@/components/common/LoginBtn'
export default {
  name: "Register",
  components: {
    LoginTop,
    LoginText,
    LoginBtn
  },
  data() {
      return {
        model: {
          username: '',
          password: ''
        }
      }
  },
  methods: {
    async loginSubmit() {
      //console.log('发送成功');
      //父组件接收并发起请求
      let rule = /^.{6,16}$/
      if(rule.test(this.model.username) && rule.test(this.model.password)){
        //console.log('正则校验成功，可以注册');
        const res = await this.$http.post('/login', this.model)
        //console.log(res);
        //console.log('第二次执行');
        this.$msg.success(res.data.msg)
        if(res.data.code == 301 || res.data.code == 302){
          return
        }
        //console.log(res);
        localStorage.setItem('id', res.data.id)
        localStorage.setItem('token', res.data.token)
        setTimeout(() => {
          this.$router.push('/userinfo')
        }, 1000)
      }else{
        this.$msg.fail('格式错误，请重新输入')
      }
    }
  }
}
</script>

<style scoped>
  .right {
    font-size: 3.333vw;
  }
  .num,.pwd {
    padding: 15px 0 0 0;
  }
</style>
