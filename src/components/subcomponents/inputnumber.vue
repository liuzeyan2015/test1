    <template>
    <div>
        <!-- <div class="left">-</div>
        <div class="middle">{{count}}</div>
        <div class="right">+</div> -->

        <div @click="substrict" class="left">-</div>
        <div class="middle">{{count}}</div>
        <div @click="add" class="right">+</div>
        
    </div>

</template>
<style scoped>  
    .left,.middle,.right{
        width: 30px;
        height: 30px;
        border: 1px solid #cccccc;
        text-align: center;
        line-height: 30px;
        display: inline-block;
    }
</style>
<script>
    export default{
        props:['goodsCount','goodsId'],
        data(){
            return {
                count:1
            }
        },
        created (){
            this.count = this.goodsCount
        },
    
    methods:{
        substrict(){
            if(this.count<=1) return
            this.count--
            // 调用notify方法
            this. notify()
            // console.log(111)            
        },
        add(){
            this.count++
            this. notify()

        },
        notify(){
            const goods = {
                goodsId:this.goodsId,
                count:this.count
            }
             this.$emit('goodsCountChange',goods)
            }
        }
    }
</script>
