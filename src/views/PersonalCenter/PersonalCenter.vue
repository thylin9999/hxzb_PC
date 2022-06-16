<template>
<div class="user-center wrap-1200 h-100 p-t-20">
   <div class="p-t-10 p-b-10 p-l-15 h-100 bg-white ">
       <person-header />
   </div>
    <div class="content w-100 flex justify-between m-t-15">
        <div class="left-section bg-white h-100">
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
import { mapState } from 'vuex'
export default {
    name: 'PersonalCenter',
    components: {
        PersonHeader,
        BasicInfo,
        editAvatar,
        UpdatePassword,
        Feedback
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
                {
                    id: 4,
                    name: 'feedback',
                    text: '意见反馈',
                    icon: 'message',
                    com: 'Feedback'
                },
                {
                    id: 5,
                    name: 'notify',
                    text: '消息通知',
                    icon: 'message1'
                }
            ],
            currentMenu: {
                id: 3,
                name: 'updatePassword',
                text: '修改密码',
                icon: 'lock1',
                com: 'updatePassword'
            }
        }
    },
    computed: {
        ...mapState('user', ['token']),
        comName () {
            console.log(this.currentMenu)
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
        this.currentMenu = this.menus.find(x => x.id === 2)
        console.log(this.currentMenu, 'currentMenu')
    },
    methods: {
        selectMenu (menu) {
            this.currentMenu = { ...menu }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
.user-center{
    background-color: $background-gray2;
}
.content {
    height: 600px;
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
