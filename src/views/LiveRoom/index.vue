<template>
    <div>
        <div class="box">
            <div class="left">
                <div class="top">
                    <img class="img_title"
                         src="https://cdn.podapi.com/image/avatar/20201129/94c9db716f8fec692e28d177d0d8d960?imageView2/2/w/200/h/200"
                         alt="">
                    <div class="vs">阿尔巴尼亚 VS 爱沙尼亚</div>
                    <div class="anchor">多余说球</div>
                    <div class="hot">232525</div>
                    <div class="watch_phone">手机观看</div>
                    <div class="book_box">
                        {{12345552}}人 | <span class="book_btn"> 订阅</span>
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

export default {
    name: 'liveRoom',
    components: {
        RecommendAndRank,
        VideoHome
    }
}
</script>

<style scoped lang="scss">
  .box {
    padding-top: 20px;
    height: 591px;
    width: 1200px;
    margin: auto;
    //background-color: #ccc;
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
