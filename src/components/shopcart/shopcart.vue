<template>
    <div>
       <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                  <tr v-for="item in goodsList" :key="item.id">
                                    <!-- <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th> -->
                                     <td width="48" align="center">
                                            <el-switch
                                                v-model="item.isSelected"
                                                active-color="#409eff"
                                                inactive-color="#555555">
                                          </el-switch>
                                    </td>
                                    <td align="left" colspan="2">
                                        <div class="shopInfo">
                                            <img style="width:50px;height:50px;margin-right: 10px;" :src="item.img_url" alt="">
                                            <span>{{item.title}}</span>
                                        </div>
                                    </td>
                                    <td width="84" align="left">{{item.sell_price}}</td>
                                    <td width="104" align="center">
                                        
                                        <inputnumber :goodsCount="item.buycount" :goodsId="item.id" @goodsCountChange="getChangeGoods"></inputnumber>
                                        
                                        
                                    </td>
                                    <td width="104" align="left">{{item.sell_price * item.buycount}}</td>
                                    <td width="54" align="center">
                                        <a href="javascript:void(0)" @click="deleteGoodsById(item.id)">删除</a>
                                        
                                    </td>
                                </tr>
                                <tr v-if="goodsList.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{getTotalCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{getTotalAmount}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
              
              
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" @click="continueBuy">继续购物</button>
                            <button class="submit" @click="goToOrder">提交订单</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template> 
<style scoped>
    .shopInfo{
        display: flex;
        align-items: center;
    }
</style>

<script>
    import {getLocalGoodsObj} from '../../common/localStorageHelper.js'
    // import inputnumber from '../../components/subcomponents/inputnumber.vue'
    import inputnumber from '../subcomponents/inputnumber.vue'


    //导入子组件
    // import inputnumber from '../subcomponents/inputnumber'
    

    export default {
        data(){
            return {
                goodsList: []//先给个空数组
            }
        },
        components: {
            inputnumber
        },
        computed:{
            //计算总量
            getTotalCount(){
                let totalCount = 0
                this.goodsList.forEach(item=>{
                    if(item.isSelected){
                        totalCount +=item.buycount
                    }
                })
                return totalCount
            },
            //计算总量
            getTotalAmount(){
                let totalAmount = 0
                this.goodsList.forEach(item=>{
                    if(item.isSelected){
                        totalAmount +=item.buycount *item.sell_price
                    }
                })
                return totalAmount
            },
        },
        created (){
            this.getGoodsListData()
        },


    methods: {
         
            getGoodsListData() {
                //1.获取localStorage中的商品信息
                const localGoodsObj = getLocalGoodsObj()

                //2.定义一个临时的数组
                const tempArray = []
                for (const key in localGoodsObj) {
                    tempArray.push(key)
                }
            //    使用url
                const url = `site/comment/getshopcargoods/${tempArray.join(',')}`
                this.$axios.get(url).then(response => {
                    response.data.message.forEach(item => {
                        item.buycount = localGoodsObj[item.id]
                        item.isSelected = true
                    })

                    this.goodsList = response.data.message
                })
            },
            // 获取子组件改变之后的商品数据 {goodsId:87,count:3}
            getChangeGoods(goods) {
              

                this.goodsList.forEach(item => {
                    if (item.id == goods.goodsId) {
                        //判断id是否相等
                        item.buycount = goods.count
                    }
                })

                //调用localStorageHelper中Vue根实例的的修改方法
                this.$store.commit('updateGoods', goods)                
            },
       
                    //根据id删除商品
            deleteGoodsById(goodsId) {
                this.$confirm(`确定删除id为 ${goodsId} 的商品吗?`, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //根据id查找到该条数据在数组中的索引值
                    //参考:http://es6.ruanyifeng.com/#docs/array#%E6%95%B0%E7%BB%84%E5%AE%9E%E4%BE%8B%E7%9A%84-find-%E5%92%8C-findIndex
                    const index = this.goodsList.findIndex(item => {
                        return item.id == goodsId
                    })
                        // 删除索引对应的数据
                    this.goodsList.splice(index, 1)

                //调用localStorageHelper中Vue根实例的的删除方法
                    this.$store.commit('deleteGoodsById', goodsId)
                }).catch(() => {
                    console.log("cancel")
                });
            },
        //继续购物
            continueBuy() {
                this.$router.push({path:'./site/goodslist'})
            },
            //提交订单
            goToOrder () {
                // const tempArray = [],
                // this.goodsLis.forEach(item =>{
                //     if(item.isSelected) {
                //         tempArray.push(item.id)
                //     }
                // })
                // if(tempArray.length == 0) {
                //     this.$message({
                //         message:"至少选一件商品",
                //         type:'warning'
                //     })
                //     return
                // }

                // 声明一个新数组,方便存用户选中的商品
                const tempArray = []

                this.goodsList.forEach(item => {
                    if (item.isSelected) {
                        tempArray.push(item.id)
                    }
                })

                if (tempArray.length == 0) {
                    this.$message({
                        message: '请至少选择一件商品',
                        type: 'warning'
                    });

                    return
                }


                //编程式导航
              //join() 方法用于把数组中的所有元素放入一个字符串。
                this.$router.push({path:`/site/order/${tempArray.join(',')}`})
            
                
            }
        }
    }
</script>