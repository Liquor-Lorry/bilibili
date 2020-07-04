<template>
  <div class="comment">
    <p class="c_title">
      <span class="c_text">评论</span>
      <span class="c_num">({{dataLength}})</span>
    </p>
    <div class="c_avatar">
      <img v-if="myuser" :src="myuser.user_img" >
      <img v-else src="@/assets/hg.jpg" >
      <input v-model="comContent" ref="postInput" type="text" placeholder="说点什么吧">
      <button @click="commentPublish">发表</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['dataLength'],
  data() {
      return {
        myuser: null,
        comContent: ''
      }
  },
  methods: {
    //个人信息数据
    async myUserData() {
      const res = await this.$http.get(`/user/${localStorage.getItem('id')}`)
      //console.log(res);
      this.myuser = res.data[0]
    },
    commentPublish() {
      //如果内容为空就不能评论
      if(this.comContent == "") {
        this.$msg.fail('评论内容不能为空')
      }else{
        //判断有没有获取到数据
        if(!this.myuser && !localStorage.getItem('token') && !localStorage.getItem('id')) {
          this.$msg.fail('请先登录')
          return
        }
        //发送一个事件给父组件来处理(发布一级评论)
        this.$emit('postComment', this.comContent)
      }
      //console.log('聚焦了');
      this.comContent = ''
    },
    focusInput() {
      //console.log(this.$refs.postInput);
      //组件更新后让它聚焦
      this.$refs.postInput.focus()
    }
  },
  created() {
    //判断 有token的时候才发起请求
    if(localStorage.getItem('token')){
      this.myUserData()
    }
  },
  updated() {
    this.focusInput()
  }
}
</script>

<style lang="less">
  .comment {
    padding: 8.333vw 2.778vw 0 2.778vw;
    font-size: 4.167vw;
    .c_title {
      .c_num {
        color: #aaa;
        margin-left: 2.778vw;
      }
    }
    .c_avatar {
      padding: 2.778vw 0;
      display: flex;
      img {
        width: 7.778vw;
        height: 7.778vw;
        border-radius: 50%;
      }
      input {
        outline: none;
        border: 0;
        border-radius: 4.167vw;
        background-color: #f4f4f4;
        font-size: 3.333vw;
        padding: 0 11.111vw 0 5.556vw;
        margin-left: 5vw;
      }
      button {
        outline: none;
        border: 0;
        border-radius: 3.889vw;
        background-color: #fb7299;
        color: #fff;
        padding: 0 4.167vw;
        font-size: 3.511vw;
        margin-left: 7.989vw;
      }
    }
  }
</style>
