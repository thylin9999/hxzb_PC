<template>
    <div>
        <div class="box" v-if="roomInfo && anchorInfo">
            <div class="left">
                <div class="top">
                    <img class="img_title" :src="anchorInfo.logo" alt="">
                    <div class="vs" v-if="matchInfo">{{ matchInfo.homeChs }} VS {{ matchInfo.awayChs }}</div>
                    <div class="anchor"><img :src="require('@/assets/images/room/man.png')" alt="">
                        {{ anchorInfo.anchor_name }}
                    </div>
                    <div class="hot"><img :src="require('@/assets/images/room/hot.png')" alt=""> {{ anchorInfo.heat }}
                    </div>
                    <div class="watch_phone">手机观看</div>
                    <div class="book_box">
                        {{ anchorInfo.follow }}人 | <span class="book_btn"
                                                         @click="followHost">{{ anchorInfo.is_follow ? '已订阅' : '订阅'
                        }} </span>
                    </div>
                </div>
                <div class="video_box">
                    <VideoRoom :videoInfo="roomInfo" class="video_con"></VideoRoom>
                </div>
            </div>
            <div class="right">
                <Chat></Chat>
                <!--                <div class="announces">直播公告：</div>-->
                <!--                <div class="txt_top">直播间禁止任何传播违法、违规、低俗等信息行为，一经发现将给予封禁处理，请勿相信任何方式的诱导打赏，私下交易等行为，以防人身或财产损失</div>-->
                <!--                <div class="chat">-->
                <!--                </div>-->
                <!--                <div class="send_model">-->
                <!--                    <input class="send_inp" type="text" placeholder="发送聊天信息">-->
                <!--                    <button class="send_btn">发送</button>-->
                <!--                </div>-->
            </div>
        </div>
        <RecommendAndRank class="tj" style="width: 1200px"></RecommendAndRank>
    </div>
</template>

<script>
import Chat from './chat/index'
import RecommendAndRank from '@/components/RecommendAndRank'
import VideoRoom from '@/components/VideoRoom'
import { statusCode } from '@/utils/statusCode'
import { liveRoom } from '@/api/competition/competition'
import { Message } from 'element-ui'
import { followHost } from '@/api/Host/Host'
import { mapState } from 'vuex'

export default {
    name: 'liveRoom',
    components: {
        Chat,
        RecommendAndRank,
        VideoRoom
    },
    data () {
        return {
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

                .vs {
                    font-size: 17px;
                    position: absolute;
                    top: 20px;
                    left: 90px;
                    color: #333;
                }

                .anchor {
                    height: 20px;
                    max-width: 120px;
                    padding-left: 20px;
                    font-size: 12px;
                    position: absolute;
                    bottom: 20px;
                    left: 90px;
                    color: #9f9f9f;
                    overflow: hidden;

                    .txt {
                        color: #555;
                    }
                }

                .hot {
                    height: 20px;
                    padding-left: 30px;
                    font-size: 12px;
                    position: absolute;
                    bottom: 18px;
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
