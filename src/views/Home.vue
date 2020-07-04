<template>
  <div class="home" v-if="category">

    <nav-bar></nav-bar>

    <div class="categorytab">
      <!-- <div class="category-ico" @click="$router.push('/editcategory')"><van-icon name="setting-o" /></div> -->
      <van-tabs v-model="active" swipeable sticky animated>
        <van-tab v-for="(item,index) in category" :key="index" :title="item.title">
          <!-- 下拉加载更多 -->
          <van-list v-model="item.loading" :finished="item.finished"
                    :immediate-check="false" finished-text="我也是有底线的~" @load="onLoad">
            <!-- 视频封面 -->
            <div class="detailparent">
              <cover class="detailitem" :detailitem="categoryitem"
                     v-for="(categoryitem, categoryindex) in item.list" :key="categoryindex" />
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar'
// import Detail from './Detail'
import cover from './cover';
export default {
  data() {
    return {
      category: [],
      active: 0
    };
  },
  components: {
    NavBar,
    // Detail
    cover
  },
  // activated() {
  //   if(localStorage.getItem('newCat')) {
  //       let newCat = JSON.parse(localStorage.getItem('newCat'))
  //       this.category = this.changeCategory(newCat)
  //       this.selectArticle();
  //   }
  // },
  methods: {
    async selectCategory() {
      // if(localStorage.getItem('newCat')) {
      //   return
      // }
      const res = await this.$http.get("/category");
      this.category = this.changeCategory(res.data);
      this.selectArticle();
    },
    changeCategory(data) {
      const category1 = data.map((item) => {
        item.list = [];
        item.page = 0;
        item.loading = false;
        item.finished = false;
        item.pagesize = 10;
        return item;
      });
      return category1;
    },
    //获取文章数据
    async selectArticle() {
      const categoryitem = this.categoryItem();
      const res = await this.$http.get("/detail/" + categoryitem._id, {
        params: {
          page: categoryitem.page,
          pagesize: categoryitem.pagesize
        }
      });
      //console.log(res.data);
      
      categoryitem.list.push(...res.data);
      categoryitem.loading = false;
      //判断最新的数据如果小于数组里面pagesize的长度则证明数据到底了
      if (res.data.length < categoryitem.pagesize) {
        categoryitem.finished = true;
      }
    },
    onLoad() {
      //console.log('到底啦');
      const categoryitem = this.categoryItem();
      setTimeout(() => {
        categoryitem.page += 1;
        this.selectArticle();
      }, 1000);
    },
    categoryItem() {
      const categoryitem = this.category[this.active];
      return categoryitem;
    }
  },
  watch: {
    active() {
      const categoryitem = this.categoryItem();
      if (!categoryitem.list.length) {
        this.selectArticle();
      }
    }
  },
  created() {
    this.selectCategory();
    //console.log(this.$route);
  }
};
</script>

<style lang="less">
.home {
  background-color: white;
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
.categorytab{
  position: relative;
  .category-ico{
    position: absolute;
    z-index: 5;
    right: 0;
    top: 1.944vw;
    padding: 1.389vw 2.778vw;
    background-color: white;
  }
}

</style>