<template>
    <div>
        <div class="box" v-if="roomInfo && anchorInfo">
            <div class="left">
                <div class="top">
                    <img class="img_title" :src="anchorInfo.logo" alt="">
                    <div class="vs" v-if="matchInfo">{{matchInfo.homeChs}} VS {{matchInfo.awayChs}}</div>
                    <div class="anchor">{{anchorInfo.anchor_name}}</div>
                    <div class="hot">{{anchorInfo.heat}}</div>
                    <div class="watch_phone">手机观看</div>
                    <div class="book_box">
                        {{anchorInfo.follow}}人 | <span class="book_btn"> 订阅</span>
                    </div>
                </div>
                <div class="video_box">
                    <VideoHome class="video_con"></VideoHome>
                </div>
            </div>
            <div class="right">
                <div class="announces">直播公告：</div>
                <div class="txt_top">直播间禁止任何传播违法、违规、低俗等信息行为，一经发现将给予封禁处理，请勿相信任何方式的诱导打赏，私下交易等行为，以防人身或财产损失</div>
                <div class="chat">
                </div>
                <div class="send_model">
                    <input class="send_inp" type="text" placeholder="发送聊天信息">
                    <button class="send_btn">发送</button>
                </div>
            </div>
        </div>
        <RecommendAndRank class="tj"></RecommendAndRank>
    </div>
</template>

<script>
import RecommendAndRank from '@/components/RecommendAndRank'
import VideoHome from '@/components/VideoHome'
import { statusCode } from '@/utils/statusCode'
import { liveRoom } from '@/api/competition/competition'

export default {
    name: 'liveRoom',
    components: {
        RecommendAndRank,
        VideoHome
    },
    data () {
        return {
            matchInfo: null,
            roomInfo: null,
            anchorInfo: null
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            // vm.$route.query.room_id
            // if (from.name == null) {
            //     // 先用ID查直播间信息  主播 房间 赛事等 然后跳转
            //     vm.$store.dispatch("goLiveRoom", {
            //         room_id: vm.$route.query.room_id,
            //     })
            //     if (localStorage.getItem("token")) {
            //         vm.$store.dispatch("getUserInfo")  //更新个人数据
            //     }
            // } else {
            //     console.log('外部跳转')
            // }
            vm.getInfo({ room_id: vm.$route.query.room_id })
        })
    },
    mounted () {
        this.$router.afterEach((to, from, next) => {
            window.scrollTo(0, 0)
        })
    },
    methods: {
        async getInfo (dataJson) {
            const { data, code } = await liveRoom(dataJson)
            if (code === statusCode.success) {
                console.log('----------data----------')
                console.log(data)
                this.roomInfo = data.room_info
                this.matchInfo = data.room_info && data.room_info.match_info
                this.anchorInfo = data.anchor_info
            }
        }
    }
}
</script>

<style scoped lang="scss">
  .box {
    //margin-top: 20px;
    height: 591px;
    width: 1200px;
    margin:20px auto;
    display: flex;
    justify-content: space-around;

    .left {
      width: 858px;
      height: 100%;
      border: 1px solid #ccc;

      .top {
        width: 100%;
        height: 101px;
        background-color: #fff;
        position: relative;

        .img_title {
          width: 69px;
          height: 69px;
          position: absolute;
          top: 16px;
          left: 16px;
          border-radius: 50%;
        }

        .vs {
          font-size: 17px;
          position: absolute;
          top: 20px;
          left: 90px;
          color: #333;
        }

        .anchor {
          font-size: 12px;
          position: absolute;
          bottom: 20px;
          left: 90px;
          color: #9f9f9f;
        }

        .hot {
          font-size: 12px;
          position: absolute;
          bottom: 20px;
          left: 190px;
          color: #9f9f9f;
        }

        .watch_phone {
          color: #9f9f9f;
          border-radius: 5px;
          padding: 10px 20px;
          font-size: 12px;
          position: absolute;
          bottom: 10px;
          right: 190px;
        }

        .watch_phone:hover {
          color: #fff;
          font-size: 12px;
          position: absolute;
          background-color: #fa5406;
        }

        .book_box {
          font-size: 12px;
          position: absolute;
          bottom: 10px;
          right: 20px;
          padding: 10px 20px;
          border-radius: 5px;
          color: #fff;
          background-color: #fa5406;

          .book_btn {
            cursor: pointer;
          }
        }
      }

      .video_box {
        width: 100%;
        height: 490px;
      }
    }

    .right {
      width: 334px;
      height: 591px;
      border: 1px solid #ccc;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;

      .announces {
        height: 40px;
        width: 100%;
        padding: 10px 20px;
        border-bottom: 1px solid #dddaaa;
      }

      .txt_top {
        height: 85px;
        padding: 10px 20px;
        color: #9f9f9f;
        font-size: 14px;
      }

      .chat {
        width: 100%;
        height: 416px;
      }

      .send_model {
        width: 100%;
        height: 50px;
        padding: 10px 5px;
        display: flex;

        .send_inp {
          font-size: 14px;
          flex: 1;
          background-color: #eee;
          color: #000;
          text-indent: 10px;
          border: none;
          outline: none;
        }

        .send_btn {
          width: 57px;
          font-size: 14px;
          border-style: none;
          color: #fff;
          background-color: #999;
          cursor: pointer;
        }
      }
    }
  }

  .tj {
    padding-top: 50px;
  }
</style>
