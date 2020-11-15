import { debounce } from "./utile"
import BackTop from "components/content/backTop/BackTop";
import {POP, NEW, SELL} from "./const";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  mounted() {
    this.refresh = debounce( //將此封裝好的事件放入data中，就可以在方法中調用他
      this.$refs.scroll && this.$refs.scroll.refresh,
      50
    );
    this.itemImgListener = () => {
      this.refresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImgListener)
    // console.log('我是混入中的內容')
  },
  
}

export const backTopMixin = {
  components: {
    BackTop,
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    listenShowBackTop(position) {
      this.isShowBackTop = -position.y > 1000;
    }
  },

}

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}
