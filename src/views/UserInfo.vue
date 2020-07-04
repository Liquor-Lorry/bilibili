<template>
  <div class="userInfo">
    <nav-bar></nav-bar>
    
    <img class="bgcImg" src="@/assets/bannerTop_new.png" alt="">

    <user-detail :userInfo="model"></user-detail>

    <user-article></user-article>
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar'
import UserDetail from '@/components/userComponent/UserDetail'
import UserArticle from '@/components/userComponent/UserArticle'
export default {
  components: {
    NavBar,
    UserDetail,
    UserArticle
  },
  data() {
    return {
      model: {}
    }
  },
  created() {
    this.userInfoData()
  },
  methods: {
    async userInfoData() {
      const res = await this.$http.get('/user/' + localStorage.getItem('id'))
      this.model = res.data[0]
      //console.log(res);
    }
  }
}
</script>

<style lang="less">
  .userInfo {
    .bgcImg {
      width: 100%;
      height: 91px;
    }
  }
</style>
