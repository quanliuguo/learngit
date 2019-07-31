<template>
  <div class="shopcar">
    <div class="step-title">
      <div class="row-step dots">
        <span class="dot black-dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
      <div class="row-step step-text" >
        <span class="text-item">购物车</span>
        <span class="text-item">生成订单</span>
        <span class="text-item">激活订单</span>
        <span class="text-item">付款</span>
      </div>
      <hr/>
    </div>
    <div class="content" >
      <!-- 每个种类都有一个循环 -->
      <div class="kind" v-for="(v,i) in arr" :key="i" >
        <div class="kind-title">
          <input type="checkbox" value="furniture" class="kind-checkbox" v-model="v.isChecked" @change="controlAll(i)">{{v.title}}
        </div>
        <div class="kind-content">
          <!-- 这是一个商品 -->
          <div class="good-item" v-for="(vv,ii) in v.subarr" :key="ii">
            <input type="checkbox" class="item-checkbox" v-model="vv.isChecked" @change="toggle(arr,i)">
            <div class="good-img" >
              <div>
              </div>
              <img :src="vv.mainImage|srcstr" alt="">
            </div>
            <div class="good-des">
              <div class="good-name">
                {{vv.name}}
              </div>
              <div class="good-intro">
                {{vv.specs}}
              </div>
              <div class="good-color">
                {{vv.color}}
              </div>
            </div>
            <div class="good-control">
              <button type="button" class="num-minus" @click="minusNum(vv,i,ii)" >-</button>
              <input type="number"  class="goodnum" v-model='vv.num'>
              <button type="button" class="num-add" @click="addNum(vv,i,ii)">+</button>
            </div>
            <div class="good-price">
              ￥{{vv.price}}
            </div>
          </div>
        </div>
        
      </div>
    </div>
    <!-- 下方的结算兰 -->
    <div class="under-fixed" v-show="arr.length!==0">
      <div class="left">
        <span class="num-total">已经选购了{{numTotal}}件商品</span>
        <span class="count-price">总计:￥{{priceTotal}}</span>
      </div>
      <div class="right" v-show="hasConfirm">
        结算
      </div>
      <div class="right" @click="confirm" v-show="!hasConfirm">
        确认订单
      </div>
    </div>
    <span class="prompt" v-show="arr.length==0">
      购物车里空空如也. . .
    </span>
   </div>
</template>

