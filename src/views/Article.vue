<template>
  <div class="article" v-if="model">

    <nav-bar></nav-bar>

    <div class="detail_info">
      <!-- 播放视频 -->
      <div class="play_video">
        <video controls="controls" :src="model.content"></video>
      </div>
      <!-- 折叠 -->
      <van-collapse v-model="activeNames">
        <van-collapse-item class="video_name" name="1">
          <template #title>
            <div class="video_title">
              <span class="category_name">{{model.category.title}}</span>
              <span class="video_name">{{model.name}}</span>
            </div>
          </template>
          <div class="video_desc">
            <span class="gap color">{{model.userinfo.name}}</span>
            <span class="gap">146.4万观看</span>
            <span class="gap">5281弹幕</span>
            <span class="gap">{{model.date}}</span>
          </div>
        </van-collapse-item>
      </van-collapse>
      <!-- 收藏 -->
      <div class="collect">
        <p @click="collectionClick" :class="{active:collectionActive}">
          <van-icon class="large" name="star" />
          <span class="little">收藏</span>
        </p>
        <p @click="starClick" :class="{active:starActive}">
          <van-icon class="large" name="good-job" />
          <span class="little">点赞</span>
        </p>
        <p>
          <van-icon class="large" name="share" />
          <span class="little">分享</span>
        </p>
      </div>
      <!-- 推荐 -->
      <div class="detailparent">
        <cover class="detailitem" v-for="(item, index) in commendList" :key="index" 
              :detailitem="item"/>
      </div>
      <!-- 评论 -->
      <comment-title :dataLength="lens" @postComment="postSuccess" ref="comTitle"/>
      <comment-content @lengthSelect="len => lens = len"
                       @replay="replayChild" ref="comContent"/>
    </div>
   
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar'
import cover from './cover'
import commentTitle from '@/components/article/commentTitle'
import commentContent from '@/components/article/commentContent'
export default {
  components: {
    NavBar,
    cover,
    commentTitle,
    commentContent
  },
  data() {
    return {
      model: null,
      activeNames: ['1'],
      commendList: null,
      myuser: null,
      lens: null,
      postCom: {
        comment_content: '',
        comment_date: '',
        parent_id: null,
        article_id: null
      },
      collectionActive: false,
      starActive: false
    }
  },
  methods: {
    //视频数据
    async articleData() {
      //console.log(this.$route.params.id);//可以通过路由拿到id
      const res = await this.$http.get(`/article/${this.$route.params.id}`)
      //console.log(res);
      this.model = res.data[0]
      //在这里调用starInit()
      //如果有数据就调用
      if(this.model) {
        this.starInit()
      }
    },
    //推荐数据
    async commendData() {
      const res = await this.$http.get('/commend')
      //console.log(res);
      this.commendList = res.data
    },
    //发送一级评论
    async postSuccess(res) {
      //console.log(res);
      const date = new Date()
      let m = date.getMonth() + 1
      let d = date.getDate()
      if(m < 10) {
        m = '0' + m
      }
      if(d < 10) {
        d = '0' + d
      }
      let str = `${m}-${d}`
      this.postCom.comment_content = res
      this.postCom.comment_date = str
      this.postCom.article_id = this.$route.params.id
      //console.log(this.postCom);
      const result = await this.$http.post(`/comment_post/${localStorage.getItem('id')}`, this.postCom)
      //console.log(result);
      this.$refs.comContent.commentData()
      this.postCom.parent_id = null
      if(result.status == 200){
        this.$msg.success('评论发表成功')
      }
    },
    replayChild(id) {
      //console.log(id);
      this.postCom.parent_id = id
      this.$refs.comTitle.focusInput()
    },
    //收藏
    async collectionClick() {
      if(localStorage.getItem('token')){
        const res = await this.$http.post(`/collection/${localStorage.getItem('id')}`,{article_id:this.$route.params.id})
        //console.log(res);
        if(res.data.msg == '收藏成功'){
          this.collectionActive = true
          this.$msg.success('收藏成功')
        }else{
          this.collectionActive = false
          this.$msg.fail('您已取消收藏')
        }
      }
    },
    //进入页面获取是否收藏
    async collectionInit() {
      if(localStorage.getItem('token')){
        const res = await this.$http.get(`/collection/${localStorage.getItem('id')}`,{
          params: {
            article_id: this.$route.params.id
          }
        })
        //console.log(res);
        this.collectionActive = res.data.success
      }
    },
    //点赞
    async starClick() {
      if(localStorage.getItem('token')){
        const res = await this.$http.post(`/sub_scription/${localStorage.getItem('id')}`,{sub_id:this.model.userid})
        //console.log(res);
        if(res.data.msg == '关注成功'){
          this.starActive = true
          this.$msg.success('感谢点赞')
        }else{
          this.starActive = false
          this.$msg.fail('已取消')
        }
      }
    },
    //进入页面是否点赞
    //因为要拿的model里面的userid，所以要在获取model数据的方法里面调用
    async starInit() {
      if(localStorage.getItem('token')){
        const res = await this.$http.get(`/sub_scription/${localStorage.getItem('id')}`,{
          params: {
            sub_id: this.model.userid
          }
        })
        //console.log(res);
        this.starActive = res.data.success
      }
    }
  },
  created() {
    this.articleData();
    this.commendData();
    this.collectionInit()
    //console.log(this.$route);
  },
  watch: {
    //监听路由改变
    $route() {
      this.articleData()
      this.commendData()
      this.collectionInit()
      this.starInit()
      // console.log('路径变化了');
    }
  }
}
</script>

<style lang="less">
  .detail_info {
    background-color: #fff;
    .play_video {
      width: 100%;
      video {
        width: 100%;
      }
    }
    .video_name {
      .video_title {
        .category_name {
          padding: 0.556vw 1.667vw;
          color: #fb7299;
          background-color: #f4f4f4;
          border-radius: 2.778vw;
        }
        .video_name {
          padding: 0.556vw 2.667vw;
        }
      }
      .video_desc {
        padding-left: 1.389vw;
        font-size: 3.333vw;
        .color {
          color: black;
          font-size: 4.067vw;
        }
        .gap {
          padding-right: 3.556vw;
        }
      }
    }
    .collect {
      display: flex;
      padding: 3.889vw 5.556vw;
      p {
        margin-right: 4.167vw;
        display: flex;
        align-items: center;
        color: #757575;
        .large {
          font-size: 6.111vw;
          padding-right: 1.389vw;
        }
        .little {
          font-size: 3.611vw;
        }
      }
      .active {
        color: #fb7299;
      }
    }
  }
  .detailparent {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .detailitem {
      margin: 1.389vw 0;
      width: 45%;
    }
  }
</style>
