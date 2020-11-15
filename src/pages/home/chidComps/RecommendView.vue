<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.index" class="recommend-item">
      <!-- <a :href="item.link" class="recommend-link"> -->
      <div class="recommend-link">
        <img class="recommend-img" :src="item.image" alt @load="imageLoad"/>
        <div>{{item.title}}</div>
      </div>
      <!-- </a> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isLoad: false
    }
  },
  methods: {
    imageLoad() {
      //加載圖片
      if (!this.isLoad) {
        console.log(this.$parent.$parent.imageLoad)
        this.$parent.$parent.imageLoad =  this.$parent.$parent.imageLoad + 1
        this.isLoad = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.recommend {
  width: 100%;
  display: flex;
  font-size: 12px;
  padding: 15px 0 30px;
  border-bottom: 8px solid #eee;
  .recommend-item {
    width: 25%;
    .recommend-link {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .recommend-img {
        width: 80%;
        margin-bottom: 10px;
      }
    }
  }
}
</style>