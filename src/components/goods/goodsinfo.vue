<template>
    <div>
            <div class="section">
                <div class="location">
                    <span>当前位置：</span>
                    <a href="/index.html">首页</a> &gt;
                    <a href="/goods.html">购物商城</a> &gt;
                    <a href="/goods/42/1.html">商品详情</a>
                </div>
            </div>
            <div v-if="goods.goodsinfo" class="section">
                <div class="wrapper clearfix">
                    <div class="wrap-box">
                        <div class="left-925">
                            <div class="goods-box clearfix">
                                <div class="pic-box">
                                    <div class="magnifier" id="magnifier1">
    <div class="magnifier-container">
        <div class="images-cover"></div>
        <!--当前图片显示容器-->
        <div class="move-view"></div>
        <!--跟随鼠标移动的盒子-->
    </div>
    <div class="magnifier-assembly">
        <div class="magnifier-btn">
            <span class="magnifier-btn-left">&lt;</span>
            <span class="magnifier-btn-right">&gt;</span>
        </div>
        <!--按钮组-->
        <div class="magnifier-line">
            <ul class="clearfix animation03">
                <li v-for="item in goods.imglist" :key="item.id">
                    <div class="small-img">
                        <img :src="item.thumb_path" />
                    </div>
                </li>
            </ul>
        </div>
        <!--缩略图-->
    </div>
    <div class="magnifier-view"></div>
    <!--经过放大的图片显示容器-->
</div>
                                </div>
                                <div class="goods-spec">
                                    <h1>{{goods.goodsinfo.title}}</h1>
                                    <p class="subtitle">{{goods.goodsinfo.sub_title}}</p>
                                    <div class="spec-box">
                                        <dl>
                                            <dt>货号</dt>
                                            <dd id="commodityGoodsNo">{{goods.goodsinfo.goods_no}}</dd>
                                        </dl>
                                        <dl>
                                            <dt>市场价</dt>
                                            <dd>
                                                <s id="commodityMarketPrice">¥{{goods.goodsinfo.market_price}}</s>
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dt>销售价</dt>
                                            <dd>
                                                <em id="commoditySellPrice" class="price">¥{{goods.goodsinfo.sell_price}}</em>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="spec-box">
                                        <dl>
                                            <dt>购买数量</dt>
                                            <dd>
                                                <div class="stock-box">
                                                        <el-input-number v-model="goodsCount" :min="1" :max="goods.goodsinfo.stock_quantity" size="small"></el-input-number>
                                                </div>
                                                <span class="stock-txt">
                                                    库存
                                                    <em id="commodityStockNum">{{goods.goodsinfo.stock_quantity}}</em>件
                                                </span>
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dd>
                                                <div id="buyButton" class="btn-buy">
                                                    <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                    <button ref="addToShopCartRef" @click="addToShopCart" class="add">加入购物车</button>
                                                </div>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div id="goodsTabs" class="goods-tab bg-wrap">
                                 <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li @click="isShowComment=false">
                                            <a href="javascript:;" :class="!isShowComment?'selected':''" >商品介绍</a>
                                        </li>
                                        <li  @click="isShowComment=true"> 
                                            <a href="javascript:;" :class="isShowComment?'selected':''">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                                </Affix>
                                <!-- 商品介绍 -->
                                <div v-show="!isShowComment" class="tab-content entry" style="display: block;">
                                    <div class="goodsIntrodution" v-html="goods.goodsinfo.content"></div>
                                </div>
                                <!-- 错误点
                                1.在v-show中取反的
                                 -->
                                 <!-- <div v-show="!isShowComment" class="tab-content entry" style="display: block;">
                                <div class="goodsIntrodution" v-html="goods.goodsinfo.content"></div>
                            </div> -->
                                <div v-show="isShowComment" class="tab-content" style="display: block;">
                                    <div class="comment-box">
                                        <div id="commentForm" name="commentForm"
                                            class="form-box">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="conn-box">
                                                <div class="editor">
                                                    <textarea ref="commentTextRef" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                    <span class="Validform_checktip"></span>
                                                </div>
                                                <div class="subcon">
                                                    <input id="btnSubmit" @click="postComment" name="submit" type="submit" value="提交评论" class="submit">
                                                    <span class="Validform_checktip"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <ul id="commentList" class="list-box">
                                            <p style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                            <li v-for="item in commentInfo.message" :key="item.id">
                                                <div class="avatar-box">
                                                    <i class="iconfont icon-user-full"></i>
                                                </div>
                                                <div class="inner-box">
                                                    <div class="info">
                                                        <span>{{item.user_name}}</span>
                                                        <span>{{item.add_time | dateFmt('YYYY-MM-DD HH:mm:ss')}}</span>
                                                    </div>
                                                    <p>{{item.content}}</p>
                                                </div>
                                            </li>
                                           
                                        </ul>
                                        <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                            <el-pagination
                                                @size-change="handleSizeChange"

                                                @current-change="handleCurrentChange"
                                                :current-page="pageIndex"
                                                :page-sizes="[2, 20, 30, 40]"
                                                :page-size="pageSize"
                                                layout="total, sizes, prev, pager, next, jumper"
                                                :total="commentInfo.totalcount">
                                            </el-pagination>
                                            <!-- 
                                                 @size-change:每页条数
                                             -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="left-220">
                            <div class="bg-wrap nobg">
                                <div class="sidebar-box">
                                    <h4>推荐商品</h4>
                                    <ul class="side-img-list">
                                        <li v-for="item in goods.hotgoodslist" :key="item.id">
                                            <div class="img-box">
                                                <router-link :to="'/site/goodsinfo/'+item.id" class="">
                                                    <img :src="item.img_url">
                                                </router-link>
                                            </div>
                                            <div class="txt-box">
                                                <router-link :to="'/site/goodsinfo/'+item.id" class="">{{item.title}}</router-link>
                                                <span>{{item.add_time | dateFmt}}</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

     <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
            <div v-show="isShowAnimateImg" ref="animateImgRef" v-if="goods.imglist" class="animateImg">
                <img :src="goods.imglist[0].thumb_path" alt="">
            </div>
     </transition>

        
        </div>       
