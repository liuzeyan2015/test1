

 //对商品信息在localStorage中的增删改查

 const KEY = "goods"


//  导出localStorage中最新的商品总数
  


 export const getTotalLocalCount =() =>{
     //{"90":1,"92":2,"94":3}
     const localGoodsObj = getLocalGoodsObj()
    console.log(localGoodsObj)//{95: 6}

     let totalCount = 0
     for(const key in localGoodsObj){
        totalCount +=localGoodsObj[key]
     }
     return totalCount
 }
/**
 * 根据key值获取保存在localStorage中的商品信息,最终把它转成对象
 * 
 */

 export const getLocalGoodsObj=()=>{
     return JSON.parse(localStorage.getItem(KEY)||'{}')
 }




  export const addLocalGoods =(goods) =>{

     /**
     * 把传递进来的商品信息 {goodsId:88,count:3} 保存到localStorage中
     * 但是需要注意一下，如果原先的goodsId存在，把我们count累加
     * 如果不存在添加一个键值对
     */
      const localGoodsObj = getLocalGoodsObj()  
      if(localGoodsObj[goods.goodsId]){
          localGoodsObj[goods.goodsId] +=goods.count
      }else{
          localGoodsObj[goods.goodsId] = goods.count
      }
      localStorage.setItem(KEY,JSON.stringify(localGoodsObj))

     //返回给Vuex的buyCount，这样我们App.vue中的总数量才会改变
      
      return getTotalLocalCount()
  }

  //更改本地的商品信息

  export const updateLocalGoods =(goods) =>{
      const localGoodsObj = getLocalGoodsObj()

      localGoodsObj[goods.goodsId] = goods.count
      localStorage.setItem(KEY,JSON.stringify(localGoodsObj))

      //返回给Vuex的buyCount，这样我们App.vue中的总数量才会改变
       
       return getTotalLocalCount()
      
  }
    //删除本地的商品信息

  export const deleteLocalGoodsById =(goods) =>{
    const localGoodsObj = getLocalGoodsObj()

    delete localGoodsObj[goodsId]
    localStorage.setItem(KEY,JSON.stringify(localGoodsObj))

    //返回给Vuex的buyCount，这样我们App.vue中的总数量才会改变
     
     return getTotalLocalCount()
    
}