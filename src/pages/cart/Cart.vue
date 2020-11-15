<template>
  <div class="cart">
    <!-- 導航 -->
    <nav-bar class="nav-bar">
      <div slot="center">購物車({{length}})</div>
    </nav-bar>
    <!-- 列表 -->
    <cart-list></cart-list>
    <!-- 底部工具欄 -->
    
    <cart-bottom-bar class="bottom-bar"></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList"
import CartBottomBar from "./childComps/CartBottomBar"

//將vuex中的getters映射到局部組件的計算屬性
import { mapGetters } from "vuex"

export default {
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    //兩種語法
    // ...mapGetters(['cartLength', 'cartList']),

    ...mapGetters({
      length: 'cartLength',
      list: 'cartList'
    })
  }
};
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>