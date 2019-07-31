<template>
  <div class="myhead">
      <div class="left">
        <a class="link" @click="toggleMenu">
          <i class="iconfont icon-caidan"></i>
        </a>
        <router-link class="link" to="search-shop"><i class="iconfont icon-sousuo"></i></router-link>
        <!-- <a href="#" class="link">

        </a> -->
      </div>
      <a class="center">

      </a>
      <div class="right">
        <router-link to="/member/shopCar"><i class="iconfont icon-gouwuche"></i></router-link>
        <router-link to="/member/shopCar">

        <i class="iconfont icon-qingdan"></i>
        </router-link>

        <router-link to="/member/user" class="link"><i class="iconfont icon-dingbudaohang-zhangh"></i></router-link>
      </div>
      <van-popup
  v-model="show"
  get-container="body"
  position="left"
   ref="pop"
  :style="{ height: '100%',width:'70%',background:'rgba(244,244,244,0.9)'}"
 >
    <div class="wrap">

    </div>
     </van-popup>
   </div>
</template>

<script>
import {Popup} from 'vant'; 
export default {
  name: 'myhead',
  data () {
    return {
      show:false,
      list:[
        {
          title:"关于我们",
          underTitle:[
            "STORY","实体店","媒体报道","招聘信息"
          ]
        },
        {
          title:"购物指南",
          underTitle:[
            "购物流程","会员制度"
          ]
        },
        {
          title:"关于配送",
          underTitle:[
            "家居配送","家居配送","一枚版配送"
          ]
        },

        {
          title:"售后服务",
          underTitle:[
            "家居售后","家居售后"
          ]
        },
        {
          title:"商业合作",
          underTitle:[
            "项目批量采购","设计公司合作","家居品牌合作","市场&媒体合作","艺术合作"
          ]
        },
      ]
    }
  },
  // props:["toggleMenu"],
  methods:{
    toggleMenu(){
      console.log(1111111111111)
      this.show=true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap{
  width: 100%;
  height:100%;
  /* background: rgba(red, green, blue, alpha) */
}
.myhead{
  position: relative;
  height: 100%;
  width: 100%;
  text-align: center;
  font-size: 34px;
  line-height: 100%;
  background: white;
}
.left{
  position:absolute;
  top: 0;
  /* bottom: 0; */
  height: 100%;
  width:25%;
  /* background: #ccc; */
  padding-left: 2.5%;
  text-align: left;
}
.center{
  display: inline-block;
  width: 90px;
  height: 100%;
  background:#393939 url(https://m.fnji.com/view-v2/web/static/img/page-header/fnji_white.png) no-repeat 50%;
  background-size: 55% auto;
}
.right{
  width: 30%;
  height: 100%;
  position: absolute;
  top: 0;
  right:0;
   /* background: #ccc; */
   text-align: right;
   padding-right: 2.5%;
}
.left>.link,.right>.link{
  display: inline-block;
  padding: 0 5px;
}
.left>.link>i,.right>.link>i{
  font-size:46px;
  line-height: 125px;
}
.icon-gouwuche{
  font-size: 46px;

}
.icon-qingdan{
  font-size: 42px;
}

</style>
