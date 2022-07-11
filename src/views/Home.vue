<template>
  <div class="home">
      <div class="box">
          <div class="video-box">
              <div class="video">
                  <div class="video_view">
                      <VideoHome :videoInfo="videoInfo"></VideoHome>
                  </div>
                  <div class="videoList">
                      <div class="item" :class="{select:current == i}" v-for="(item,i) in list" :key="i">
                          <img v-if="current == i" class="icon_arr_r" :src="require('@/assets/images/home/icon-arr-r.png')" alt="">
                          <img @click="selectLive(item,i)" class="item_img" :src="item.live_cover || require('@/assets/images/common/host-avatar.png')" alt="">
                      </div>
                      <div class="item item_blank" v-for="tem in (6-list.length)" :key="1000-tem"></div>
                  </div>
              </div>
          </div>
      </div>
      <div class="bg-gray2">
          <match-list class="m-t-n-10"/>
          <hot-recommend class="wrap-1200" is-home/>
          <div class="banner wrap-1200  bg-center bg-no-repeat bg-size-100" />
          <host-rank />
          <host-list class="wrap-1200" is-home/>
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
import { getHotRooms } from '@/api/competition/competition'
export default {
    name: 'Home',
    components: {
        VideoHome,
        MatchList,
        HotRecommend,
        HostRank,
        HostList
    },
    data () {
        return {
            current: 0,
            videoInfo: {},
            list: [],
            competitions: [],
            showDialog: false
        }
    },
    created () {
        this.fetchData()
    },
    methods: {
        openLoginDialog () {
            this.showDialog = true
        },
        selectLive (item, i) {
            this.current = i
            this.videoInfo = item
            console.log('----videoInfo--')
            console.log(this.videoInfo)
        },
        async fetchData () {
            try {
                const { data } = await getHotRooms({})
                this.videoInfo = data.list[0]
                // 首页展示4条，直播页面展示5条
                this.list = data.list.slice(0, 6)
                this.selectLive(this.videoInfo, 0)
            } catch (e) {
                console.log('出粗了')
            } finally {
                this.isLoading = false
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
.box{
  width: 100%;
  height: 600px;
  background: url('../assets/images/home/bg.png') no-repeat;
  background-size: 100% 100%;
}
.video-box{
    width: 1200px;
    margin: auto;
    height: 574px;
    padding-top: 5px;

    .video {
        height: 574px;
        z-index: 2;
        display: flex;
        border-radius: 5px;
        background-color: rgba(11,9,9,.66);
      overflow: hidden;
        .video_view{
          width: 1024px;
          height: 574px;
        }
        .videoList{
            width: 174px;
            height: 574px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-content: space-around;
          .item{
            border-radius: 5px;
            width: 160px;
            height: 86px;
            border: none;
            position: relative;
            .item_img{
              width: 100%;
              height: 100%;
            }
            .icon_arr_r{
              width: 8px;
              height: 14px;
              position: absolute;
              left: -8px;
              top: 0;
              bottom: 0;
              margin: auto;
              z-index: 2;
            }
          }
          .select{
            border: 2px solid #d2ac84;
          }
          .item:hover{
            border: 2px solid #d2ac84;
          }
          .item_blank:hover{
            border: none;
          }
        }
    }
}
.banner {
    height: 100px;
    border-radius: 5px;
    margin-bottom: 40px;
    background-image: url('../assets/images/home/banner.jpg');
}

</style>
