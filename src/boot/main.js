// import something here
import Vue from 'vue'
import Toast from 'components/common/toast'
import VueLazyLoad from 'vue-lazyload'

//事件總線
Vue.prototype.$bus = new Vue()

//使用Toast插件
Vue.use(Toast)

//使用懶加載的插件
Vue.use(VueLazyLoad, {
  loading: require('assets/img/common/placeholder.png')
})

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async (/* { app, router, Vue ... } */) => {
  // something to do
}
