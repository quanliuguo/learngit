<template>
  <div class="container">
    <div class="white-screen" @click="toggleMenu"></div>
    <div class="menu-bar">

    </div>
   </div>
</template>

<script>
export default {
  name: 'myMenu',
  data () {
    return {
      msg: 'mymenu'
    }
  },
  methods:{
    toggleMenu(){
      this.$emit("toggleMenu")
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
   height: 100%;
}
.white-screen{
  position: fixed;
  width: 100%;
  height: 100%;
  background: #fff;
  opacity: 0.5;
}
.menu-bar{
  width: 600px;
  height: 100%;
  position: fixed;
  z-index: 999;
  background: #f4f4f4;
}
</style>
