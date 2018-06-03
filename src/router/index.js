import Vue from 'vue'
import VueRouter from 'vue-router' //https://router.vuejs.org/zh/installation.html

//使用基于Vue
Vue.use(VueRouter) //Vue.prototype.$route Vue.prototype.$router

// 导入全局的axios
import axios from 'axios'
// Vue.prototy.$axios = axios
Vue.prototype.$axios = axios
axios.defaults.withCredentials = true//"立即登录那里,"
axios.defaults.baseURL = "http://47.106.148.205:8899/";




// 路由相关
// 导入全局需要用的样式
// import  "../components/goods/goodslist.vue"
import goodslist from "../components/goods/goodslist.vue"
import goodsinfo from "../components/goods/goodsinfo.vue"
// import shopcart from "../components/goods/shopcart.vue"
import shopcart from '../components/shopcart/shopcart'
// import order from '../components/order/order.vue'
import order from '../components/order/order'
import login from '../components/account/login.vue'
// import login from  '../components/account/login.vue'
import payOrder from '../components/pay/payOrder.vue'


const router = new VueRouter({
    routes: [{
            path: '/',
            redirect: '/site/goodslist'
        },
        {
            path: '/site/goodslist',
            component: goodslist
        },
        {
            path: '/site/goodsinfo/:goodsId',
            component: goodsinfo
        },
        {
            path: '/site/shopcart',
            component: shopcart
        },
        {
            path: '/site/order/:ids',
            component: order,
            meta: {
                needLogin: true
            }
        },
        {
            path: '/site/login',
            component: login,
        },
        {
            path: '/site/payOrder/:orderId', 
            component: payOrder,
            meta: {
                needLogin: true
            }
        },
    ]
})
export default router;