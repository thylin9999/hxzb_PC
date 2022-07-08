<template>
    <div>
        <div class="box" v-if="roomInfo && anchorInfo">
            <div class="left">
                <div class="top">
                    <img class="img_title" :src="anchorInfo.logo" alt="">
                    <div class="room_title" v-if="roomInfo">{{ roomInfo.room_title }}</div>
                    <div class="sign_list">
                      <div class="anchor"><img class="icon" :src="require('@/assets/images/room/man.png')" alt="">
                        {{ anchorInfo.anchor_name }}
                      </div>
                      <div class="hot"><img class="icon" :src="require('@/assets/images/room/hot.png')" alt=""> {{ anchorInfo.heat }}
                      </div>
                      <div class="room_no">No：<span class="no">{{anchorInfo.member_id}}</span> </div>
                      <div class="sign sigh_item">专业</div>
                    </div>
                    <div class="watch_phone" @mousemove="showModule = true" @mouseleave="showModule = false">手机观看
                        <div v-if="showModule"
                             class="showModule scale clear">
                            <div class="txt_call">精彩解说，尽在海豹直播！</div>
                            <div class="txt_share_box">
                                <span>分享到：</span>
                                <div class="img_share_box">
                                    <img :src="require('@/assets/images/room/qq.png')" class="btn" alt=""
                                         @click="shareClick('qq')">
                                    <img :src="require('@/assets/images/room/qq_zoom.png')" class="btn" alt=""
                                         @click="shareClick('qqZone')">
                                </div>
                            </div>
                            <div class="box_copy">
                                <input disabled type="text" class="inp_url" v-model="shareUrl">
                                <span class="btn copy" @click="copy">复制链接</span>
                            </div>
                            <div class="qr_share">
                                <QR :widthT="95"></QR>
                                <p class="txt">扫码分享</p>
                            </div>
                        </div>
                    </div>
                    <div class="book_box">
                        {{ anchorInfo.follow }}人 | <span class="book_btn" v-throttle="[()=>followHost(),3000]"
                    >{{ anchorInfo.is_follow ? '已订阅' : '订阅'
                        }} </span>
                    </div>
                </div>
                <div class="video_box">
                    <VideoRoom v-if="roomInfo.live_status == 2" :videoInfo="roomInfo"></VideoRoom>
                    <CloseRecom v-else class="closeRecommend"></CloseRecom>
                    <div class="leaveStatus" v-if="roomInfo.live_status == 1 ">主播已离开</div>
                </div>
            </div>
            <div class="right">
                <Chat></Chat>
            </div>
        </div>
        <RecommendAndRank class="tj wrap-1200" is-live></RecommendAndRank>
    </div>
</template>

<script>
import QR from '@/views/Layout/QR'
import Chat from './chat/index'
import RecommendAndRank from '@/components/RecommendAndRank'
import VideoRoom from '@/components/VideoRoom'
import { statusCode } from '@/utils/statusCode'
import { liveRoom } from '@/api/competition/competition'
import { Message } from 'element-ui'
import { followHost } from '@/api/Host/Host'
import { mapState } from 'vuex'
import CloseRecom from './closeRecom'
import { Copy } from '@/utils/validator'

export default {
    name: 'liveRoom',
    components: {
        QR,
        Chat,
        RecommendAndRank,
        VideoRoom,
        CloseRecom
    },
    data () {
        return {
            shareUrl: 'http://h5.wuhaicj.com/#/home',
            showModule: false,
            matchInfo: null,
            roomInfo: null,
            anchorInfo: null
        }
    },
    beforeRouteEnter (to, from, next) { // 进入直播间请求直播间信息
        next(vm => {
            vm.getInfo({ room_id: vm.$route.query.room_id })
        })
    },
    computed: {
        ...mapState('user', ['token'])
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
                this.roomInfo = data.room_info
                this.matchInfo = data.room_info && data.room_info.match_info
                this.anchorInfo = data.anchor_info
            }
        },
        async followHost () {
            if (!this.token) {
                Message.error('请先登录')
                this.openLoginDialog()
                return
            }
            try {
                const { code, msg } = await followHost(this.anchorInfo.member_id)
                if (code === 200) {
                    // this.anchorInfo.is_follow = this.anchorInfo.is_follow ? 1 : 0
                    if (this.anchorInfo.is_follow === 1) {
                        this.anchorInfo.is_follow = 0
                        this.anchorInfo.follow -= 1
                    } else {
                        this.anchorInfo.is_follow = 1
                        this.anchorInfo.follow += 1
                    }
                }
                Message.success(msg)
            } catch (e) {
                console.log('出错了')
            }
        },
        shareClick (type) {
            const title = '海豹直播'
            const summary = '海豹直播将为您呈现全球经典赛事解说'
            const image = require('@/assets/logo.png')
            const url = window.location.href// 获取当前网页地址
            let sharesinastring = null // 跳转的url地址;
            if (type === 'qq') { // 扫码  移动端
                let _shareUrl = 'https://connect.qq.com/widget/shareqq/index.html?'
                _shareUrl += 'url=' + encodeURIComponent('http://h5.wuhaicj.com/#/home' || url)
                _shareUrl += '&title=' + encodeURIComponent(title || '自定义')
                window.open(_shareUrl, '_blank')// qq
            }
            if (type === 'qqZone') {
                sharesinastring = `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&title=${title}&pics=${image}&summary=${summary}`
                window.open(sharesinastring, '_blank')// qq空间
            }
        },
        copy () { // 复制内容
            Copy(this.shareUrl)
        }
    }
}
</script>

