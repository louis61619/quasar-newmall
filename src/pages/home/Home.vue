<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">購物街</div>
    </nav-bar>
    <tab-control
        :titles="['流行','新款','精選']"
        class="tab-control-fixed"
        ref="TabControlFixed"
        @tabClick="tabClick"
        v-show="isTabfixed"
      ></tab-control>

    <!-- 動態傳遞的數據的駝峰間必須以橫槓線分隔 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper ref="swiper" :banners="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view></feature-view>
      <tab-control
        :titles="['流行','新款','精選']"
        class="tab-control"
        ref="TabControl"
        @tabClick="tabClick"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 加上修飾符native可以直接監聽點擊 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from "./chidComps/HomeSwiper";
import RecommendView from "./chidComps/RecommendView";
import FeatureView from "./chidComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import { getHomeMultidata, getHomeGoods } from "network/home";

import { debounce } from "common/utile";
import { itemListenerMixin, backTopMixin } from "common/mixin";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      // result: null,
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      condition: false,
      tabOffsetTop: 0,
      isTabfixed: false,
      saveY: 0,
      imageLoad: 0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  activated() { //還原之前離開時所記錄的頂部位置
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0) 
  },
  deactivated() { //紀錄離開時距離頂部的位置
    this.saveY = this.$refs.scroll.getScrollY()
    console.log(this.saveY)
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  created() {
    //created是一個回調函數
    //1.請求多個數據
    this.getHomeMultidata();

    //2.請求商品數據
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");

    //3.監聽item中圖片加載完成
    // this.$bus.$on('itemImageLoad', () => { //判斷this.$refs.scroll這個物件是否存在
    //   this.$refs.scroll && this.$refs.scroll.refresh()
    // })
  },
  mounted() {
    // //監聽item中圖片加載完成
    // const refresh = debounce(
    //   this.$refs.scroll && this.$refs.scroll.refresh,
    //   50
    // );
    // this.$bus.$on("itemImageLoad", () => { //從goodListItem中傳出來的事件
    //   refresh();
    // });

    //使用混入
  },
  methods: {
    /**
     * 事件監聽相關的方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.TabControlFixed.currentIndex = index
      this.$refs.TabControl.currentIndex = index
    },
    contentScroll(position) {
      //1.判斷BackTop是否顯示
      // this.isShowBackTop = -position.y > 1000;
      this.listenShowBackTop(position)

      //2.決定tabControl
      if(this.imageLoad === 3) {
        this.tabOffsetTop = this.$refs.TabControl.$el.offsetTop
        this.isTabfixed = (-position.y) > (this.tabOffsetTop)
      }
    },
    loadMore() {
      //下拉加載更多監聽圖片加載完畢 並使用防抖函數
      if (this.condition === true) {
        let timer = null;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          this.getHomeGoods(this.currentType);
          this.condition = false;
          console.log(this.condition);
        }, 2000);
      }
    },
    // swiperImageLoad() {
    //   //監聽tabcontrol對頂部的距離
    //   //所有組件都有一個$el，用於獲取組件中的元素
    //   if(this.imageLoad === 2){
        
    //     this.tabOffsetTop = this.$refs.TabControl.$el.offsetTop
    //     this.imageLoad = this.imageLoad + 1
    //   }
        
    // },

    /**
     * 網路請求相關的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res.data) //垃圾回收機制所以要放入data中
        // this.result = res.data
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1; //請求時傳遞參數
      getHomeGoods("pop", page).then((res) => {
        // console.log(res)
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1; //改變vuedata資料

        //完成上拉加載更多
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
html,
body {
  width: 100%;
}
#home {
  /* padding-top: 44px; */
  height: 100vh;
  width: 100%;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 9; */
}
.tab-control {
  background: #fff;
  z-index: 2;
}
.tab-control-fixed {
  position: fixed;
  background: #fff;
  z-index: 2;
}
.content {
  /* height: calc(100% - 49px); */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
}
</style>