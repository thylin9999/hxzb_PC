<template>
    <div class="host-section wrap-1200 flex justify-between align-center">
        <div class="left-host h-100">
            <div class="host-banner w-100 bg-no-repeat bg-center bg-size-100"
                :style="{
                    backgroundImage: `url(${hostBanner})`
                }"
            ></div>
            <div class="hosts bg-white m-t-10">
                <div class="header w-100 flex justify-center align-center p-relative">
                    <div class="hot-host text-center font-14 text-white bg-no-repeat bg-center bg-size-100">热门主播</div>
                    <div class="apply-host p-l-15 p-r-15 pointer p-absolute flex align-center">
                        <span class="icon bg-no-repeat bg-center bg-size-100 icon-15 d-inline-block"></span>
                        <span class="m-l-5 font-12 scale-9">申请开播</span>
                    </div>
                </div>
                <div class="host-list w-100 m-t-30">
                    <div class="list-box flex align-center justify-center">
                        <template
                            v-for="host in hosts"
                        >
                            <div class="item m-l-10 m-r-10 text-center" :key="host.id">
                                <div
                                    class="avatar d-inline-block p-relative bg-center bg-no-repeat bg-size-100"
                                    :style="{
                                        backgroundImage: `url(${host.img})`

                                    }"
                                >
                                    <span class="live-icon d-inline-block bg-center bg-no-repeat bg-size-100 p-absolute"></span>
                                </div>
                                <p class="font-14 text-333 m-t-15">{{ host.nick }}</p>
                                <p class="font-12 text-5a m-t-5">{{ host.room_title }}</p>
                                <p class="font-12 text-5a m-t-5">没有队伍名称</p>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div class="right-news bg-white h-100">
            <div class="header p-l-20 p-t-15 p-b-15">
                <span class="font-16 text-333 font-600">公告</span>
            </div>
            <div class="list-box flex flex-column overflow-y-auto">
                <template
                    v-for="n in 30"
                >
                    <div class="news-row w-100 flex align-center p-l-20" :key="n">
                        <marquee class="marquee-ref pointer" :ref="`marquee-${n}`" behavior=scroll onMouseOver="this.start()" onMouseOut="this.stop()">
                            <!-- 这里可以填写走马灯内容 -->
                            针对直播违规处理公告针对直播违规处理公告针对直播违规处理公告针对直播违规处理公告针对直播违规处理公告针对直播违规处理公告针对直播违规处理公告针对直播违规处理公告
                        </marquee>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { getHotRooms } from '@/api/competition/competition'
import { statusCode } from '@/utils/statusCode'
import { Message } from 'element-ui'
export default {
    name: 'HomeHostSection',
    data () {
        return {
            hosts: [],
            hostBanner: require('../../assets/images/home/host-banner.jpg')
        }
    },
    created () {
        this.fetchData()
    },
    mounted () {
        this.$nextTick(() => {
            const els = document.querySelectorAll('.marquee-ref')
            const elsArr = Array.from(els)
            elsArr.forEach(el => {
                el.stop()
            })
        })
    },
    methods: {
        async fetchData () {
            try {
                const { data, code, msg } = await getHotRooms({})
                console.log(data, code)
                if (code === statusCode.success) {
                    this.hosts = data.list
                } else {
                    Message.error(msg)
                }
            } catch (e) {
                console.log('出错了')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.host-section {
    height: 370px;
}
.left-host {
    width: 800px;
    .host-banner {
        height: 120px;
    }
    .hosts {
        height: 240px;
    }
    .hot-host {
        width: 158px;
        height: 43px;
        line-height: 43px;
        background-image: url('../../assets/images/host/hot-host.png');
    }
    .apply-host {
        .icon {
            width: 15px;
            height: 15px;
            background-image: url('../../assets/images/host/apply-host.png');
        }
        background: #EDF0FF;
        border-radius: 15px;
        right: 15px;
        height: 30px;
        line-height: 30px;
        color: #4668FF;
    }

    .host-list {
        .item {
            width: 100px;
            .avatar {
                width: 64px;
                height: 64px;
                background-color: #C9CFED;
                border-radius: 10px;
            }
            .live-icon {
                width: 20px;
                height: 20px;
                bottom: -2px;
                right: -2px;
                background-image: url('../../assets/images/host/live-icon.gif');
            }
        }
    }
}
.right-news {
    width: 390px;
    .header {
        border-bottom:1px solid #DEE4FF;
    }
    .list-box {
        height: calc(100% - 45px);
        .news-row {
            line-height: 27px;
            height: 27px;
            &:before {
                display: inline-block;
                border-radius: 50%;
                content: '';
                width: 5px;
                height: 5px;
                margin-right: 10px;
                background-color: #3B5FFF;
            }
            color: #646464;
        }
    }

}
</style>
