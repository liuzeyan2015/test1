// 导入App.vue 并且利用Vue框架把App.vue中内容渲染出来
import Vue from 'vue'

import moment from 'moment'
import ElementUI from 'element-ui';
import VueLazyload from 'vue-lazyload'


const path = require('path')

// or with options
Vue.use(VueLazyload, {
    loading: path.join(__dirname, "src/statics/site/images/01.gif")
})

// 导入全局需要使用的样式
import 'element-ui/lib/theme-chalk/index.css';
import "./statics/site/css/style.css"

// 导入App.vue
import App from './App.vue'
// 导入css


Vue.use(ElementUI); //对ElementUI进行注册    


//定义全局过滤参考https://cn.vuejs.org/v2/guide/filters.html
//定义全局过滤器
Vue.filter('dateFmt', (input, formatStr = "YYYY-MM-DD") => {
    //第二个参数的 formatStr="YYYY-MM-DD" 相当于下面这样写
    //const lastFormatStr = formatStr || "YYYY-MM-DD"

    /**
     * 第一个参数:要过滤的原始的时间字符串
     * 第二个参数：要格式化成的字符串
     */
    return moment(input).format(formatStr)
})








//使用Vue
//按需导入localStorage中的方法[按需导入必须有{}]
// import {
//     addLocalGoods,
//     getTotalGoodsCount} from './common/localStorageHelper'


router.beforeEach((to, from, next) => {
    if(to.path!='/site/login'){
        localStorage.setItem('lastVisitPath',to.path)
    }

    if(to.meta.needLogin){
        axios.get('site/account/islogin').then(response=>{
            if(response.data.code == 'nologin'){//未登录
                router.push({path:'/site/login'})
            }else{
                next()
            }
        })
    }else{
        next()
    }
})




import router from './router/index.js'
import {store} from './store/index.js'





new Vue({
    el: "#app",
    //参考:https://cn.vuejs.org/v2/guide/render-function.html
    render: h => h(App),
    router,
    store,

})