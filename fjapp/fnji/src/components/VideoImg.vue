<template>
  <div class="video-img">
    <video :src="dataItem.videoUrl" class="video-img-currency" controls="controls" poster="http://127.0.0.1:81/video.jpg" ></video>
   </div>
</template>

<script>

export default {
  name:"VideoImg",
  data () {
    return {
    }
  },
  props:["dataItem"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.video-img-currency {
    width: 100%;
    height: 100%;
}
</style>
