<template>
  <div class="home-page">
    <div class="myheader" :style="{'position':pos}">
      <myhead/>
      <!-- <myhead  /> -->
    </div>
    <div class="myfoot">
       <myfootnav/>
    </div>
    <div class="page-content">
      <router-view></router-view>
      <!-- <pageContent/> -->
    </div>
    <div class="mymenu" v-show="showMenu">
      <myMenu @toggleMenu="toggleMenu"/>
    </div>
  </div>
</template>

<script>
import myhead from "../myhead"
import myfootnav from "../myfootnav"
import pageContent from "../pageContent"
import myMenu from "../myMenu"

export default {
  name: 'homePage',
  data(){
    return{
      showMenu:false,
      headPos:"fixed",
      pad:"126px"
    }
  },
  components:{
    myhead,
    myfootnav,
    pageContent,
    myMenu,
  },
  methods:{
    toggleMenu(){
      this.showMenu=!this.showMenu;
    },

  },
  computed: {
		pos(){
      // 	$route(to, from) {
			// 	console.log('0000000000000000',to);
      //   console.log(from);
      //   if(to.name!=="homePage"){
      //    this.headPos="absolute"
      //    this.pad="126px"
      //   }else{
      //     this.headPos="fixed"
      //     this.pad="213px"
      //   }
      //   // this.headPos=
      // }
      let pos;
      // let pad;
      let currentCom=this.$route.name;
      // console.log("00000000",currentCom)
      if(currentCom==="pageContent"){
        pos="fixed";
      }else{
        pos="absolute";
      }
      return pos
    }
  },
  

}
</script>

<style>
.home-page{
  position: relative;
  box-sizing:border-box; 
}
.mymenu{
  position:fixed;
  z-index:100;
  top:0;
  left:0;
  bottom: 0;
  right:0;
}
.myheader{

  top:0;
  left:0;
  width: 100%;
  height: 126px;
  z-index: 2;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  /* background: #ccc; */
 
}
.myfoot{
  position: fixed;
  bottom:0;
  left:0;
  width: 100%;
  height: 98px;
  z-index: 10;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  background-color: #ccc;
}
.page-content{
  padding: 126px 0 98px 0;
}

</style>
