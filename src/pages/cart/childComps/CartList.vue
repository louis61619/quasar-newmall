<template>
  <div class="cart">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in list" :key="index" :item-info="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import CartListItem from "./CartListItem"

import Scroll from "components/common/scroll/Scroll";

import { mapGetters } from "vuex"

export default {
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters({
      length: 'cartLength',
      list: 'cartList'
    })
  },
  activated() {
    this.$refs.scroll.refresh()
  }

}
</script>

<style scoped>
.cart{
  height: calc(100vh - 44px - 49px - 40px);
}
.content{
  height: 100%;
  overflow: hidden;
  /* padding-bottom: 40px; */
}

</style>