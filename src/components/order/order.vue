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
                                <li class="active">
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
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                            <el-form ref="orderForm" status-icon  :model="order" :rules="rules" label-width="150px">
                                <div class="form-box address-info">
                                     <el-form-item label="收货人姓名：" prop="accept_name">
                                        <el-input style="width:600px" v-model="order.accept_name"></el-input>
                                     </el-form-item>
                                     <el-form-item label="所属地区："  prop="area">
                                        <v-distpicker @selected="onSelected" :province="order.area.province.value" :city="order.area.city.value" :area="order.area.area.value"></v-distpicker>
                                     </el-form-item>
            
                                     <el-form-item label="详细地址：" prop="address" >
                                        <el-input style="width:600px" v-model="order.address"></el-input>
                                     </el-form-item>
                                      <el-form-item label="手机号码：" prop="mobile">
                                        <el-input style="width:600px" v-model="order.mobile"></el-input>
                                     </el-form-item>
                                      <el-form-item label="电子邮箱：" prop="email">
                                        <el-input style="width:600px" v-model="order.email"></el-input>
                                     </el-form-item>
                                      <el-form-item label="邮政编码：" prop="post_code">
                                        <el-input style="width:200px" v-model="order.post_code"></el-input>
                                     </el-form-item>
                            </div>
                        </el-form>
                            <h2 class="slide-tit">
                                <span>2、支付方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                               
                                        <!-- <input name="payment_id" type="radio" onclick="paymentAmountTotal(this);" value="1"> -->
                                          <el-radio v-model="order.payment_id" label="6">在线支付</el-radio>    手续费：0.00元
                                   
                            </ul>
                            <h2 class="slide-tit">
                                <span>3、配送方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <!-- <li>
                                    <label>
                                        <input name="express_id" type="radio" onclick="freightAmountTotal(this);" value="1" datatype="*" sucmsg=" ">
                                        <input name="express_price" type="hidden" value="20.00">顺丰快递
                                        <em>费用：20.00元</em>
                                        <span class="Validform_checktip"></span>
                                    </label>
                                </li> -->
                                <el-radio-group @change="switchExpress" v-model="order.express_id">
                                    <el-radio :label="1">顺丰快递(20元)</el-radio>
                                    <el-radio :label="2">圆通快递(18元)</el-radio>
                                    <el-radio :label="3">韵达快递(10元)</el-radio>
                                </el-radio-group>
                            </ul>
                            <h2 class="slide-tit">
                                <span>4、商品清单</span>
                            </h2>
                            <div class="line15"></div>
                            <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                <tbody>
                                    <tr>
                                        <th colspan="2" align="left">商品信息</th>
                                        <th width="84" align="left">单价</th>
                                        <th width="84" align="center">购买数量</th>
                                        <th width="104" align="left">金额(元)</th>
                                    </tr>
                                    <tr v-for="item in goodsList" :key="item.id">
                                        <td width="68">
                                            <a target="_blank" href="/goods/show-89.html">
                                                <img :src="item.img_url" class="img">
                                            </a>
                                        </td>
                                        <td>
                                            <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                        </td>
                                        <td>
                                            <span class="red">
                                                {{item.sell_price}}
                                            </span>
                                        </td>
                                        <td align="center">{{item.buycount}}</td>
                                        <td>
                                            <span class="red">
                                                {{item.sell_price*item.buycount}}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="line15"></div>
                            <h2 class="slide-tit">
                                <span>5、结算信息</span>
                            </h2>
                            <div class="buy-foot clearfix">
                                <div class="left-box">
                                    <dl>
                                        <dt>订单备注(100字符以内)</dt>
                                        <dd>
                                            <textarea v-model="order.message" name="message" class="input" style="height:35px;"></textarea>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="right-box">
                                    <p>
                                        商品
                                        <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                        <label id="goodsAmount" class="price">{{totalAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p>
                                        运费：￥
                                        <label id="expressFee" class="price">{{order.expressMoment}}</label> 元
                                    </p>
                                    <p class="txt-box">
                                        应付总金额：￥
                                        <label id="totalAmount" class="price">{{getSum}}</label>
                                    </p>
                                    <p class="btn-box">
                                        <a class="btn button" href="/cart.html">返回购物车</a>
                                        <a id="btnSubmit" @click="getOrder" class="btn submit">确认提交</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
</template>
<script>
import VDistpicker from 'v-distpicker'
import {getLocalGoodsObj} from '../../common/localStorageHelper.js'

  export default {
       components: { VDistpicker },
    data() {
        // 手机验证

    //     function isPoneAvailable($poneInput) {  
    //       var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;  
    //       if (!myreg.test($poneInput.val())) {  
    //           return false;  
    //       } else {  
    //           return true;  
    //       }  
    //   }  

    var checkMobile = (rule,value,callback)=>{
        if(!value) {
            return callback(new Error('手机号不能为空'));
        }
       
          var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;  
          if (!myreg.test(value)) {  
              callback(new Error('手机号非法')); 
          } else {  
              callback()
         
      }  
    }



      return {
          totalCount:0,
          totalAmount:0,
          //定义goodsList为空
        goodsList:[],
        order: {
          accept_name: '柳泽燕',
        //   area: '',
          address: '中粮商务公园3栋',
          mobile: '13823528433',
          email: '1425384623@qq.com',
          post_code: '565656',
          area:{
              "province":{code:"140000",'value':"广东省"},
              "city":{code:"140100",'value':"深圳市"},
              
              "area":{code:"140106",'value':"宝安区"}              
          },
          payment_id:"6",//6代表在线支付
          express_id:"1",
          expressMonent:20,
          message:"快点发货哦亲"

          
        },
         rules: {
          naaccept_name: [
            { required: true, message: '请输入收获人姓名', trigger: 'blur' },
          ],
          area:[
            { required: true, message: '请选择所属地区', trigger: 'blur' },
          ],
          address:[
            { required: true, message: '请选择地址', trigger: 'blur' },
          ],
           mobile:[
            { required: true, validate: 'checkMobile', trigger: 'blur' },
          ],

        },
    }
},
created(){
    this.getGoodsListData()
},
computed:{
    getSum(){
        return this.order.expressMonent+this.totalAmount
    }
},
    
    methods: {
        //选择之后的省市联动
        onSelected(area) {
            this.order.area=area
        },
       
    //   onSubmit() {
    //     console.log('submit!');
    //   }

     //切换快递的方式
    switchExpress(label) {
        switch (label){
            case "1":
            this.order.expressMonent =20
            break;
             case "2":
            this.order.expressMonent =18
            break;
             case "3":
            this.order.expressMonent =10
            break;
            default:
                break;            
        }
    },
    getGoodsListData(){
        //获取传递来的Id
        const ids = this.$route.params.ids
        console.log(ids)//id分别为87,88,89,90,91,92,94,95
        //提供给后台
        this.order.goodsids = ids

        //url
        const localGoods= getLocalGoodsObj()

        // 提供给后台cargoodsobj
        this.order.cargoodsobj =localGoods

        const url=`site/validate/order/getgoodslist/${ids}`
        this.$axios.get(url).then(response =>{
            let tempCount =0
            let tempAmount = 0
            response.data.message.forEach(item =>{
                item.buycount=localGoods[item.id]
                tempCount +=item.buycount
                tempAmount += item.buycount+item.sell_price
            })
            this.totalCount=tempCount
            this.totalAmount = tempAmount
            this.order.goodsAmount=tempAmount
            this.goodsList=response.data.message
            
        })
    },


    //提交订单
   getOrder(){
       this.$refs.orderForm.validate((valid) =>{
           if(valid) {
               const url=`site/validate/order/setorder`
               this.$axios.post(url,this.order).then(response=>{
                   if(response.data.status ==1 ){
                       this.$message.error('提交失败')  
                    //    return
                       console.log(order)
                   }
                   const tempIdArray =this.$route.params.ids.split(',')
                   tempIdArray.forEach(goodsId=>{
                       this.$store.commit('deleteGoodsById',goodsId)
                   })


                   //跳转支付页面

                   this.$router.push({
                       path:'./site/payOrder/${response.data.message.orderid}'
                   })
               })
           }
           else{
                
                    console.log('submit!');
                    return false

           }
       })
   }
    }
  }
</script>