<style scoped lang="scss">
    .box {
        //margin-top: 20px;
        height: 591px;
        width: 1200px;
        margin: 20px auto;
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

                .room_title {
                    font-size: 18px;
                    position: absolute;
                    top: 20px;
                    left: 110px;
                    color: #333;
                    font-weight: 600;
                }

                .sign_list{
                  position: absolute;
                  overflow: hidden;
                  bottom: 20px;
                  left: 90px;
                  font-size: 12px;
                  color: #9f9f9f;
                  .anchor {
                    height: 20px;
                    padding-left: 20px;
                    font-size: 12px;
                    color: #9f9f9f;
                    overflow: hidden;
                    float: left;
                  }

                  .hot {
                    padding-left: 10px;
                    float: left;
                    height: 20px;
                    font-size: 14px;
                  }

                  .icon{
                    width: 14px;
                    height: 14px;
                    vertical-align: center;
                    line-height: 20px;
                  }
                  .room_no{
                    height: 20px;
                    float: left;
                    line-height: 14px;
                    padding-left: 15px;
                    .no{
                      color: #333;
                    }
                  }

                  .sigh_item{
                    float: left;
                    padding: 4px 8px;
                    background: rgba(51,85,255,.1);
                    color: #37f;
                    border-radius: 2px;
                    font-size: 12px;
                    margin-left: 10px;
                    line-height: 11px;
                  }
                }

                .watch_phone {
                    cursor: pointer;
                    border-radius: 5px;
                    padding: 10px 20px;
                    font-size: 12px;
                    position: absolute;
                    bottom: 10px;
                    right: 135px;
                    cursor: pointer;
                    color: #fff;
                    background-color: #fa5406;

                    .showModule {
                        position: absolute;
                        top: 32px;
                        left: -180px;
                        width: 360px;
                        height: 180px;
                        padding: 15px 16px 20px;
                        border-radius: 4px;
                        box-shadow: 0 8px 10px 0 rgba(40, 38, 45, 0.2);
                        background-color: #fff;
                        z-index: 9999;

                        .txt_call {
                            float: left;
                            width: 100%;
                            height: 20px;
                            font-size: 16px;
                            color: #28262d;
                            text-align: center;
                            line-height: 25px;
                        }

                        .txt_share_box {
                            width: 60%;
                            height: 90px;
                            position: absolute;
                            top: 50px;
                            font-size: 14px;

                            .img_share_box {
                                display: flex;
                                justify-content: space-evenly;
                            }
                        }

                        .box_copy {
                            float: left;
                            position: absolute;
                            bottom: 25px;
                            left: 20px;

                            .inp_url {
                                height: 31px;
                                border: solid 1px #ccc;
                                border-top-left-radius: 4px;
                                border-bottom-left-radius: 4px;
                                border-right: none;
                                background-color: #fff;
                                box-sizing: border-box;
                                text-indent: 20px;
                            }

                            .copy {
                                color: #fff;
                                display: inline-block;
                                padding: 9px 13px 8px;
                                border-top-right-radius: 4px;
                                border-bottom-right-radius: 4px;
                                border-left: 0;
                                background-color: #689fee;
                            }
                        }

                        .qr_share {
                            width: 100px;
                            height: 100px;
                            position: absolute;
                            bottom: 36px;
                            right: 16px;

                            .txt {
                                width: 100%;
                                color: #000000;
                                text-align: center;
                            }
                        }
                    }
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
                position: relative;
                background-color: #000;
                .closeRecommend{
                  position: absolute;
                  width: 100%;
                  bottom: 50px;
                }
                .leaveStatus {
                  letter-spacing: 2px;
                  cursor: pointer;
                  position: absolute;
                  top: 90px;
                  left: 0;
                  right: 0;
                  margin: auto;
                  width: 152px;
                  height: 52px;
                  border-radius: 5px;
                  color: #fff;
                  font-size: 15px;
                  text-align: center;
                  line-height: 52px;
                  background-color: #ff5d23;

                  .iconMute {
                    width: 18px;
                    height: 18px;
                    vertical-align: text-bottom;
                  }
                }
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
