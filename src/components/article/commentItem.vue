<template>
  <div class="commentitems">
    <div class="c_item" v-for="(item, index) in commentChild" :key="index">
      <div class="c_left">
          <img v-if="item.userinfo && item.userinfo.user_img" :src="item.userinfo.user_img" alt="">
          <img v-else src="@/assets/hg.jpg" alt="">
          <p>
            <span v-if="item.userinfo">{{item.userinfo.name}}</span>
            <span v-else>匿名用户</span>
            <span>{{item.comment_date}}</span>
          </p>
      </div>
      <div class="c_right">
        <div v-if="!temp">
          {{item.comment_content}}
          <span class="publish" @click="replayItem(item.comment_id)">回复</span>
        </div>
        <div v-else>
          回复：<span class="replay">{{item.parent_user_info.name}}</span>： 
          {{item.comment_content}}<span class="publish"  @click="replayItem(item.comment_id)">回复</span>
        </div>
      </div>
      <!-- 在这里调用实现组件的递归调用 -->
        <comment-child-item @postChild="postChild" :commentChild="item.child" :temp="true"/>
    </div>
  </div>
</template>

<script>
export default {
  // 设置name，实现组件递归
  name: "commentChildItem",
  props: ['commentChild', 'temp'],
  data() {
      return {
      }
  },
  methods: {
    replayItem(id) {
      console.log(id);
      this.$emit('postChild', id)
      this.$emit('replayPublish', id)
    },
    postChild(id) {
      //console.log(id);
      this.replayItem(id)
      this.$emit('replayPublish', id)
    }
  }
}
</script>

<style scoped lang="less">
  .commentitems {
    .c_item {
      display: flex;
      flex-direction: column;
      .c_left {
        display: flex;
        img {
          margin: 0 1.389vw 2.778vw 0;
        }
        p {
          flex: 1;
          font-size: 3.611vw;
          color: #555;
          display: flex;
          justify-content: space-between;
          margin-bottom: 1.389vw;
        }
      }
      .c_right {
        position: relative;
        .replay {
          color: #66ccff;
        }
        .publish {
          position: absolute;
          right: 10px;
          color: red;
        }
      }
    }
  }
</style>
