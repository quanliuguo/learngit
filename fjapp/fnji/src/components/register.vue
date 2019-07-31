<template>
<div class="register">
     <div class="content">
      <div class="page-title">
        <img src="http://127.0.0.1:81/fnji.png " />
      </div>
      <form  class="form">
        <div class="form-row check-phone">
          <input type="text" class="phone-email" placeholder="手机/邮箱" v-model="inputObj.admin">
          <button class="check" type="button" @click="checkAdmin(inputObj.admin)">{{this.checkState}}</button>
        </div>
        <!-- 用户账号 -->
        <div class="form-row">
          <input type="text" class="check-number" placeholder="验证码" v-model.number="inputObj.checkNum">
        </div>
        <!-- 用户密码。 -->
        <div class="form-row">
          <input type="password" placeholder="密码" v-model="inputObj.pwd">
        </div>
        <!-- 确认密码 -->
        <div class="form-row">
          <input type="password" class="makesure" placeholder="重复密码" v-model="inputObj.checkPwd">
        </div>

        <!-- 同意协议 -->
        <div class="form-row is-agree">
           <label>
             <input type="checkbox" v-model="inputObj.isAgree">
              我已阅读并同意遵守
              <a href="#">法律声明</a>
              和
              <a href="#">隐私条款</a>
           </label>

        </div>
       <!-- 登录按钮 -->
       <div class="form-row to-register">
         <button type="button" @click="reg">
           注册
         </button>
       </div>
      </form>

    </div>
</div>

</template>

<script>
// import Vue from 'vue'
import { Toast } from 'vant';
Toast.setDefaultOptions({
  className:"aaa"
})
import axios from 'axios'
export default {
  name: 'register',
   data () {
     return {
        status:"register",
        headtext:"注册",
        checkNum:"",
        checkState:"验证",
        receiveObj:{

        },
        inputObj:{
          admin:"",
          checkNum:"",
          pwd:"",
          isAgree:false,
          checkPwd:"",
        }

     }
   },
   created(){
     console.log("11111111")
    this.$parent.status=this.status;
    this.$parent.headtext=this.headtext;
    console.log("xxxxxxxx",this.inputObj)
   },
   methods:{
     //用来检验是不是手机号或者邮箱
     checkAdmin(adminStr){

       let f=true;
       //手机号的正则；
       let str1=/^[1][3,4,5,7,8][0-9]{9}$/;
       //邮箱的正则
        let str2 = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        f=str1.test(adminStr)||str2.test(adminStr);
        if(!f){
          Toast.fail("请输入正确的邮箱或手机号")
        }else{
          //格式正确的情况下
          //发验证码 1.手机号传给后台  2 后台生成四位随机数 3. 并发给前台 data中（前台保留3分钟有效期）
          let url="http://127.0.0.1:81/getRandom?admin="+this.inputObj.admin;
          axios({
              url
          }).then(res=>{
            // console.log("验证码信息===>",res)
            this.checkNum=res.data.obj.checkNum;
            this.receiveObj=res.data.obj;
            // console.log("你的验证码为===>",this.receiveObj);
            console.log("这里的验证码",this.checkNum)
            this.checkState=20;
            let timer=setInterval(()=>{
              this.checkState--;
               if(!this.checkState){
                 this.checkState="验证";
                 this.receiveObj={};
                clearInterval(timer)
              }
            },1000)
            //
            // console.log("000",this.receiveObj.admin)
            // console.log("1111",this.receiveObj.checkNum)
          }).catch(err=>{
            console.log("err",err);

          })
        }
     },

     //注册
    reg(){
      //用来检验验证码是否相等 密码是否确认成功
      if(this.inputObj.checkNum===""){
        // Toast.setDefaultOptions({
        //   className:"normal-toast"
        // })
        Toast("请输入验证码")
        return;
      }
      if(this.inputObj.checkNum!==this.checkNum||this.inputObj.admin!==this.receiveObj.admin){
        Toast("验证码错误");
        return ;
      }
      if(this.inputObj.pwd===""){
        Toast("请输入密码");
        return ;
      }
      if(this.inputObj.checkPwd===""){
        Toast("请再次却认密码");
        return ;
      }
      if(this.inputObj.pwd!==this.inputObj.checkPwd){
        Toast("请输入一致的密码")
        return;
      }
      if(!this.inputObj.isAgree){
        Toast("勾选是否同意协议")
        return ;
      }
      let url="http://127.0.0.1:81/addpostUser";
      let data={
        admin:this.inputObj.admin,
        password:this.inputObj.pwd
      }
        let that=this;
        console.log("that==>",that);
      axios.post(url,data).then(res=>{
        console.log(res);
        Toast.success("注册成功")
      
        setTimeout(()=>{
          this.$router.replace({
            name:"login",
            params:{
               admin:that.inputObj.admin,
               pwd:that.inputObj.pwd
            },
          })
        },1000)


      }).catch(err=>{
        console.log(err)
      })
    }
   }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .aaa{
    transform: scale(2,2);
    -ms-transform: scale(2,2);	/* IE 9 */
    -webkit-transform: scale(2,2) translate(-30%);	/* Safari 和 Chrome */
    -o-transform: scale(2,2);	/* Opera */
    -moz-transform: scale(2,2);	/* Firefox */
  }
</style>
<style scoped>
/* .login{

} */
.normal-toast{
  transform: scale(200%,200%);
/*  width: 600px;
  height: 200px; */
}
button{
  border:none;
  outline: none;
}
.member-head{
  height: 111px;
  border-bottom: 1px solid #C0C0C0;
  position: relative;
  text-align: center;
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
  width: 111px;
  height: 111px;
  background: url(http://127.0.0.1:81/ellipsis.png) no-repeat center;
  background-size: 56%;
}
.head-text{
  font: 36px/111px "微软雅黑";
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
.phone-email{
  background: #ffffff;
  border-bottom:1px solid ;
  width: 73%;
  height: 70px;
  font-size: 30px;
  outline: none;
}
button{
  height: 70px;
  font: 30px/75px "微软雅黑";
  color: white;
  border: none;
  outline: none;
}
.check-phone button{
  background: #999;
  width: 25%;
}
input.check-number,input[type=password],input.makesure{
  width: 100%;
  height: 70px;
  background: #fff;
  font: 30px/70px "微软雅黑";
  outline: none;
  border-bottom:1px solid ;
}
input.makesure,input.check-number{
  background: #fff;

}
.is-agree input[type=checkbox]{
  width: 30px;
  height: 30px;
  margin-right: 15px;
  vertical-align: middle;
}
.is-agree{
  font: 25px/30px "微软雅黑";
}
.is-agree a{
  color: brown;
}
.to-register button{
  width: 100%;
  height: 80px;
  font: 30px/80px "微软雅黑";
  background: #000000;
  color: white;
}


</style>
