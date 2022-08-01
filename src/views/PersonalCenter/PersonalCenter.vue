<template>
<div class="user-center wrap-1200  p-t-15">
    <div class="content h-100 w-100 flex justify-between ">
        <div class="left-section bg-white">
            <UserHeader />
            <div class="apply-host ">
                <ConfirmButton class="w-100 h-100" title="申请主播" />
            </div>
            <ul class="flex flex-column justify-center align-center p-t-30">
                <template
                    v-for="menu in menus"
                >
                    <li
                        class="menu-item font-18 flex pointer align-center  justify-center w-100"
                        :class="{'is-active': menu.id === currentMenu.id }"
                        v-if="!menu.isAuthorization || (menu.isAuthorization && isAnchor)"
                        :key="menu.id"
                        @click="selectMenu(menu)"
                    >
                        <svg-icon class="icon-20" :icon-class="menu.icon"></svg-icon>
                        <span class="m-l-10 font-regular">{{ menu.text }}</span>
                    </li>
                </template>

            </ul>
        </div>
        <div class="right-info bg-white p-t-25 ">
            <component :is="comName" />
        </div>
    </div>
</div>
</template>

<script>
import UserHeader from '@/views/PersonalCenter/Components/UserHeader'
import ConfirmButton from '@/components/ConfirmButton'
import BasicInfo from '@/views/PersonalCenter/Components/BasicInfo'
import editAvatar from '@/views/PersonalCenter/Components/editAvatar'
import UpdatePassword from '@/views/PersonalCenter/Components/UpdatePassword'
import Feedback from '@/views/PersonalCenter/Components/Feedback'
import OpenLiveBroadCast from '@/views/PersonalCenter/Components/OpenLiveBroadCast'
import BookLiveBroadCast from '@/views/PersonalCenter/Components/BookLiveBroadCast'
import MyBroadcast from '@/views/PersonalCenter/Components/MyBroadcast'
import MyBroad from '@/views/PersonalCenter/Components/MyBroad'
import MyFavorite from '@/views/PersonalCenter/Components/MyFavorite'
import { mapState } from 'vuex'
export default {
    name: 'PersonalCenter',
    props: ['tabId'],
    components: {
        UserHeader,
        BasicInfo,
        editAvatar,
        UpdatePassword,
        Feedback,
        OpenLiveBroadCast,
        BookLiveBroadCast,
        MyBroadcast,
        MyBroad,
        MyFavorite,
        ConfirmButton
    },
    data () {
        return {
            menus: [
                {
                    id: 1,
                    name: 'userInfo',
                    text: '基础资料',
                    icon: 'my',
                    com: 'BasicInfo'
                },
                {
                    id: 2,
                    name: 'myFavorite',
                    text: '我的关注',
                    icon: 'atar',
                    com: 'myFavorite'
                },
                // {
                //     id: 3,
                //     name: 'updatePassword',
                //     text: '修改密码',
                //     icon: 'lock1',
                //     com: 'updatePassword'
                // },
                // {
                //     id: 4,
                //     name: 'feedback',
                //     text: '意见反馈',
                //     icon: 'message',
                //     com: 'Feedback'
                // },
                // {
                //     id: 5,
                //     name: 'notify',
                //     text: '消息通知',
                //     icon: 'message1'
                // },
                {
                    id: 6,
                    name: 'notify',
                    text: '我的直播',
                    icon: 'message1',
                    isAuthorization: true,
                    com: 'MyBroad'
                },
                // {
                //     id: 7,
                //     name: 'bookLiveBroadCast',
                //     text: '直播预约',
                //     icon: 'message1',
                //     isAuthorization: true,
                //     com: 'BookLiveBroadCast'
                // },
                {
                    id: 8,
                    name: 'myBroadcast',
                    text: '我的直播',
                    isAuthorization: true,
                    icon: 'message1',
                    com: 'MyBroadcast'
                }
            ],
            currentMenu: {}
        }
    },
    computed: {
        ...mapState('user', ['token', 'is_anchor']),
        comName () {
            return this.currentMenu.com
        },
        isAnchor () {
            return this.is_anchor === 2
        }
    },
    watch: {
        token () {
            if (!this.token) {
                this.$router.push('/')
            }
        },
        tabId () {
            this.changeMenu()
        }
    },
    created () {
        this.changeMenu()
    },
    methods: {
        changeMenu () {
            this.currentMenu = this.menus.find(x => x.id === this.tabId * 1)
        },
        selectMenu (menu) {
            this.currentMenu = { ...menu }
            this.$router.push({
                name: 'PersonalCenter',
                params: {
                    tabId: menu.id
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
.user-center{
    background-color: $background-gray2;
    height: calc(100vh - 245px);
}
.content {
    padding-bottom: 50px;
    .apply-host {
        height: 40px;
        width: 177px;
        margin: 14px auto;
    }
}
.left-section {
    width: 232px;
    .menu-item {
        line-height: 50px;
        border-left: 5px solid transparent;
        color: #848484;
        &.is-active {
            border-left: 5px solid $background-color1;
            background-color: rgba(60,96,255, 0.1);
            color: $background-color1;
        }
    }
}
.right-info {
    width: calc(100% - 247px);
    padding-left: 35px;
}
::v-deep {
    .apply-host {
        span {
            line-height: 40px;
            background: linear-gradient(90deg, #3B5FFF, #A2B3FF);
            border-radius: 3px;
        }
    }
}
</style>
