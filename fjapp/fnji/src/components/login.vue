<template>
<div class="login">
     <div class="content">
      <div class="page-title">
        <img src="http://127.0.0.1:81/fnji.png " />
      </div>
      <form  class="form">
        <div class="form-row">
          <input type="text" class="admin" placeholder="手机号/邮箱" v-model="admin">
        </div>
        <div class="form-row">
          <input type="password" placeholder="密码" v-model="pwd">
        </div>
        <!-- 忘记密码/保存密码 -->
        <div class="form-row forget-pwd">
           <label>
             <input type="checkbox" value="1" v-model="saveAdmin">记住密码
           </label>
           <span>
             <a href="#">忘记密码及账号</a>
           </span>
        </div>
       <!-- 登录按钮 -->
       <div class="form-row to-login">
         <button type="button" @click="toLogin">
           登录
         </button>
       </div>
        <div class="form-row to-reg">
          还没有梵几账号
          <!-- 注册账号的链接 -->
          <router-link to="/member/reg">
            点击注册
          </router-link>
          <!-- <a @click="toReg"></a> -->
        </div>
        <div class="form quick-login">
            <button type="button">快捷登录</button>
            <span></span>
            <button type="button">微信登录</button>
        </div>
      </form>

    </div>
</div>

</template>

<script>
import axios from "axios";
// import Vue from 'vue'
import { Toast } from 'vant';
// // import 'vant/lib/icon/local.css';
// Vue.use(Icon);
export default {
  name: 'login',
  data () {
    return {
       status:"login",
       headtext:"登录",
       admin:"",
       pwd:"",
       saveAdmin:false
    }
  },
  created(){
    console.log("000000")
   this.$parent.status=this.status;
   this.$parent.headtext=this.headtext;
   let self = this;
   self.getParams()
  },
  methods: {
    getParams () {
    this.admin = this.$route.params.admin
    this.pwd = this.$route.params.pwd
    // // 如果是params 传参，那就是this.$route.params.site

    // 上面就可以获取到传递的参数了
   },
   /////////////////////////////////////////
   toLogin(){
     if(!this.admin||!this.pwd){
       Toast("请输入完整")
       return;
     }
      let url="http://127.0.0.1:81/matchUser"
     let data={
       _admin:this.admin,
       _pwd:this.pwd
     };
     console.log("-----------",data)
     axios.post(url,data).then(res=>{
       console.log("-----",res.data)
       console.log("是否可以登录=========>",res.data.s)
       if(res.data.s){
         Toast.success("登录成功")

         sessionStorage.token=res.data.token
         setTimeout(() => {
           this.$router.push(sessionStorage.current)
         }, 1000);
       }else{
         Toast("您的输入有误或未注册")
       }
     }).catch(err=>{
       console.log("err:",err)

     })
   }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .login{

} */
button{
  border:none;
  outline: none;
}

.page-title{
  text-align: center;
  margin: 50px 0 30px 0;
}
.page-title img{
  width: 10%;
}
.form{
  padding:40px;
}
.form-row{
  margin: 30px 0;
}
input.admin,input[type=password]{
  width: 100%;
  height: 70px;
  background: #fff;
  font: 30px/70px "微软雅黑";
  outline: none;
}
.forget-pwd{
  font-size: 24px;
  position: relative;
}
.forget-pwd input[type=checkbox]{
  width: 30px;
  height: 30px;
  margin-right: 15px;
  vertical-align: middle;
}
.forget-pwd a{
  position: absolute;
  right: 0;
  top: 0;
  color: #ddd0d7;
  text-decoration: underline;
  font-weight: 400;
}
.to-login button{
  width: 100%;
  height: 80px;
  font: 30px/80px "微软雅黑";
  background: #000000;
  color: white;
}
.to-reg{
  font-size: 25px;
  color: #616161;
}
.to-reg a{
    color: #ddd0d7;
  text-decoration: underline;
  font-weight: 400;
}
.quick-login{
  display: flex;

}
.quick-login button{
    width: 44%;
  height: 80px;
  font: 26px/80px "微软雅黑";
  background: #999;
  color: white;
}
.quick-login span{
  flex: 1;
}
</style>
