<template>
  <div v-if="model" class="editViews">
    <div class="edit_navbar">
      <nav-bar ref="navbar"></nav-bar>
    </div>

    <div class="uploadfile">
      <van-uploader class="uploadimg" preview-size="100vw" :after-read="afterRead" />
      <edit-banner left="头像">
        <img :src="model.user_img" slot="right" v-if="model.user_img" />
        <img src="@/assets/hg.jpg" slot="right" v-else />
      </edit-banner>
    </div>

    <edit-banner left="昵称" @bannerClick="show = true">
      <a href="javascript:;" slot="right">{{model.name}}</a>
    </edit-banner>

    <edit-banner left="账号">
      <a href="javascript:;" slot="right">{{model.username}}</a>
    </edit-banner>
    
    <edit-banner left="性别" @bannerClick="gendershow = true">
      <a href="javascript:;" slot="right">{{model.gender == 0 ? '男' : '女'}}</a>
    </edit-banner>

    <edit-banner left="个性签名" @bannerClick="textshow = true">
      <a href="javascript:;" slot="right">{{model.user_desc}}</a>
    </edit-banner>

    <!-- 返回按钮 -->
    <div class="editback" @click="$router.back()">
      返回
    </div>

    <!-- 用来修改昵称的弹出框 -->
    <van-dialog v-model="show" title="昵称" show-cancel-button 
                @confirm="confirmClick" @cancel="content=''">
      <van-field v-model="content" autofocus />
    </van-dialog>

    <!-- 用来修改个性签名的弹出框 -->
    <van-dialog v-model="textshow" title="个性签名" show-cancel-button 
                @confirm="textareaClick" @cancel="content=''">
      <van-field v-model="content" type="textarea" autofocus />
    </van-dialog>

    <!-- 用来修改性别的动作面板 -->
    <van-action-sheet v-model="gendershow" :actions="actions" 
                      @select="onSelect" cancel-text = "取消" />
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar'
import EditBanner from '@/components/common/EditBanner'
export default {
  components: {
    NavBar,
    EditBanner
  },
   data() {
    return {
      model: {},
      show: false,
      content: '',
      textshow: false,
      gendershow: false,
      actions: [
        { name: '男', value: 0 },
        { name: '女', value: 1 }
      ]
    }
  },
  created() {
    this.selectUser()
  },
  methods: {
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file);
      const formdata = new FormData()
      //将子file append到formdata里面
      formdata.append('file', file.file)
      const res = await this.$http.post('/upload', formdata)
      // console.log(res);
      this.model.user_img = res.data.url

      this.UserUpdate()
      this.$refs.navbar.NavInit()
    },
    async UserUpdate() {
      const res = await this.$http.post('/update/' +localStorage.getItem('id'), this.model)
      //console.log(res);
      if(res.data.code == 200) {
        this.$msg.success('修改成功')
      }
    },
    async selectUser() {
      const res = await this.$http.get('/user/' + localStorage.getItem('id'))
      this.model = res.data[0]
    },
    confirmClick() {
      // console.log('用户确认了');
      this.model.name = this.content
      this.UserUpdate()
      //数据提交完后就重置为空
      this.content = ''
    },
    textareaClick() {
      this.model.user_desc = this.content
      this.UserUpdate()
      this.content = ''
    },
    onSelect(data) {
      //console.log(data);
      this.model.gender = data.value
      this.UserUpdate()
      this.gendershow = false
      //this.$msg.success(data.name);
    }
  }
}
</script>

<style lang="less">
  .edit_navbar {
    margin-bottom: 2.778vw;
  }
  .editViews {
    img {
      height: 46px;
      width: 46px;
      border-radius: 50%;
    }
    a {
      color: #555;
    }
    .uploadfile {
      position: relative;
      overflow: hidden;
      .uploadimg {
        opacity: 0;
        position: absolute;
      }
    }
    .editback {
      background-color: #fb7299;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      border-radius: 13.889vw;
      font-size: 4.167vw;
      padding: 2.222vw 0;
      margin-top: 5.556vw;
    }
  }
</style>
