<template>
  <div class="user">
      <div class="block-up">
          <img src="https://m.fnji.com/view-v2/webm/static/img/member/cat.jpg" alt="">
          <p>18210780187</p>
      </div>
      <div class="block-nav">
          <i class="iconfont icon-dingbudaohang-zhangh"></i>
          个人信息
          <i class="iconfont icon-right"></i>
      </div>

      <div class="block-nav">
          <i class="iconfont icon-dizhi"></i>
          地址管理
          <i class="iconfont icon-right"></i>
      </div>
      <div class="block-nav">
          <i class="iconfont icon-order"></i>
          我的订单
          <i class="iconfont icon-right"></i>
      </div>
      <div class="block-nav">
          <i class="iconfont icon-fapiao"></i>
          我的发票
          <i class="iconfont icon-right"></i>
      </div>
      <router-link :to="{name:'shopCar'}">
          <div class="block-nav">
          <i class="iconfont icon-gouwuche"></i>
          购物车
          <i class="iconfont icon-right"></i>
            </div>
      </router-link>
      <div class="exit">
          <button type="button" @click="exitUser">
              退出账号
          </button>
      </div>
   </div>
</template>

<script>

export default {
  name: 'user',
  data () {
    return {
      msg:"这是个人中心"
    }
  },
  created(){
      this.$parent.status='user'
      this.$parent.headtext="个人中心"

  },
  methods:{
      exitUser(){
          sessionStorage.removeItem("token")
          this.$router.push({name:'login'})
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.exit{
    padding: 30px 0;
    text-align: center;
}
.exit button{
    border: none;
    outline: none;
    width: 29%;
    height: 90px;
    line-height: 90px;
    background: #222;
    color: white;
    font-size: 34px;
}
*{
    box-sizing: border-box;
}
.block-up{
    background: #222;
    padding: 77px 0;
    text-align: center;
    color: white;
    font-size: 26px;
}
.block-up img{
    width: 18%;
    border-radius:50%; 
    margin-bottom: 18px;
}
.block-nav{
    font-size: 34px;
    line-height: 100px;
    box-sizing: border-box;
    padding: 0 20px;
    border-bottom: 1px solid #ccc;
}
.block-nav i{
    font-size: 50px;
}
.block-nav i:last-of-type{
    float: right;
}
.block-nav i:first-of-type{
    margin-right:10px;
    padding-top: 10px;
    
    
}

</style>

