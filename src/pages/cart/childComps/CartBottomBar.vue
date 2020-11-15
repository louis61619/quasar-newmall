<template>
  <div class="bottom-bar">
    <div class="check-block">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"></check-button>
      <span>全選</span>
    </div>

    <div class="price">
      合計: {{totalPrice}}
    </div>
    
    <div class="calculate" @click="calcClick">
      去計算 ({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

import { mapGetters } from "vuex"

export default {
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '¥' + this.cartList.filter(item => {
        return item.checked === true
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() { 
      if(this.cartList.length === 0) return false

      // !item.checked 表示當 item.checked === false 時，並在外頭取反(回傳false)
      // return !this.cartList.filter(item => !item.checked).length

      //找到一個未勾選和沒東西都會回傳false
      // return !this.cartList.find(item => !item.checked)

      //遍歷之後判斷有沒有勾選，如果有回傳 false 如果沒有回傳 true
      for(let item of this.cartList){
        if(!item.checked) {
          return false
        }
        return true //如果不是則回傳true
      }
    },
    // isSelectNull() { //必須全部都未被勾選或購物車為空
    //   if(this.cartList.length === 0) return true //購物車為空
    //   return !this.cartList.find(item => item.checked)
    // }
    
  },
  methods: {
    checkClick() {
      console.log('----')
      if(this.isSelectAll){
        this.cartList.forEach(item => item.checked = false);
      }else {
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      // this.$toast
      if(!this.isSelectAll) {
        this.$toast.show('請選擇購買的商品', 1500)
      }
    }
  },
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  line-height: 40px;
  display: flex;
  font-size: 14px;
  position: fixed;
  bottom: 49px;
  width: 100%;
}
.check-block {
  display: flex;
  align-items: center;
  /* margin-left: 10px; */
  
}
.check-button {
  height: 20px;
  width: 20px;
  line-height: 20px;
  margin-left: 10px;
  margin-right: 5px;
}
.price {
  margin-left: 20px;
}
.calculate {
  background-color: red;
  color: #fff;
  width: 70px;
  margin-left: auto;
  text-align: center;
}
.isSelectAll {
  background-color: red;
}
</style>