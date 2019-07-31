<template>
  <div class="container">
    <!-- {{arr}} -->
    <div>
      <div v-for="(v,k) in arr" :key="k" >
        <component :is="v.comp" :dataItem="v"></component>
      </div>
    </div>
  </div>

</template>

<script>
  import { Toast } from 'vant';
  // console.log("toast",Toast())
  Toast.setDefaultOptions({
    className:"aaa"
  })
import axios from 'axios'
import Banner from "./Banner"
import ImgHot from "./ImgHot"
import VideoImg from "./VideoImg"
export default {
  name: 'pageContent',
  data(){
    return{
        arr:[],
    }
  },
  components:{
   Banner,
    ImgHot,
    VideoImg,
  },
  created(){
    this.getData();
  },
  methods:{
    getData(){
      let url="http://localhost:81/getHomedata";
      axios({
      url
    }).then(res=>{
      // let arr=JSON.parse(res.data.data.mainPage)
      // let data=JSON.parse("首页的东西",res.data)
      let str=res.data.data;
      let data=JSON.parse(str);
      this.arr=data.goodshow.homepage
      console.log("首页的东西",this.arr)
      // console.log("aaarrr",arr)
      // this.arr=data.mainPage;
    }).catch(err=>{
      console.log("err:",err)
    })
    }
  }
}
</script>
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

</style>
