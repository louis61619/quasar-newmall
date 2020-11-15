<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :key="item.index" :goods-item="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";

export default {
  name: "GoodsList",
  components: {
    GoodsListItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {},
  watch: {
    //監聽數據掛載完畢才執行下拉加載更多
    goods: function () {
      this.$nextTick(() => {
        this.$parent.$parent.condition = true;
        console.log(this.$parent.$parent.condition);
      });
    },
  },
};
</script>

<style>
.goods {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-around;
  padding: 2px;
}
</style>