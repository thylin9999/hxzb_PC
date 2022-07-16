<template>
<div class="download-page max-screen">
    <div class="w-100 outer-wrap bg-no-repeat">
        <div class="upper-div m-auto  w-100 max-screen">
            <div class="left-info">
                <div class="logo-text bg-no-repeat  bg-size-auto m-b-20"></div>
                <div class="font-regular m-b-20 font-400 d-inline-block site  font-48">haibao18.cn</div>
                <p class="font-regular font-45 font-400 m-b-30">专业体育比赛直播·精彩触手可及</p>
                <div class="flex features align-center">
                    <span>高颜值主播</span>
                    <span>海量比赛数据</span>
                    <span>大咖相聚聊天</span>
                </div>
                <div class="app-info flex align-center">
                    <div class="buttons text-white">
                        <div class="item pointer m-b-20 border-radius-15 flex justify-center align-center w-100">
                            <icon-png :width="21" :height="22" icon="icons/apple" />
                            <span class="font-30 m-l-10">ios</span>
                        </div>
                        <div class="item pointer m-b-20 border-radius-15 flex justify-center align-center w-100">
                            <icon-png :width="21" :height="22" icon="icons/android" />
                            <span class="font-30 m-l-10">Android</span>
                        </div>
                    </div>
                    <div class="code">
                        <div class="code-box">
                            <Qrcode />
                        </div>
                        <span class="font-20">扫码二维码下载</span>
                    </div>
                </div>
            </div>
        </div>
        <div class=" down-section">
            <div class="flex justify-between align-center">
                <div
                    v-for="item in list"
                    :key="item.icon"
                    class="item flex flex-column align-center">
                <span class="icon bg-center bg-no-repeat bg-size-100" :style="{
                    backgroundImage: 'url(' + require(`../assets/images/download/${item.icon}.png`) + ')'
                }"></span>
                    <div class="w-100 flex flex-column align-center">
                        <span class="font-25 font-medium description font-500">{{ item.text}}</span>
                        <span class="font-25 font-medium description font-500">{{ item.text1}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import IconPng from '@/components/IconPng'
import Qrcode from '@/components/Qrcode'
export default {
    name: 'DownloadApp',
    components: {
        IconPng,
        Qrcode
    },
    data () {
        return {
            list: [
                {
                    icon: 'ad',
                    text: '全球赛事',
                    text1: '高清无广告'
                },
                {
                    icon: 'voice',
                    text: '专业主播',
                    text1: '相约看比赛'
                },
                {
                    icon: 'statics',
                    text: '海量直播数据',
                    text1: '看直播有依据'
                },
                {
                    icon: 'chat',
                    text: '互动探讨',
                    text1: '相聚聊天室'
                }
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.download-page {
    background: linear-gradient(0deg, #E6F3FF 0%, #FFFFFF 100%);
    padding-bottom: 125px;
    margin: 0 auto;
    .outer-wrap{
        background-image: url('../assets/images/download/phone.png');
        background-size: 115% 100%;
        background-position: left -150px;
    }
    .upper-div {
        padding-top: 280px;
        color: #0E3F6A;
        .left-info {
            width: 100%;
            max-width: 1450px;
            margin: 0 auto;
        }
        .logo-text{
            width: 290px;
            height: 80px;
            background-position: left bottom;
            background-size: contain;
            background-image: url('../assets/images/download/logo-text.png');
        }
        .site {
            line-height: 48px;

        }
        .features {
            span{
                margin-right: 56px;
                font-size: 25px;
                color: #6D9FCB;
            }
        }
        .app-info {
            margin-top: 60px;
            .buttons {
                width: 225px;
            }
            .item {
                background-color: #0E3F6A;
                line-height: 67px;
            }
        }
        .code {
            margin-left: 55px;
            span{
                color: #6D9FCB;
            }
        }
        .code-box {
            width: 150px;
            height: 150px;
        }
    }
    .down-section {
        width: 100%;
        max-width: 1450px;
        margin: 0 auto;
        margin-top: 400px;
        .item {
            .icon {
                width: 150px;
                height: 150px;
                margin-bottom: 35px;
            }
            .description {
                color: #182648;
                line-height: 27px;
            }
        }
    }
}
</style>
