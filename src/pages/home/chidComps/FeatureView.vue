<template>
  <div class="feature">
    <img src="~assets/img/home/recommend_bg.jpg" alt @load="imageLoad"/>
  </div>
</template>

<script>
export default {
  name: "FeatureView",
  methods: {
    imageLoad() {
      //加載圖片
      if (!this.isLoad) {
        console.log(this.$parent.$parent.imageLoad)
        this.$parent.$parent.imageLoad =  this.$parent.$parent.imageLoad + 1
        this.isLoad = true;
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.feature {
  width: 100%;
  img {
    width: 100%;
  }
}
</style>