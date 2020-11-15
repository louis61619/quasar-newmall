<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
      // message: "哈哈哈",
      goods: this.$parent.goods,
    };
  },
  mounted() {
    //1.創建Bscoll對象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      useTransition:false,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });

    //2.監聽滾動的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        // console.log(position)
        this.$emit("scroll", position);
      });
    }
    //3.監聽scroll滾動到底部
    if (this.pullUpLoad) {  //判斷值是否為true去監聽
      this.scroll.on("pullingUp", () => {
        // console.log('監聽滾動到底部')
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      console.log("--------");
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  },
};
</script>

<style scoped>
</style>