</template>
<style scoped>

    @import "../../statics/site/js/jqplugins/jqimgzoom/css/magnifier.css";

    .goodsIntrodution{
        padding: 10px;
    }

        .animateImg {
        height: 50px;
        width: 50px;
        position: absolute;
        top: 0;
        left: 0;
        transition: all .5s;
    }

    .animateImg img {
        width: 100%;
        height: 100%;
    }
</style>


<script>
// 导入放大镜的js
import "../../statics/site/js/jqplugins/jqimgzoom/js/magnifier.js"
//按需导入iview的Affix的组件
import { Affix} from 'iview';

    export default {
        data(){
            return {
                goods:{},   
                goodsCount:1,//购买数量
                isShowComment:false,
                commentInfo:{},
                pageIndex:1,
                pageSize:2,
                addToShopCartOffset:null,
                shoppingCartCountOffset:null,//
                isShowAnimateImg:false


            }
        },
          components: {//在这里注册我们goodsinfo.vue的所有子组件
            Affix
        },
        watch:{
            $route:function(newValue,oldValue){
                this.getGoodsInfoData()
            }
        },
        created(){
            this.getGoodsInfoData()
            this.getCommentListData()
        },
        updated(){
             $('#magnifier1').imgzoon({magnifier:'#magnifier1'});
        },
        methods:{
            getGoodsInfoData(){
                //在我s代码中要访问Vue实例对象的属性，必须加this，但是在模版中可以省略this
                const url = `site/goods/getgoodsinfo/${this.$route.params.goodsId}`

                this.$axios.get(url).then(response=>{
                    this.goods = response.data.message
                    // console.log(this.goods)
                    setTimeout(()=>{
                        this.addToShopCartOffset=$(this.$refs.addToShopCartRef).offset()
                        //给动画元素设置top left值
                        $(this.$refs.animateImgRef).css({
                            left:this.addToShopCartOffset.left,
                            top:this.addToShopCartOffset.top
                        })
                        this.shoppingCartCountOffset=$("#shoppingCartCount").offset()
                    },200)
                })
            },
            getCommentListData(){
                //Vue实例对象的属性，必须加this，但是在模版中可以省略this
                const url = `site/comment/getbypage/goods/${this.$route.params.goodsId}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`

                this.$axios.get(url).then(response=>{
                    this.commentInfo = response.data
                    
                    // console.log(this.commentInfo)
                })
            },
            //当页容量发生了改变
            handleSizeChange(pageSize) {
                this.pageIndex =1
                this.pageSize=pageSize
                //被调用之后重新刷新生成数据                
                this.getCommentListData()
            },
            //当页码发生了改变
            handleCurrentChange(pageIndex) {
                this.pageIndex=pageIndex
                //被调用之后重新刷新生成数据
                this.getCommentListData()
            },
            postComment(){
                const commenttxt =this.$refs.commentTextRef.value
                console.log("111")

                if(commenttxt.trim().length==0) {
                    this.$message({
                        message:'请输入内容',
                        type:'warning'
                    });
                    return
                }
                const url= `site/validate/comment/post/goods/${this.$route.params.goodsId}`
                 this.$axios.post(url,{commenttxt}).then(response=>{
                    // this.$message = response.data
                    // this.commentInfo = response.data
                    
                    // console.log(this.commentInfo)

                    if(response.data.status !=0){
                        this.$message.err("评论失败")
                    }

                    //清空内容
                    this.$refs.commentTextRef.value=''
                    
                    //给用户提示
                    this.$message({
                        message:'评论成功',
                        type:'success'
                    });

                    //重新获取第一页数据

                    this.pageIndex=1
                    this.getCommentListData()
                })
            },
            
        //  动画
            addToShopCart() {
                this.isShowAnimateImg = true;
                //准备载荷,并且调用mutations方法
                const goods = {
                    goodsId:this.$route.params.goodsId,
                    count:this.goodsCount
                    
                }
                this.$store.commit('addGoods', goods)
            },

        //   动画的开始
            beforeEnter: function (el) {
                // 设置起始位置
                el.style.left = this.addToShopCartOffset.left + 'px'
                el.style.top = this.addToShopCartOffset.top + 'px'
                el.style.transform = "scale(1)"
            },
            // 此回调函数是可选项的设置
            // 与 CSS 结合时使用
            enter: function (el, done) {
                //刷新动画帧
                el.offsetWidth

                // 设置进入阶段结束位置
                el.style.left = this.shoppingCartCountOffset.left + 'px'
                el.style.top = this.shoppingCartCountOffset.top + 'px'
                el.style.transform = "scale(0.5)"

                // setTimeout(() => {
                done()
                // }, 500);
            },
            afterEnter: function (el) {
                // ...
                this.isShowAnimateImg = false
            }

          
        }
    }


</script>