<template>
  <div class="home">
      <div class="video-box p-relative">
          <div class="bg-box bg-center bg-no-repeat p-absolute w-100"></div>
          <div class="video wrap-1200">
              <div class="video_view">
                  <VideoHome></VideoHome>
              </div>
              <div class="videoList">
                  <div class="box1 item" v-for="item in [1,2,3,4,5,6]" :key="item">
                      <img class="item_img" src="https://cdn.podapi.com/image/live/20220511/74fe6e768e027c7e8152fdc9156fb6d8?imageView2/2/w/600/h/600" alt="">
                  </div>
              </div>
          </div>
      </div>
      <div class="wrap-1200">
          <div class="announces m-t-25 flex justify-between align-center">
              <div class="announce-image h-100 bg-center bg-no-repeat">

              </div>
              <div class="news p-15 h-100">
                  <div class="">
                      <span class="font-14 font-medium">公告</span>
                  </div>
                  <ul class="news-list">
                      <li
                          class="font-12  flex justify-between align-center"
                        v-for="item in news"
                        :key="item.id"
                      >
                          <span class="text-333">{{ item.title }}</span>
                          <span class="text-gray">{{ item.time }}</span>
                      </li>
                  </ul>
              </div>
              <div class="download-image h-100 flex align-center">
                  <div class="flex flex-column align-center m-l-25 ">
                      <qrcode />
                      <div class="font-medium m-t-15 flex flex-column text-white align-center">
                          <span class="font-20">下载APP</span>
                          <span class="font-regular font-12 m-t-10">更多比赛直播</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <recommend-and-rank />
  </div>
</template>

<script>
// @ is an alias to /src
import VideoHome from '@/components/VideoHome'
import Qrcode from '@/components/Qrcode'
import RecommendAndRank from '@/components/RecommendAndRank'
export default {
    name: 'Home',
    components: {
        VideoHome,
        Qrcode,
        RecommendAndRank
    },
    data () {
        return {
            menus: [
                {

                }
            ],
            news: [
                {
                    id: 1,
                    title: '国际足联和卡塔尔公布2022年世界杯吉祥物',
                    path: '',
                    time: '2022-12-25'
                },
                {
                    id: 2,
                    title: '国际足联和卡塔尔公布2022年世界杯吉祥物',
                    path: '',
                    time: '2022-12-25'
                },
                {
                    id: 3,
                    title: '国际足联和卡塔尔公布2022年世界杯吉祥物',
                    path: '',
                    time: '2022-12-25'
                },
                {
                    id: 4,
                    title: '国际足联和卡塔尔公布2022年世界杯吉祥物',
                    path: '',
                    time: '2022-12-25'
                },
                {
                    id: 5,
                    title: '国际足联和卡塔尔公布2022年世界杯吉祥物',
                    path: '',
                    time: '2022-12-25'
                }
            ],
            competitions: []
        }
    }

}
</script>
<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
.video-box{
    padding-bottom: 105px;
    .bg-box {
        top: -80px;
        height: 755px;
        background-size: 100% 100%;
        background-image: url('https://cdn.podapi.com/image/slide/20220505/fa0f87d759b3a24eb6da9b27a5861232.jpg');
        z-index: -1;
    }
    .video {
        height: 570px;
        border: 1px solid #ccc;
        z-index: 2;
        display: flex;
        .video_view{
          width: 1020px;
          height: 570px;
        }
        .videoList{
            width: 176px;
            height: 570px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-content: space-around;
          .item{
            border-radius: 5px;
            width: 160px;
            height: 84px;
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
.announces {
    height: 200px;
    .announce-image {
        width: 510px;
        background-image: url('https://cdn.podapi.com/image/slide/20210930/38c8c91a0ce02be8a5f3727b06013e28.png');
        background-size: 100% 100%;
    }
    .news {
        width: 430px;
        background-color: $text-white;
        .news-list {
            li {
                line-height: 17px;
                margin-top: 12px;
            }
        }
    }
    .download-image {
        width: 240px;
        background-color: $background-color1;
    }
    .recommends {
        background-color: $background-color1;
    }
}

</style>
