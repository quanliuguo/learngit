<template>
  <div class="img-hot" >
    <div style="position:relative">
      <div v-for="(v,i) in dataItem.links" :key="i" v-bind:style="{position:'absolute',background:'pink',width:v.width+'px',height:v.height+'px',left:v.left+'px',top:v.top+'px',opacity:'0.3'}">
        {{v.width}}
        <router-link class="aaaa" :to="v.url" ></router-link>
      </div>
      <img :src="dataItem.imgUrl" style="width:100%">
    </div>
    
    
   </div>
</template>

<script>

export default {
  name:"ImgHot",
  data () {
    return {
    }
  },
  props:["dataItem"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a{
  display: inline-block;
  width: 100%;
  height: 100%;
}
img{
  vertical-align: middle;
}
</style>
