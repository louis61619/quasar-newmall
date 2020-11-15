import Vue from 'vue'
import VueRouter from 'vue-router'


const Home = () => import('pages/home/Home')
const Category = () => import('pages/category/Category')
const Cart = () => import('pages/cart/Cart')
const Profile = () => import('pages/profile/Profile')
const Detail = () => import('pages/detail/Detail')

//1.安裝插件
Vue.use(VueRouter)

//2.創建router
const routes =[
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }

]
const router = new VueRouter({
  routes,
  mode: 'hash'
})

const originalreplace = VueRouter.prototype.replace
   VueRouter.prototype.replace = function replace(location) {
   return originalreplace.call(this, location).catch(err => err)
}

const originalpush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalpush.call(this, location).catch(err => err)
}
export default router