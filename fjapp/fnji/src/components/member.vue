<template>
<div class="member">
  <div class="subhead">
      <a class="go-back" @click="back"></a>
      <span class="head-text">{{headtext}}</span>
      <span class="ellipsis" @click="showPopup"></span>
  </div>
  <div class="subcontent">
    <router-view></router-view>
  </div>
  <van-popup
  v-model="show"
  get-container=".member"
  position="top"
   round
   ref="pop"
  :style="{ height: '28%',width:'30%',transform:'translateX(230%)',top:'100px','box-sizing':'border-box',padding:'30px'}"
  >
  <div v-show="show" @click="close" class="btn-wrap">

  
  <button type="button" class="popup-item" @click="toHome">梵几主页</button>
  <button type="button" class="popup-item" @click="toShopcar">购物中心</button>
  <button type="button" class="popup-item">我的订单</button>
  <button type="button" class="popup-item" @click="userInfo">个人中心</button>
  </div>
  </van-popup>
</div>

</template>

<script>
import { Popup } from 'vant';
// Vue.use(Popup);
export default {
  name: 'member',
  data () {
    return {
      status: '',
      headtext:"",
      show:false,
    }
  },
  methods:{
    userInfo(){
      this.$router.push({path:"/member/user"})
    },
    toHome(){
      // this.close();
      this.$router.push({name:'pageContent'})
    },
    close(){
      this.show=false;
      
    },
    back(){
      this.$router.back()
    },
    showPopup(){
      // let f=this.show;
      this.show=true;
      // console.log(this.show)
    },
    toShopcar(){
      // this.close();
      this.$router.push({name:'shopCar'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-wrap{
  width: 100%;
  height: 100%;
}
.popup-item{
  box-sizing:border-box; 
  width: 100%;
  height: 25%;
  background: white;
  border: none;
  /* outline: none; */
  font-size: 28px;
  line-height: 50px;
  font-family: fantasy;
  color: #999;
  border-bottom: 1px solid #666;
}
.popup-item:last-of-type{
  border: none;
}
.subhead{
  height: 111px;
  position: fixed;
  text-align: center;
  top: 0;
  width: 100%;
  left: 0;
  background: #fff;
  z-index: 101;
}
.subcontent{
  padding:113px 0 96px 0; 
  overflow-x: hidden;
}

.go-back{
  position: absolute;
  left: 10px;
  top: 0;
  width: 111px;
  height: 111px;
  background: url(http://127.0.0.1:81/back.png) no-repeat center;
  background-size: 23%;
  }
.ellipsis{
  position: absolute;
  right: 10px;
  top: 0;
  z-index: 100;
  width: 111px;
  height: 111px;
  background: url(http://127.0.0.1:81/ellipsis.png) no-repeat center;
  background-size: 56%;
  
}
.head-text{
  font: 36px/111px "微软雅黑";

}
</style>
