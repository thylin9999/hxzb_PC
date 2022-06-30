<template>
    <div class="video-player" style="width: 100%;height: 100%">
        <div id="video-player-tag"></div>
        <div id="dplayer" ref="dplayer" style="width: 100%;height: 100%">
            <div style="width: 100%;height: 100%">
                <img :src="liveCover" alt="" draggable="false" style="width: 100%;height: 100%">
            </div>
        </div>
        <img class="big-play-btn" :src="logo" v-if="showPuse" @click="bigPause"/>
        <div class="showRefresh btn" @mousemove="showRefresh = true" @mouseleave="showRefresh = false">
            <p @click="videoRefresh">刷新</p>
        </div>
        <div class="control" @mousemove="showQuality = true" @mouseleave="showQuality = false">
            <span class="btn"> {{qualityType == 'Original' ? '原画质' : qualityType == 'HD' ? '高清' : '普通'}}  </span>
            <div class="control_box" v-show="showQuality">
                <ul class="quality_list">
                    <span class="btn" @click="changeQuality('Original')">超清</span>
                    <span class="btn" @click="changeQuality('HD')">高清</span>
                    <span class="btn" @click="changeQuality('ordinary')">一般</span>
                </ul>
            </div>
        </div>
    </div>
</template>
<script src="flv.min.js"></script>
<script src="hls.min.js"></script>
<script src="DPlayer.min.js"></script>
<script>

    import { liveRoom } from '@/api/competition/competition'

    export default {
        props: {
            isLive: {
                type: Boolean,
                default: () => true
            },
            videoInfo: {
                type: [Object, Array],
                default: () => {
                },
            },
            refresh: {  //当前界面是刷新操作会暂停 备用
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                liveCover: require("@/assets/images/common/live-cover.jpg"),
                logo: require("@/assets/images/common/logo.png"),
                refreshItem: true,
                danmus: [],
                showQuality: false,
                showRefresh: false,
                roomInfo: {
                    rtmp_url: '',
                    rtmp_live: ''
                },
                timeOut: false,
                dp: null,
                qualityType: 'Original', // 'Original'  'HD'  'ordinary'
                showPuse: false,
            }
        },
        computed:{
            videoInfoItem(){
                return JSON.parse(JSON.stringify(this.videoInfo))
            }
        },
        async mounted() {
            try {
                setTimeout(() => {
                    this.showPuse = true;
                    this.showPuse = false;
                    this.changeQuality(this.qualityType)
                }, 1000)
            } catch (e) {
            }
        },
        methods: {
            handlePlay() {
                this.$refs.dplayer.play()
                this.isPlay = false
            },
            handlePause() {
                alert('pause')
                this.$refs.dplayer.pause()
                this.showPuse = true
            },
            bigPause() {
                this.showPuse = false
                this.timeOut = true
                if (this.dp) {
                    this.dp.toggle()
                }
            },
            changeQuality(type) {
                this.qualityType = type || 'HD'
                this.showQuality = false  //高清... 切换 展示
                let rtmp_url = this.roomInfo.rtmp_url
                let rtmp_live = this.roomInfo.rtmp_live
                let url = rtmp_url + "?" + rtmp_live
                url = url.replace("m3u8", "flv") //m3u8转flv
                this.playList = {
                    'Original': url.replace(rtmp_url.split("_")[1], '1080p.flv'),
                    'HD': url.replace(rtmp_url.split("_")[1], '720p.flv'),
                    'ordinary': url.replace(rtmp_url.split("_")[1], '480p.flv'),
                }
                this.init()
            },
            videoRefresh() {
                this.init()
            },
            async init() {
                if (this.roomInfo) {
                    let url = ""
                    if (this.playList) {
                        url = this.playList[this.qualityType]
                    } else {
                        url = `${this.roomInfo.rtmp_url}?${this.roomInfo.rtmp_live}`
                    }
                    window.flvjs = (await import(/* webpackChunkName: "flv" */ 'flv.js')).default
                    const DPlayer = (await import(/* webpackChunkName: "dplayer" */ 'dplayer')).default
                    this.dp = new DPlayer({
                        container: document.getElementById("dplayer"),
                        autoplay: true,
                        live: this.isLive,
                        volume: 0.5,
                        danmaku: false,
                        hotkey: true,
                        lang: "zh-cn",
                        video: {
                            url,
                            type: 'auto',
                        },
                    })
                    this.dp.volume(0.5) // 设置初始声音
                    setTimeout(() => {
                        this.dp.play()
                    }, 500)
                }
            },
            playVideo() {
                this.refreshItem = false
                this.dp && this.dp.play()
            },
        },
        watch: {
            refresh(newVal) {
                console.log(newVal)
            },
            dp: {
                handler: function (newValue, old) {
                    if (newValue.paused) {
                        // console.log('暂停')
                        this.refreshItem = true
                        this.showPuse = true
                    } else {
                        // console.log('播放')
                        this.refreshItem = false
                        this.showPuse = false
                    }
                },
                deep: true
            },
            showPuse(newValue, oldValue) {
                if (newValue) {
                    this.timeOut = false
                } else {
                    this.timeOut = true
                    let that = this
                    clearTimeout(this.threeSecond)
                    this.threeSecond = setTimeout(function () {
                        that.timeOut = false
                    }, 2000)
                }
            },
           async videoInfoItem(newVal,oldVal){
               if(this.dp) this.dp.destroy()
               try {
                   const { data } = await liveRoom({room_id:newVal.room_id})
                   this.roomInfo = JSON.parse(JSON.stringify(data.room_info))
                   this.changeQuality(this.qualityType)
               } catch (e) {
                   console.log('请求房间信息出错了了')
               } finally {
                   this.isLoading = false
               }
            }
        },
        beforeDestroy() {
            if (this.dp) {
                this.dp.destroy()
            }
        },
    };
