<template>
  <div class="myfootnav">
    <ul class="nav">

      <li class="nav-item" v-for="(v,i) in navLinks" :key="i">
        <!-- {{v.link}} -->
        <!-- <router-link :to="{
          name:'goodPage',
          query:{
            goods:v.link
            }
          }" active-class="nav-active" >{{v.name}}</router-link> -->
         <span :class="['links',{isactive:isactive==i}]" @click="toGoodPage(v.link,i)">{{v.name}}</span>
      </li>

    </ul>
   </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'myfootnav',
  data () {
    return {
      navLinks: [
        {
          "name": "家具",
          "link": "furniture"
        },
        {
          "name": "家居",
          "link": "grocery"
        }],
        isactive:3,
    }
  },
  created(){
    // this.getData();

  },
  methods:{
    getData(){
      let url="http://localhost:81/getData";
      axios({
      url
    }).then(res=>{
      let arr=JSON.parse(res.data.data)
      // console.log("aaarrr",arr)
      this.arr=arr.navLinks;
	  console.log("arr",this.arr)
      // this.MenuScroll=
    }).catch(err=>{
      console.log("err:",err)
    })
    },
 ///////////////
  toGoodPage(param,i){
    this.isactive=i;
    this.$router.replace({
          name:'goodPage',
          query:{
            goods:param
            }
          })
  }

  },
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.router-link-exact-active.nav-active{
  color:#000;
  border-top:2px solid #000;
}
.myfootnav{
    height: 98px;
    background: white;
    font-family:"楷体";
    font-weight: 400;
    box-sizing: border-box;
}
.nav{
  display: flex;
  height: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0;
  list-style: none;
  padding-left: 0;
  font-size: 40px;
  line-height: 95px;
}
.nav-item{
  width: 50%;
  position: relative;
  text-align: center;
  box-sizing: border-box;
}
.nav-item+.nav-item:before {
    content: "|";
    position: absolute;
    left: 0;
    top: 56%;
    font-size: 50px;
    color: #666;
    /* transform: translateY(-50%) rotate(15deg) 	; */
     transform: translateY(-50%)	;
}
.nav-item .links{
    border-top:2px solid #fff;
  box-sizing: border-box;
  display: inline-block;
  color: #666;
  width: 100%;
  height:100%;
}
.nav-item .isactive{
  /* background: chocolate; */
  color:#000;
  border-top:4px solid #000;
}
</style>
