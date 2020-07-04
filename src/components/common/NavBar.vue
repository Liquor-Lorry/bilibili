<template>
  <div class="navbar">
    <div class="logo">
      <img src="@/assets/logo.png" @click="$router.push('/')" />
    </div>
    <div class="search">
      <p>
        您想要搜索？
        <van-icon class="icon" name="search" />
      </p>
    </div>
    <div class="avatar"> 
      <img v-if="imgUrl" :src="imgUrl" @click="$router.push('/userinfo')" />
      <img v-else src="@/assets/hg.jpg" @click="$router.push('/login')"/>
      <p>下载App</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
        imgUrl: ''
      }
  },
  methods:{
    async NavInit() {
      //判断 有token的时候才发起请求
      if(localStorage.getItem('token')){
        const res = await this.$http.get('/user/' + localStorage.getItem('id'))
        this.imgUrl = res.data[0].user_img
      }
    }
  },
  mounted() {
    this.NavInit()
  }
}
</script>

<style lang="less">
  .navbar {
    height: 12.5vw;
    background-color: #fff;
    display: flex;
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 25vw;
      img {
        width: 100%;
      }
    }
    .search {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 1.389vw;
      p {
        background-color: #f4f4f4;
        width: 7.222vw;
        font-size: 3.333vw;
        line-height: 7.778vw;
        padding-left: 8.333vw;
        color: #aaa;
        width: 90%;
        border-radius: 2.778vw;
        position: relative;
        .icon {
          position: absolute;
          left: 2.778vw;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    .avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 6.667vw;
        height: 6.667vw;
      }
      p {
        padding: 1.111vw 2.222vw;
        margin: 0 2.222vw;
        background-color: #fb7299;
        border-radius: 0.833vw;
        color: #fff;
        font-size: 3.333vw;
      }
    }
  }
</style>
