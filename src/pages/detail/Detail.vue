<template>
  <div id="detail">
    <detail-nav-bar ref="nav" class="detail-nav" @titleClick="titleClick"></detail-nav-bar>
    <!-- better-scroll必須加上固定高度 -->
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <!-- 屬性: topImages 傳入值: top-images -->
      <!-- 動態傳遞的數據的駝峰間必須以橫槓線分隔 -->
      <!-- 現在VUE的模板可以自動解析大小寫了 -->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <good-list ref="recommend" :goods="recommends"></good-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodList from "components/content/goods/GoodsList";
// import Toast from "components/common/toast/Toast"


import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
import { itemListenerMixin, backTopMixin } from "common/mixin";
import { debounce } from "common/utile";

import { mapActions } from "vuex"

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodList,
    // Toast
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      // message: '',
      // show: false,
      condition: false
    };
  },
  created() {
    //1.保存傳入的iid
    this.iid = this.$route.params.iid;

    //2.根據iid請求詳情數據
    getDetail(this.iid).then((res) => {
      // console.log(res);
      const data = res.result;

      //1.獲取頂部輪播圖片
      this.topImages = data.itemInfo.topImages;

      //2.獲取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //3.創建店鋪信息的對象
      this.shop = new Shop(data.shopInfo);

      //4.保存商品的詳情數據
      this.detailInfo = data.detailInfo;

      //5.獲取參數信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      //6.取出評論信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      // //組件尚未被渲染
      // this.themeTopYs = [];

      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

      // this.$nextTick(() => {
      //   //對應的DOM已經被渲染，但是圖片尚未被加載
      //   this.themeTopYs = [];

      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // });

      //getThemeTopY進行賦值(先對themeTopYs進行一個防抖的操作)
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];

        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
        this.themeTopYs.push(Number.MAX_VALUE)
        console.log(this.themeTopYs);
      }, 100);
    });

    //取出推薦數據
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });
  },
  methods: {
    ...mapActions(['addCart']),
    // ...mapActions({
    //   add: 'addCart'
    // }),
    imageLoad() {
      //偵測圖片加載完畢
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
    },
    contentScroll(position) {
      //監聽backTop出現的高度
      this.listenShowBackTop(position)
      
      // console.log(position)
      const positionY = -position.y
      // console.log(positionY)
      //positionY和主題中值進行對比
      //[0, 7978, 9120, 9452]

      //positionY在 0 和 7938 之間， index = 0
      //positionY在 7938 和 9120 之間， index = 1
      //positionY在 9120 和 9452 之間， index = 2
      //positionY 大於或等於 9452 時， index = 3

      // let length = this.themeTopYs.length; //判斷高度陣列的長度
      // for (let i = 0; i < length; i++) {
      //   if (
      //     this.currentIndex !== i && //判斷高度有沒有超過該主題，超過再進行改變(和data中的currentIndex進行對比)
      //       ((i < length - 1 && //判斷i不是陣列的最後一個
      //       positionY >= this.themeTopYs[i] &&
      //       positionY < this.themeTopYs[i + 1]) || //兩種判斷條件，可選擇執行其中一種
      //     (i === length - 1 &&  positionY >= this.themeTopYs[i]))  //判斷i如果是陣列的最後一個
      //   ) {
      //     this.currentIndex = i;
      //     this.$refs.nav.currentIndex = this.currentIndex
      //   }
      // }

      //第二種作法
      //此作法必須在陣列的最後push一個最大值
      //positionY在 0 和 7938 之間， index = 0
      //positionY在 7938 和 9120 之間， index = 1
      //positionY在 9120 和 9452 之間， index = 2
      //positionY在 9452 和 某個最大值之間， index = 3

      let length = this.themeTopYs.length;
      for(let i = 0; i < length-1; i++) {
        if(i < length - 1 && //判斷i不是陣列的最後一個
            (positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
    },
    addToCart() {
      if(this.topImages[0] && this.goods.title && this.goods.desc && this.goods.realPrice &&  this.iid) {
        //1.獲取購物車需要展示的信息
      console.log('加入購物車')
      const product = {}
      product.image = this.topImages[0]
      product.title  = this.goods.title
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice
      product.iid = this.iid
      // console.log(product)

      //2.將商品添加到購物車
      // this.$store.commit('addCart', product)
      //透過action進行promise調用
      this.addCart(product).then((res) => {
        // console.log(res)
        // this.show = true
        // this.message = res
        // setTimeout(() => {
        //   this.show = false,
        //   this.message = ""
        // }, 1000)
        this.$toast.show(res, 1500)
        
      })

      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res)
      // })
      }
      
    }
  },
  mounted() {},
  watch: {
  },
  updated() {
    //當渲染的畫面有變化時便會反映
    //實際結果仍有差距，可能是在圖片沒有加載完畢前仍然會傳入值
    // this.themeTopYs = [];
    // this.themeTopYs.push(0);
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
    // console.log(this.themeTopYs);
  },
  destroyed() {
    // console.log('離開詳情頁')
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 10;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 58px);
  overflow: hidden;
}
</style>