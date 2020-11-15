<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt @load="imageLoad" />
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed:{
    showImage() { //判斷前一個有沒有值，沒有便返回下一個
      return this.goodsItem.img ||  this.goodsItem.image || this.goodsItem.show.img 
    }
  },
  methods: {
    imageLoad() {
      // console.log("圖片加載完成");
      this.$bus.$emit("itemImageLoad");
    },
    itemClick() {
      // console.log("加載詳情頁")
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  },
};
</script>

<style lang="scss" scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
  overflow: hidden;
  img {
    height: 100%;
    object-fit: cover;
    width: 100%;
    border-radius: 5px;
  }
  .goods-info {
    font-size: 12px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 5px;
    text-align: center;

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 3px;
      text-align: center;
    }
    .price {
      color: var(--color-high-text);
      margin-right: 20px;
    }
    .collect {
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: -15px;
        top: -1px;
        width: 14px;
        height: 14px;
        background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
      }
    }
  }
}
</style>