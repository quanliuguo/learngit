<template>
  <div id="app">
    <!-- <router-link to="/home">hehe</router-link> -->
    <router-view></router-view>
    <div class="scroll-control">

    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
Toast.setDefaultOptions({
  className:"aaa"
})
export default {
  name: 'App',
  data(){
    return{
      
    }
  },
  components:{
  },
  methods:{
    

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
