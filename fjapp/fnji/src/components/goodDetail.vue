<template>
  <div class="good-detail">
      <div class="good-img" >
        <img :src="info.mainImage|srcstr" alt="">
      </div>
      <!-- 下方的数据 -->
      <div class="good-info">
        <!-- 商品名称和价格 -->
        <div class="base-info">
          <h2 class="title-name">
            {{info.name}}
          </h2>
          
          <span class="price">
            ￥{{info.price}}
          </span>
        </div>
        <!-- 选择颜色 -->
         <div class="row-wrap">
        <div class="the-title">
          自选色  Color
          <p class="the-undertitle" style="fontSize:32px">{{colors[picked]}}</p>
        </div>
        <div class="row-wrap">
          <div class="color">
            <label v-for="(v,k,i) in colors" :key="i"><input type="radio" name="color" :value="k" v-model="picked">{{v}}</label>
            <!-- <label><input type="radio" name="color" value="color4"></label> -->
          </div>
        </div>
      </div>
      <div class="row-wrap">
        <p class="the-title under-space">
          型号 Size  <br/>
          <span class="the-undertitle">{{info.skuSizeSpec}}</span>
        </p>
      </div>
      <div class="row-wrap">
        <p class="the-title under-space">
          推荐 Recommend  <br/>
          <span class="the-undertitle">{{info.specs}}</span>
        </p>
      </div>
      <hr/>
      
      <!-- 数量 -->
      <div class="row-wrap">
        <p class="the-title">选购数量 Quantity</p>
      </div>
      <div class="row-wrap">
        <button type="button" class="num-minus" @click="minusNum" >-</button>
        <input type="number" v-model="num" class="goodnum">
        <button type="button" class="num-add" @click="addNum">+</button>
        <span class="jian">件/price</span>
      </div>
      
      <hr/>
      <div class="row-wrap">
        <p class="the-title">发货周期 Delivery</p>
      </div>
      <div class="row-wrap">
        <p class="the-time">48小时内</p>
      </div>
      <div class="row-wrap">
        <p class="detail-link">
          点击查看 <a href="#">配送详情</a>或 <a href="#">会员制度</a>
        </p>
      </div>
      
     
  </div>
  <!-- 下方的购物车 -->
  <div class="under-fixed">
    <div class="left">
      <span class="share">
        <img src="http://127.0.0.1:81/share_transparent.png" alt="">
      </span>
      <span class="kefu">
        <img src="http://127.0.0.1:81/talk_transparent.png" alt="">
      </span>
    </div>
    <div class="center" @click="addShopcar1(goodInfo)">
      加入购物车
    </div>
    <div class="right">
      立即购买
    </div>
  </div>
  <!-- {{goodInfo}} -->
</div>
   

</template>

<script>
import axios from 'axios'
import {mapGetters,mapMutations,mapActions,mapState} from 'vuex'
import {Toast} from 'vant'

