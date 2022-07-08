<template>
<div class="side-bar">
    <ul class="list flex flex-column align-center">
        <template
            v-for="item in list"

        >
            <li
                v-if="!item.hide"
                :key="item.key"
                class="flex item flex-column pointer align-center justify-center font-14 p-relative"
            >
                <div class="icon">
                    <svg-icon  :icon-class="item.key"></svg-icon>
                </div>
                <span class="font-12 d-inline-block title">{{ item.title }}</span>
                <div v-if="item.key === 'download'" class="p-absolute transition-3 download-code bg-size-100 bg-no-repeat bg-center">
                    <div class="box">
                        <QR/>
                    </div>
                </div>
            </li>
        </template>
    </ul>
</div>
</template>

<script>
import QR from '@/views/Layout/QR'
import { mapState } from 'vuex'
export default {
    name: 'SideBar',
    components: {
        QR
    },
    data () {
        return {
            // list: [
            //     {
            //         key: 'download',
            //         title: '下载'
            //     },
            //     {
            //         key: 'broadcast',
            //         title: '开播'
            //     },
            //     {
            //         key: 'share',
            //         title: '分享'
            //     },
            //     {
            //         key: 'service',
            //         title: '客服'
            //     }
            // ]
        }
    },
    computed: {
        ...mapState('user', ['token', 'is_anchor']),
        isAnchor () {
            return this.is_anchor === 2 // 1 非主播， 2，主播
        },
        list () {
            return [
                {
                    key: 'download',
                    title: '下载'
                },
                {
                    key: 'broadcast',
                    title: '开播',
                    hide: !this.isAnchor
                },
                {
                    key: 'share',
                    title: '分享'
                },
                {
                    key: 'service',
                    title: '客服'
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.side-bar {
    position: fixed;
    right: 20px;
    bottom: 200px;
}
.item {
    color: #666a80;
    height: 60px;
    width: 48px;
    background-color: #fff;
    &:hover {
        color: #37f;
    }
    .title {
        line-height: 18px;
    }
    .icon{
        line-height: 21px;
    }
    &:hover {
        .download-code {
            display: inline-block;
        }
    }
    .download-code{
        width: 200px;
        height: 280px;
        top: 0;
        right: 50px;
        background-image: url('../../assets/images/common/download-code-bg.png');
        display: none;
        .box {
            width: 150px;
            height: 150px;
            margin: 80px auto 0;
        }
    }
}
::v-deep {
    .item {
        .svg-icon {
            font-size: 14px;
            width: 14px;
            height: 14px;
        }
        canvas {
            width: 100% !important;
            height: 100% !important;
        }
    }
}

</style>
