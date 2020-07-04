<template>
  <div @click="pathPush" v-if="detailitem">
    <div class="detail_whole">
      <div class="img_parent">
        <img class="detail_img" :src="detailitem.img" />
        <div class="shadow">
          <div class="video">
            <van-icon name="play-circle-o" />
            <span class="detail_video">12590</span>
          </div>
          <div class="comment">
            <van-icon name="comment-o" />
            <span class="detail_comment">{{detailitem.commentlen ? 66 : detailitem.commentlen}}</span>
          </div>
        </div>
      </div>
      <p>{{detailitem.name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['detailitem'],
   data() {
      return {
      }
   },
   methods: {
     pathPush() {
       //判断如果点击的是不是相同的路径
       if(this.$route.path != `/article/${this.detailitem.id}`){
         this.$router.push(`/article/${this.detailitem.id}`)
       }
     }
   }
}
</script>

<style lang="less">
  .detail_whole {
    font-size: 3.333vw;
    padding: 0.833vw 0;
  }
  .img_parent {
    position: relative;
    .detail_img {
      width: 100%;
      height:27.778vw;
    }
    .shadow {
      position: absolute;
      bottom: 1.006vw;
      color: aqua;
      left: 0px;
      display: flex;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.65), transparent);
      .video {
        display: flex;
        padding: 5px 0 0 0;
        .detail_video {
          padding: 0 5px;
        }
      }
      .comment {
        display: flex;
        padding: 5px 0 0 72px;
        .detail_comment {
          padding: 0 5px;
        }
      }
    }
  }
  
</style>