</script>

<style lang="scss">
  .dplayer-danloading {
    display: none !important;
  }

  .dplayer-bezel-icon {
    display: none !important;
  }

  .imgBnner {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }

  .big-play-btn {
    position: absolute;
    width: 200px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

  .video-player {
    position: relative;
    overflow: hidden;

    .play_img {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      z-index: 100;
    }

    .dplayer-full-cover {
      width: 40px;
      height: 40px;
      //background: blue;
      position: absolute;
      top: 0;

      &:hover {
        cursor: pointer;
      }
    }

    .dankumu {
      width: 100%;
      height: 80%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }

    .control {
      color: #fff;
      text-align: center;
      line-height: 38px;
      font-size: 14px;
      width: 58px;
      height: 38px;
      position: absolute;
      right: 65px;
      bottom: 0;
      z-index: 0;

      .control_box {
        width: 78px;
        height: 97px;
        position: absolute;
        bottom: 18px;
        left: -10px;

        .quality_list {
          width: 78px;
          height: 85px;
          overflow: hidden;
          display: block;
          background: rgba(28, 28, 28, .9);
          font-size: 13px;

          & > span {
            float: left;
            display: block;
            width: 100%;
            height: 25px;
            line-height: 25px;
            background: rgba(28, 28, 28, .9);
          }

          & > span:hover {
            background-color: hsla(0, 0%, 100%, .1);
          }
        }
      }
    }

    .showRefresh {
      color: #fff;
      text-align: center;
      line-height: 38px;
      font-size: 14px;
      width: 58px;
      height: 38px;
      position: absolute;
      left: 200px;
      //bottom: -38px;
      bottom: 0;
      cursor: pointer;
    }
  }

  .danmu_icon {
    vertical-align: middle;
    width: 60px;
  }

  .video-player:hover {
    //.control {  //默认一直展示
    //  bottom: 0;
    //  z-index: 0;
    //}

    .showRefresh {
      bottom: 0;
    }

  }

  .noble_1_color {
    position: relative;
    color: purple;
  }

  //.noble_1_color:before {
  //  content: attr(text);
  //  position: absolute;
  //  z-index: 10;
  //  color: purple;
  //  background: linear-gradient(to left, red, transparent);
  //}

</style>
