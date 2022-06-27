<template>
  <div class="home">
      <div class="video-box p-t-10 p-relative bg-size-100 bg-center bg-no-repeat">
          <div class="video p-10 bg-black wrap-1450">
              <div class="video_view">
                  <VideoHome></VideoHome>
              </div>
              <div class="videoList m-l-5">
                  <div class="box1 item" v-for="item in [1,2,3,4,5,6]" :key="item">
                      <img class="item_img" src="https://cdn.podapi.com/image/live/20220511/74fe6e768e027c7e8152fdc9156fb6d8?imageView2/2/w/600/h/600" alt="">
                  </div>
              </div>
          </div>
      </div>
      <div class="bg-gray2">
          <match-list class="m-t-n-10"/>
          <hot-recommend class="wrap-1450" is-home/>
          <div class="banner wrap-1450 bg-center bg-no-repeat bg-size-100" />
          <host-rank />
          <host-list class="wrap-1450" is-home/>
<!--          这里暂时先不加-->
<!--          <video-competition />-->
<!--          <events />-->
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import VideoHome from '@/components/VideoHome'
import MatchList from '@/views/Competition/MatchList'
import HotRecommend from '@/components/HotRecommend'
import HostRank from '@/components/HostRank'
import HostList from '@/views/Host/HostList'
import VideoCompetition from '@/views/Competition/VideoCompetition'
import Events from '@/views/components/Events'
export default {
    name: 'Home',
    components: {
        VideoHome,
        MatchList,
        HotRecommend,
        HostRank,
        HostList,
        VideoCompetition
    },
    data () {
        return {
            competitions: []
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
.video-box{
    height: 790px;
    background-image: url('../assets/images/home/bg.png');
    .bg-box {
        top: -80px;
        height: 755px;
        background-size: 100% 100%;
        background-image: url('https://cdn.podapi.com/image/slide/20220505/fa0f87d759b3a24eb6da9b27a5861232.jpg');
        z-index: -1;
    }
    .video {
        height: 750px;
        z-index: 2;
        display: flex;
        border-radius: 15px;
        .video_view{
          width: 1200px;
          height: 730px;
        }
        .videoList{
            width: 235px;
            height: 730px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-content: space-around;
          .item{
            border-radius: 5px;
            width: 235px;
            height: 120px;
            border: none;
            .item_img{
              width: 100%;
              height: 100%;
            }
          }
          .item:nth-child(1){
            border: 2px solid #d2ac84;
          }
          .item:hover{
            border: 2px solid #d2ac84;
          }
        }
    }
}
.banner {
    height: 300px;
    border-radius: 15px;
    margin-top: 40px;
    background-image: url('../assets/images/home/banner.png');
}

</style>
