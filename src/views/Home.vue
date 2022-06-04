<template>
  <div class="home">
      <div class="video-box p-relative">
          <div class="bg-box bg-center bg-no-repeat p-absolute w-100"></div>
          <div class="video wrap-1200">

          </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
    name: 'Home',
    components: {
    }
}
</script>
<style lang="scss" scoped>
.video-box{
    .bg-box {
        top: -80px;
        height: 755px;
        background-size: 100% 100%;
        background-image: url('https://cdn.podapi.com/image/slide/20220505/fa0f87d759b3a24eb6da9b27a5861232.jpg');
    }
    .video {
        height: 675px;
        border: 1px solid #eee;
    }
}
</style>
