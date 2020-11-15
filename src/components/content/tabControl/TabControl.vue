<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" :key="item.index"
     class="tab-control-item" :class="{active: index === currentIndex}"
      @click="itemClick(index)">
     <span>{{item}}</span>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick', index)
    }
  }

}
</script>

<style lang="scss" scoped>
  .tab-control{
    width: 100%;
    display: flex;
    .tab-control-item{
      flex: 1;
      text-align: center;
      height: 40px;
      line-height: 40px;
      font-size: 15px;
      span{
        padding-bottom: 5px;
        padding-right: 5px;
        padding-left: 5px;
      }
    }
  }
  .active {
    color: var(--color-high-text);
    span{
      border-bottom: 3px solid var(--color-tint);
    }
  }
</style>