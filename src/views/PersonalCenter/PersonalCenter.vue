<template>
<div class="user-center wrap-1450  p-t-20">
   <div class="p-t-10 p-b-10 p-l-15  bg-white ">
       <person-header />
   </div>
    <div class="content w-100 flex justify-between m-t-15">
        <div class="left-section bg-white">
            <ul class="flex flex-column justify-center align-center p-t-30">
                <li
                    class="menu-item font-18 flex pointer align-center m-b-30 justify-center w-100"
                    :class="{'is-active': menu.id === currentMenu.id }"
                    v-for="menu in menus"
                    :key="menu.id"
                    @click="selectMenu(menu)"
                >
                    <svg-icon class="icon-20" :icon-class="menu.icon"></svg-icon>
                    <span class="m-l-10 text-333 font-regular">{{ menu.text }}</span>
                </li>
            </ul>
        </div>
        <div class="right-info bg-white">
            <component :is="comName" />
        </div>
    </div>
</div>
</template>

<script>
import PersonHeader from '@/views/PersonalCenter/PersonHeader'
import BasicInfo from '@/views/PersonalCenter/Components/BasicInfo'
import editAvatar from '@/views/PersonalCenter/Components/editAvatar'
import UpdatePassword from '@/views/PersonalCenter/Components/UpdatePassword'
import Feedback from '@/views/PersonalCenter/Components/Feedback'
import OpenLiveBroadCast from '@/views/PersonalCenter/Components/OpenLiveBroadCast'
import BookLiveBroadCast from '@/views/PersonalCenter/Components/BookLiveBroadCast'
import MyBroadcast from '@/views/PersonalCenter/Components/MyBroadcast'
import { mapState } from 'vuex'
export default {
    name: 'PersonalCenter',
    props: ['tabId'],
    components: {
        PersonHeader,
        BasicInfo,
        editAvatar,
        UpdatePassword,
        Feedback,
        OpenLiveBroadCast,
        BookLiveBroadCast,
        MyBroadcast
    },
    data () {
        return {
            menus: [
                {
                    id: 1,
                    name: 'userInfo',
                    text: '基础资料',
                    icon: 'info',
                    com: 'BasicInfo'
                },
                {
                    id: 2,
                    name: 'atar',
                    text: '修改图像',
                    icon: 'atar',
                    com: 'editAvatar'
                },
                {
                    id: 3,
                    name: 'updatePassword',
                    text: '修改密码',
                    icon: 'lock1',
                    com: 'updatePassword'
                },
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
                    text: '直播管理',
                    icon: 'message1',
                    com: 'OpenLiveBroadCast'
                },
                {
                    id: 7,
                    name: 'bookLiveBroadCast',
                    text: '直播预约',
                    icon: 'message1',
                    com: 'BookLiveBroadCast'
                },
                {
                    id: 8,
                    name: 'myBroadcast',
                    text: '我的直播',
                    icon: 'message1',
                    com: 'MyBroadcast'
                }
            ],
            currentMenu: {}
        }
    },
    computed: {
        ...mapState('user', ['token']),
        comName () {
            return this.currentMenu.com
        }
    },
    watch: {
        token () {
            if (!this.token) {
                this.$router.push('/')
            }
        }
    },
    created () {
        this.currentMenu = this.menus.find(x => x.id === this.tabId * 1)
    },
    methods: {
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
    height: calc(100vh - 90px);
    background-color: $background-gray2;
}
.content {
    //min-height: 600px;
    height: calc(100% - 120px);
    padding-bottom: 50px;
}
.left-section {
    width: 270px;
    .menu-item {
        line-height: 30px;
        border-left: 5px solid transparent;
        &.is-active {
            border-left: 5px solid $background-color1;
        }
    }
}
.right-info {
    width: calc(100% - 285px);
}
</style>