<script>
import {Toast} from 'vant'
import axios from 'axios'
import {mapGetters,mapMutations,mapActions,mapState} from 'vuex'
export default {
  name: 'shopCar',
  data () {
    return {
      msg: 'login',
      num:1,
      token:"",
      arr:[],
      // shopCar:[],
      kindChecked:true,
      allKind:["furniture","grocery"],
      selectedKind:[],
      hasConfirm:false,
    }
  },
  computed:{
    // arr(){
    //   //找到目前所有的分离
    //   let allkinds=[];
    //   for(let item of this.goodArr){
    //    if(!allkinds.includes(item.kind)){
    //      allkinds.push(item.kind)
    //    }
    //   }
    //   //现在已经拿到了数组
    //   let arr=[];
    //   for(let v of allkinds){
    //     let a=this.goodArr.filter((a,b,c)=>{
    //       return a.kind===v;
    //   });
    //     //得到一种数组；
        
    //     arr.push({title:v,subarr:a})
    //   }
    //  return arr;
    // },
    numTotal(){
      let n=0;
      let arr=this.arr;
      console.log("arr",arr)
      for(let item of arr){
        // if(item.isChecked){
          for(let v of item.subarr){
          if(v.isChecked){
            n+=v.num
          }
      //  }
      }
       
      
      } 
      return n;
    },
    priceTotal(){
      let s=0;
      let arr=this.arr;
      console.log("arr",arr)
      for(let item of arr){
       for(let v of item.subarr){
         if(v.isChecked){
           s+=v.price*100*v.num/100;
         }
       }
      } 
      return s;
    }

  },
  filters:{
    // 过滤器用于截取 src字符串
      srcstr(img){
        // console.log(img)
        let imgstr=img+"";
        let datacut=imgstr.slice(3);
        let imgurl='http://127.0.0.1:81/'+datacut;
        return imgurl.replace(/.png/,".jpg")
      }
},
  created(){
    this.$parent.headtext="购物车";
    let token=sessionStorage.token;
    let url="http://127.0.0.1:81/getShopcar";
            axios.get(url, {
                params: {
                    token:token
                }
            }).then(res=>{
                
                let shopCar=res.data.shopCar;
                // this.shopCar=shopCar
                      //找到目前所有的分离
                  let allkinds=[];
                  for(let item of shopCar){
                  if(!allkinds.includes(item.kind)){
                    allkinds.push(item.kind)
                  }
                  }
                  //现在已经拿到了数组
                  let arr=[];
                  for(let v of allkinds){
                    let a=shopCar.filter((a,b,c)=>{
                      return a.kind===v;
                  });
                    //得到一种数组；
                    arr.push({title:v,subarr:a})
                  }
                this.arr=arr;


            }).catch(err=>{
                console.log("err:",err)
            })
  },
  methods:{
    confirm(){
      // this.hasConfirm=true;
      let arr=[];
       for(let item of this.arr){
       for(let v of item.subarr){
         if(v.isChecked){
           arr.push(v);
         }
       }
      } 
      if(arr.length){
      
      }
      console.log('确定购物车里有',arr.length,"件商品")
      let url='http://127.0.0.1:81/replaceShopcar'
      let data={shopCar:arr,
        token:sessionStorage.token
        }
      axios.post(url,data).then(data=>{
        // console.log("res",data)
        
        Toast("订单已提交，请在8小时内付款")
        this.hasConfirm=true;
      }).catch(err=>{
        console.log("err:",err)
      })
    },
    //这是一种
    minusNum(vv,index,subIndex){
      console.log("点击+好")
      if(vv.num>1){
        vv.num--
      }else{
        let obj=this.arr[index]
        let subArr=obj.subarr;
        subArr.splice(subIndex,1)
       console.log('this.shopcar',this.shopCar)
        if(subArr.length==0){
          this.arr.splice(index,1)
        }
      } 
    },
    addNum(obj,i,ii){
      if(obj.num<50){
        obj.num++;
      }
    },
    // controlNum(newId,f){
    //   console.log("newId",newId)
      // let obj=this.arr.find((item,index)=>{
      //   return item.newId===newId
      // })
      // console.log("obj",obj)
      // if(f){
      //   obj.num++;
      // }
    toggle(arr,index){
     let tog=0;
     let obj=arr[index]
     let subArr=obj.subarr
     for(let i=0;i<subArr.length;i++){
       if(subArr[i].isChecked){
         tog++;
       }
     }
     if(subArr.length==tog){
      obj.isChecked=true
     }else{
       obj.isChecked=false;
     }
   },

  ////////////////////////
      controlAll(index){
    let obj=this.arr[index];
    let f=obj.isChecked?true:false
    obj.subarr.forEach((item,i)=>{
         this.$set(item,"isChecked",f)

    })
  }


    },
 

  

 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img{
  width: 100%;
}
.step-title{
   box-sizing: border-box;
   padding: 30px;
    margin-bottom: 50px;
}
.row-step{
  font-size: 28px;

}
.prompt{
  font-size: 40px;
  font-family: fantasy;
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);

}
hr{
  position: relative;
  top:10px;
}
.dots{
  display: flex;
  justify-content: space-between;
}
.dot{
  display: inline-block;
  height: 14px;
  width: 14px;
  border: 1px solid;
  border-radius: 50%;
  background: white;
  position: relative;
  top: 66px;
  z-index: 2;
}
.black-dot{
  background: #000;
}
.step-text{
  display: flex;
  margin-bottom:20px;
  justify-content: space-between;
}
.kind-title,.kind-content{
  box-sizing: border-box;
  padding: 30px 30px;
  /* border: 1px solid; */
}
.kind-title{
  border-bottom:1px solid #ddd; 
  font-size: 30px;
  font-weight: 500;
  font-family: fantasy;
}
.good-item{
  display: flex;
  justify-content:space-between;
  align-items: center;
  margin: 35px 0;
}
.good-img{
  width: 17%;
  /* height: 1px; */
  /* border:1px solid red; */
}
.good-img img{
  width: 100%;
  height: 100%;
}

.good-des{
  width: 30%;
  height:200px ;
  /* border:1px solid red; */
}
.good-name{
  font:34px/34px "微软雅黑";
  padding-top: 20px;
  margin-bottom:20px; 
}
.good-intro{
  width:100%;
  font: 30px/32px "微软雅黑";
  color: #666;
  white-space:nowrap;
  text-overflow:ellipsis;
  overflow: hidden;
  margin-bottom: 15px;
}
.good-color{
  font-size: 26px;
  color:#999;
}
.good-control{
  width: 22%;
  height: 46px;
  /* border:1px solid red; */
}
.good-control input,.good-control button{
  margin: 0;padding: 0;
  width: 31%;
  height: 100%;
  text-align: center;
  font-size: 26px;
}
.good-price{
  width: 13%;
  height:24px;
  /* border:1px solid red; */
  font-size:20px; 
}
.kind-checkbox,.item-checkbox{
  width: 30px;
  height: 30px;

}
.kind-checkbox{
  margin-right: 20px;
}
.content{
  padding-bottom: 95px;
}
.under-fixed{
  width: 100%;
  height: 95px;
  position: fixed;
  bottom: 0;
  background: #f2f2f2;
  
}
.left{
  float: left;
  /* display: inline-block; */
  width:69%;
  box-sizing: border-box;
  padding: 0 20px;
  font:24px/95px "微软雅黑";
  display: flex;
  justify-content: space-between;
  font-weight: 400;
}
div.right{
  text-align: center;
  float: left;
  /* display: inline-block;s */
  width: 31%;
  font: 34px/95px "微软雅黑";
  background: #393939;
  color: white;
}
</style>