export default {
  name: 'goodDetail',
  data () {
    return {
      num:1,
      info:{},
      picked:"c0",
      colors:{"c0":"浅咖","c1":"浅灰","c2":"浅紫","c3":"浅黄"},
    }
  },
  computed:{
    goodInfo(){
      this.$set(this.info,"num",this.num)
      this.$set(this.info,"color",this.colors[this.picked])
      let oldId=this.info.id;
      let c=this.picked;
      this.$set(this.info,"newId",oldId+c)
      // console.log("0000000000000",this.info)
      let self=this;
      return {token:sessionStorage.token,info:self.info};
    }
  },
  filters:{
 
  },
  created(){
    // console.log("商品颜色",this.color)
    // console.log("router",this.$route)
    // console.log("00000")
    // this.$parent.status="goodDetail";
    this.$parent.headtext="商品详情";
    this.getInfo();
    // console.log("this.info==>",this.info)
  },
  methods:{
    addShopcar1(goodInfo){
      if(sessionStorage.token){
        this.addShopcar(goodInfo);
      //给VUEx传指令后，给一个弹窗
      // alert("你好");
      Toast.success("商品添加成功");
      // this.$router
      }else{
        this.$router.push({name:"login"})
      }
      
  },
    addNum(){
      this.num++;
      // this.$set(this.info,"num",this.num)
    },
    minusNum(){
      if(this.num>1)this.num--;
      // this.$set(this.info,"num",this.num)
    },
    //接收传来的ID
    getInfo(){
      
      let self=this;
      let url="http://localhost:81/getDetail"
      console.log("this:",this)
      let id=this.$route.query.id;
      let data={id:id}
      console.log("要穿到后台的数据:",data)
      axios.post(url,data).then(res=>{
        console.log("getDetail==>res:",res)
        // self.$nextTick(()=>{
          self.info=res.data.info;
          // console.log("========",self.info)
        // })
        // self.$set(self.info,"num",self.num)
        // self.$set(self.info,"color",self.picked)
        // console.log("this.info==>",self.info)
      }).catch(err=>{
        console.log("err:",err)
      })
    },
    //当加入购物车时执行的函数
  // addShopcar(){
    // let self=this;
    // let oldId=this.info.id;
    // console.log("///////",this.picked)
    
    

        // this.$set(self.info,"color",color)
        // this.$set(self.info,"newId",oldId+c)

    // console.log("将要加入购物车的数据：",this.info)
  // },
  ...mapActions(["addShopcar"]),

  },
    filters:{
      // 过滤器用于截取 src字符串
    srcstr(img){
      // console.log(img)
      let imgstr=img+"";
      let datacut=imgstr.slice(3);
      let imgurl='http://127.0.0.1:81/'+datacut;
      return imgurl.replace(/.png/,".jpg")
    },
    }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  box-sizing: border-box;
  font-size:24px;
}
.good-img{
  text-align: center;
}
.under-space{
  padding-bottom: 30px;
}
.good-detail{
  padding-bottom: 90px;

}
hr{
  border: 1px solid #999;
}
.row-wrap{
    margin: 30px 0;
}
.good-info{
  padding: 30px;
}
.base-info{
  padding-bottom:20px;
  /* border-bottom:1px solid #666; */
  position: relative;
    
}
.title-name{
  font:normal bold 50px/70px "微软雅黑"; 
  margin-bottom: 20px;
}
span.price{
  position: absolute;
  right: 80px;
  top:20px;
  font-size: 28px;
}
.the-title{
  font-size: 38px;
  position: relative;
}
.num-minus,.num-add{
  width: 70px;
  height: 70px;
  outline: none;
  border-radius: 0;
  border: none;
  cursor:pointer;
  background: black;
  color: white;
  font-size: 50px;
  line-height: 70px;
  padding: 0;
}
.jian{
  font-size:28px; 
}
.goodnum{
  text-align: center;
  width: 85px;
  height: 70px;
  outline: none;
  border:1px solid #ccc;
  font-size: 35px;
  line-height: 70px;
}
.detail-link,.detail-link a{
  font-size:28px;
}
.detail-link{
  padding-bottom: 40px;
  
}
/* .color{
  
} */
.color label{
  font-size: 34px;
  color: #333;
  margin-right: 30px;
}
.color label input[type=radio]{
  width: 30px;
  height:  30px;
  vertical-align: middle;
  margin-right: 10px;
}
.the-undertitle{
  font-size: 28px;
   position: absolute;
  right: 50px;
   bottom: -5px;

}
/* 下方的购物车 */
.under-fixed{
  position: fixed;
  z-index: 1px;
  bottom:-1px;
  overflow: hidden;
  height: 90px;
  left:0;
  right:0;
  background: wheat;
}

.left,.center,.right{
  float: left;
  height: 90px;
  text-align: center;
  font: 34px/90px "宋体";
  font-family:fantasy;
}
.left{
  width: 28%;
  background: #eee;
  display: flex;
}
.center{
  width: 36%;
  background: #999;
  color: white;
}
.right{
  width: 36%;
  color: white;
  background: #333;
}
span.share,span.kefu{
  background: #eee;
  display: inline-block;
  width: 49%;
  height: 100%;
  /* background:url(http:127.0.0.1:81/share_transparent.png) */
}
.share img{
  width: 45%; 
  vertical-align: middle;
}
.kefu img{
  width: 45%; 
  vertical-align: middle;
}
</style>
