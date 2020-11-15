<template>
    <swiper class="swipers" ref="swipers">
      <swiper-item v-for="(item, key) in topImages" :key="key">
        <div>
          <img :src="item" />
        </div>
      </swiper-item>
    </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "DetailNavBar",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
    ABC: String
  },
  watch: {
    //數據渲染完畢時操作DOM
    topImages: function () {
      this.$nextTick(() => {
        // console.log(this.topImages)
        this.$refs.swipers.handleDom();
        this.$refs.swipers.startTimer();
      });
    },
  },
};
</script>

<style scoped>
.swipers {
  height: 300px;
  overflow: hidden;
}
</style>