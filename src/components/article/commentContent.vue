<template>
   <div class="c_content">
      <div class="c_parent" v-for="(item, index) in commentList" :key="index">
         <!-- 一级评论 -->
         <div class="c_item">
            <div class="c_left">
               <img v-if="item.userinfo && item.userinfo.user_img" :src="item.userinfo.user_img" alt="">
               <img v-else src="@/assets/hg.jpg" alt="">
            </div>
            <div class="c_right">
               <p>
                  <span v-if="item.userinfo">{{item.userinfo.name}}</span>
                  <span v-else>匿名用户</span>
                  <span>{{item.comment_date}}</span>
               </p>
               <div>
                  {{item.comment_content}}
                  <span class="publish" @click="replay(item.comment_id)">回复</span>
               </div>
            </div>
         </div>
         <!-- 二级评论 -->
         <comment-item class="comItem" :commentChild="item.child" @replayPublish="replay"/>      </div>
   </div>
</template>

<script>
import commentItem from './commentItem'
export default {
   props: ['commentChild'],
   components: {
      commentItem
   },
   data() {
      return {
         commentList: null
      }
   },
   methods: {
      async commentData() {
         const res = await this.$http.get(`/comment/${this.$route.params.id}`)
         //console.log(res.data.length);
         //判断，如果有数据就将数据发送到父组件
         if(res.data) {
            this.$emit('lengthSelect', res.data.length)
         }
         this.commentList = this.changeCommentData(res.data)
      },
      changeCommentData(data) {
         //利用递归改造评论数据
         function fn(temp) {
            let arr1 = []
            for(let i = 0; i < data.length; i++){
               if(data[i].parent_id == temp) {
                  arr1.push(data[i])
                  data[i].child = fn(data[i].comment_id)
               }
            }
            return arr1
         }
         return fn(null)
      },
      replay(id) {
         //console.log(id);
         this.$emit('replay', id)
      }
   },
   created() {
      this.commentData()
   }
}
</script>

<style lang="less">
   .c_content {
      padding: 2.778vw 2.778vw;
      .c_parent {
         border-bottom: 0.278vw solid #e7e7e7;
      }
      .c_item {
         display: flex;
         padding: 2.778vw 0;
         .c_left {
            margin-right: 2.778vw;
            img {
               width: 9.722vw;
               height: 9.722vw;
               border-radius: 50%;
            }
         }
         .c_right {
            flex: 1;
            position: relative;
            p {
               font-size: 3.611vw;
               color: #555;
               display: flex;
               justify-content: space-between;
               margin-bottom: 1.389vw;
            }
            div {
               font-size: 3.611vw;
            }
            .publish {
               color: red;
               position: absolute;
               right: 0;
            }
         }
      }
      .comItem {
         padding-left: 8.889vw;
      }
   }
</style>
