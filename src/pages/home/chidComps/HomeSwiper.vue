<template>
    <swiper ref="swiper">
      <swiper-item v-for="(item, key) in banners" :key="key">
        <a :href="item.link">
          <img :src="item.image" @load="imageLoad" />
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isLoad: false,
    };
  },
  components: {
    Swiper,
    SwiperItem,
  },
  created() {
    // console.log(this)
  },
  methods: {
    imageLoad() {
      //加載圖片
      if (!this.isLoad) {
        // this.$emit("swiperImageLoad");
        console.log(this.$parent.$parent.imageLoad)
        this.$parent.$parent.imageLoad =  this.$parent.$parent.imageLoad + 1
        this.isLoad = true;
      }
    },
  },
  watch: {
    //數據渲染完畢時操作DOM
    banners: function () {
      this.$nextTick(() => {
        this.$refs.swiper.handleDom();
        this.$refs.swiper.startTimer();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>