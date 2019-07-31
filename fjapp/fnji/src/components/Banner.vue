<template>
  <div class="banner">
    <mu-carousel transition="fade" hide-controls hide-indicators >
      <mu-carousel-item v-for="(v,i) in bannerUrl" :key="i" >
        <img :src="v" style="width:100%;">
      </mu-carousel-item>
    </mu-carousel>
   </div>
</template>

<script>
import museUI from 'muse-ui'
import Vue from 'vue'
Vue.use(museUI);
export default {
  name:"Banner",
  data () {
    return {
      hideControls:true,
      hideIndicators:true
    }
  },
  props:["dataItem"],
  computed:{
    bannerUrl(){
      return this.dataItem.bannerUrl.filter((a)=>{
        return a
      })
    },
    bannerClickUrl(){
      return this.dataItem.bannerClickUrl.filter(urlStr=>{
        return urlStr
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img{
  vertical-align: middle;
}
</style>
