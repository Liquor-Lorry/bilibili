<template>
  <div>
    <login-top middleTop="注册bilibili">
      <div class="right" slot="right" @click="$router.push('/login')">切换到登录页面</div>
    </login-top>

    <login-text class="name" label="姓名" placeholder="请输入姓名" 
                @inputChange='content => model.name = content' />
    <login-text class="num" label="账号" placeholder="请输入账号"
                @inputChange='content => model.username = content' />
    <login-text class="pwd" label="密码" type="password" placeholder="请输入密码"
                @inputChange='content => model.password = content' />

    <login-btn btnText="注册" @registerSubmit="registerSubmit"></login-btn>
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
          name: '',
          username: '',
          password: ''
        }
      }
  },
  methods: {
    async registerSubmit() {
      //console.log('发送成功');
      //父组件接收并发起请求
      //注意 正则判断不成功是没有数据的 所以当都有数据的时候才能注册成功
      let rule = /^.{4,16}$/
      if(/^.{2,10}$/.test(this.model.name) && rule.test(this.model.username) && rule.test(this.model.password)){
        //console.log('正则校验成功，可以注册');
        const res = await this.$http.post('/register', this.model)
        //console.log(res);
        //console.log('第二次执行');
        this.$msg.success(res.data.msg)
        // 如果注册的账号已存在
        if(res.data.code == 302){
            return
        }
        //将id 和 token储存到本地
        localStorage.setItem('id', res.data.id)
        localStorage.setItem('token', res.data.objtoken)
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
  .name,.num {
    padding: 15px 0 0 0;
  }
</style>
