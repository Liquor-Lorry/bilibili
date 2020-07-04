<template>
  <div class="userdetail">
    <div class="child_userdetail_top">
      <div class="user_img">
        <img :src="userInfo.user_img" v-if="userInfo.user_img" />
        <img src="@/assets/hg.jpg" v-else />
      </div>
      <div class="user_edit">
        <div class="edit_top">
          <p>
            <span>0</span>
            <span class="user_text">粉丝</span>
          </p>
          <p>
            <span>54</span>
            <span class="user_text">关注</span>
          </p>
          <p>
            <span>0</span>
            <span class="user_text">获赞</span>
          </p>
        </div>
        <div class="edit_bottomm" @click="$router.push('/edit')">
          <div class="user_editBom">编辑资料</div>
        </div>
      </div>
    </div>
    <div class="child_userdetail_bom">
      <h2>{{userInfo.name}}</h2>
      <p v-if="userInfo.user_desc">{{userInfo.user_desc}}</p>
      <p v-else>这个人很神秘，什么都没有写</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['userInfo'],
    data() {
      return {
      }
    },
}
</script>

<style scoped lang="less">
  .userdetail {
    background-color: #fff;
    padding: 0 3.333vw;
    .child_userdetail_top {
      display: flex;
      .user_img {
        margin-right: 5.556vw;
        img {
          height: 23.611vw;
          width: 23.611vw;
          border-radius: 50%;
        }
      }
      .user_edit {
        flex: 1;
        .edit_top {
          display: flex;
          p {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            font-size: 3.889vw;
            margin: 2.778vw 0;
            .user_text {
              color: #aaa;
            }
          }
          p:nth-child(1),p:nth-child(2) {
            border-right: 0.278vw solid #ccc;
          }
        }
        .edit_bottomm {
          padding: 1.389vw 1.111vw;
          .user_editBom {
            border: 0.278vw solid #fb7a9f;
            padding: 0.833vw;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fb7a9f;
            border-radius: 1.389vw;
          }
        }
      }
    }
    .child_userdetail_bom {
      h2 {
        margin: 2.778vw 0 0.833vw 0;
        font-weight: 400;
      }
      p {
        padding: 0 0 1.389vw 0;
        margin: 2.778vw 0 0 0;
        color: #999;
        font-size: 3.889vw;
      }
    }
  }
</style>
