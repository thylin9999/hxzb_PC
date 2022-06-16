<template>
<div class="full-width">
    <div class="wrap-1200 header flex justify-between align-center">
        <div class="left-section flex align-center">
            <div class="logo">
                <img class="h-100" src="../../assets/images/common/logo.png" alt="">
            </div>
            <ul class="menus flex align-center" :class="{'light-header': isLightHeader}">
                <li
                    class="pointer m-l-5 m-r-5"
                    v-for="menu in menus"
                    :key="menu.id"
                    :class="{ 'is-active': currentId === menu.id}"
                    @click="changeTab(menu)"
                >
                    <span class="font-16">{{ menu.text }}</span>
                </li>
            </ul>
        </div>
        <user-infos :is-light-header="isLightHeader"/>
    </div>
</div>
</template>
<script>
import UserInfos from '@/views/User/UserInfos'
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
                    id: 2,
                    text: '赛程',
                    name: 'Competition',
                    sub: 'Competition'
                },
                {
                    id: 3,
                    text: '订阅',
                    name: 'SubscribeList',
                    sub: 'SubscribeList'
                },
                {
                    id: 4,
                    text: '下载App',
                    name: 'DownloadApp',
                    sub: 'DownloadApp'
                }
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
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
.full-width {
    background-color: transparent;
}
.header {
    height: 80px;
    .logo {
        height: 60px;
    }
    .menus {
        margin-left: 110px;
        li {
            padding: 5px 20px;
            &.is-active {
                border-radius: 15px;
                color: $text-white;
                background-color: $background-color1;
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
</style>
