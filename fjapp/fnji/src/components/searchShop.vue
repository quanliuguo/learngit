<template>
  <div class="search-shop">
    <div class="search-box">
      <form>
        <div class="search-input">
          <input type="text" placeholder="请搜索...">
        </div>
        <div class="search-btn">
          <button type="button" @click="back">关闭</button>
          <span class="space"></span>
          <button type="submit">查找</button>
        </div>
      </form>
      
    </div>
   </div>
</template>

<script>
export default {
  name: 'searchShop',
  data () {
    return {
     
    }
  },
  methods:{
    back(){
      console.log("0000",this)
      this.$router.back()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
::-webkit-input-placeholder{
  color: #666;
}
.search-box{
  box-sizing: border-box;
  width: 100%;
  /* height: 500px; */
  padding: 60px 50px 0 50px;
}
input{
  box-sizing: border-box;
  width: 100%;
  height: 65px;
  font: 28px/65px "微软雅黑";
  border: 1px solid #666;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  padding: 0 20px 0 74px;
  background: url(http://127.0.0.1:81/search.png) no-repeat 15px;
  background-size:6%; 
}
.search-btn{
  /* border: 1px solid; */
  width: 100%;
  height: 70px;
  margin-top: 30px;
  display: flex;
  /* flex-flow: row nowrap; */
  /* justify-content: space-between； */
}
button{
  height: 60px;
  width: 300px;
  
  outline: none;
  font: 28px/60px "微软雅黑";
}
.space{
  flex: 1;
}
button[type=button]{
  background: white;
  color: #000;
  border: 1px solid #ccc;
}
button[type=submit]{
  background: #000;
  color: #fff;
  border: 1px solid black;
}
</style>
