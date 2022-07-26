<template>
<div class="full-width" :class="{'is-light-header': isLightHeader}">
    <div class="p-relative header flex justify-between align-center" :class="{
        'wrap-1200': isLightHeader
    }">
        <div class="left-section flex align-center">
            <div class="logo m-r-30">
                <img class="h-100" src="../../assets/images/common/logo.png" alt="">
            </div>
            <ul class="menus flex align-center" :class="{'light-header': isLightHeader}">
                <li
                    class="pointer m-r-25 font-400 text-center "
                    v-for="menu in menus"
                    :key="menu.id"
                    :class="{ 'is-active': currentId === menu.id}"
                    @click="changeTab(menu)"
                >
                    <span class="font-20">{{ menu.text }}</span>
                </li>
            </ul>
        </div>
        <span class="download-app pointer font-500 text-white font-20 font-medium p-absolute">下载APP</span>
        <user-infos :is-light-header="isLightHeader"/>
<!--        <div class="p-absolute" style="left: 300px;top:50px;" @click="test">点我</div>-->
    </div>
</div>
</template>
<script>
import UserInfos from '@/views/User/UserInfos'
import { Message } from 'element-ui'
export default {
    name: 'Header',
    components: {
        UserInfos
    },
    data () {
        return {
            menus: [
                {
                    id: 1,
                    text: '首页',
                    name: 'Home',
                    sub: 'Home'
                },
                {
                    id: 5,
                    text: '直播',
                    name: 'LiveBroad',
                    sub: 'LiveBroad'
                },
                {
                    id: 2,
                    text: '赛事',
                    name: 'Competition',
                    sub: 'Competition'
                }
                // {
                //     id: 3,
                //     text: '订阅',
                //     name: 'SubscribeList',
                //     sub: 'SubscribeList'
                // },
                // {
                //     id: 4,
                //     text: '下载App',
                //     name: 'DownloadApp',
                //     sub: 'DownloadApp'
                // }
            ],
            currentId: 1
        }
    },
    computed: {
        isLightHeader () {
            return this.currentId === 1
        }
    },
    watch: {
        '$route': {
            handler () {
                this.currentId = this.$route.meta.subId
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        changeTab (tab) {
            this.currentId = tab.id
            this.$router.push({
                name: tab.name
            })
        },
        test () {
            Message.error('asdfafsd')
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/theme/default-vars.scss';

.full-width {
    width: 100%;

}
.header {
    height: 70px;
    margin: auto;
    .logo {
        height: 40px;
    }
    .menus {
        li {
            width: 70px;
            height: 32px;
            line-height: 32px;
            color: #333;
            &.is-active {
                border-radius: 10px;
                color: $text-white;
                background: linear-gradient(0deg, #3B5FFF, #A2B3FF);
            }
        }
        &.light-header {
            li {
                color: $text-white;
            }
        }
    }
}
.is-dark {
    .menus {
        li {
            color: $text-dartK;
        }
    }
}
.download-app{
    right: 200px;
}
</style>
