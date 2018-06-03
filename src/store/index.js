import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex) //应用程序开发的状态管理模式

import {
    addLocalGoods,
    getTotalLocalCount,
    updateLocalGoods,
    deleteLocalGoodsById
} from '../common/localStorageHelper.js'

const store = new Vuex.Store({
    state: {
        //先定义购买的总数量
        buyCount: 0
    },
    getters: {
        getTotalGoodsCount: state => {
            //把得到的数量返回出来
            //   return state.buyCount
            if (state.buyCount > 0) { //非第一次
                return state.buyCount
            } else { //第一次
                return getTotalLocalCount()
            }

        }
    },

    mutations: {
        addGoods(state, goods) {
            // console.log(goods)
            //把购买的数量加起来
            state.buyCount = addLocalGoods(goods)

            // state.buyCount =addLocalGoods(goods)
            // console.log(state.buyCount)//数量
            console.log(goods) 
            //goods的格式:{goodsId: "95", count: 1}

        },
        //修改
        updateGoods(state,goodsId) {
            state.buyCount = updateLocalGoods(goods)
        },
         //删除
         deleteGoodsById(state,goodsId) {
            state.buyCount = deleteLocalGoodsById(goods)
        }
    }
})

// export default store

export {store}  